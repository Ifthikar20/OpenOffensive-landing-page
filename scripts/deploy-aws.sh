#!/usr/bin/env bash
# Build the site and publish it to AWS (private S3 bucket behind CloudFront).
#
#   npm run deploy
#
# Uses your normal AWS credentials. Nothing secret is stored in this repository.
#   AWS_PROFILE       pick a named profile
#   AWS_REGION        region for the stack (defaults to your CLI region, then us-east-1)
#   STACK_NAME        stack name (default: openoffensive-site)
#   DOMAIN_NAME       optional custom domain, together with
#   CERTIFICATE_ARN   an ACM certificate in us-east-1 that covers it
set -euo pipefail
cd "$(dirname "$0")/.."

STACK="${STACK_NAME:-openoffensive-site}"
REGION="${AWS_REGION:-${AWS_DEFAULT_REGION:-$(aws configure get region 2>/dev/null || true)}}"
REGION="${REGION:-us-east-1}"

command -v aws >/dev/null 2>&1 || { echo "The AWS CLI is not installed." >&2; exit 1; }

echo "Checking your AWS credentials..."
if ! ACCOUNT="$(aws sts get-caller-identity --query Account --output text 2>/dev/null)"; then
  echo "AWS rejected your credentials. Refresh them (aws configure, or aws sso login) and try again." >&2
  echo "To use a named profile: AWS_PROFILE=<name> npm run deploy" >&2
  exit 1
fi
echo "Deploying to AWS account ending ${ACCOUNT: -4}, region $REGION, stack $STACK."

PARAMS=()
if [ -n "${DOMAIN_NAME:-}" ]; then
  PARAMS+=("DomainName=$DOMAIN_NAME" "CertificateArn=${CERTIFICATE_ARN:?Set CERTIFICATE_ARN when DOMAIN_NAME is set}")
fi

echo "Building the site..."
npm run build

echo "Creating or updating the stack (the first run takes several minutes)..."
aws cloudformation deploy \
  --region "$REGION" \
  --stack-name "$STACK" \
  --template-file infra/site.yaml \
  --no-fail-on-empty-changeset \
  ${PARAMS[@]:+--parameter-overrides "${PARAMS[@]}"}

output() {
  aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}
BUCKET="$(output BucketName)"
DISTRIBUTION="$(output DistributionId)"
URL="$(output SiteUrl)"

echo "Uploading to s3://$BUCKET ..."
# Built assets have hashed names, so they can be cached for a year.
aws s3 sync dist/assets "s3://$BUCKET/assets" --region "$REGION" --delete \
  --cache-control "public,max-age=31536000,immutable"
# Pages and everything else must be re-checked on each visit.
aws s3 sync dist "s3://$BUCKET" --region "$REGION" --delete --exclude "assets/*" \
  --cache-control "no-cache"
# Be explicit about the image type so it never depends on the local MIME table.
aws s3 cp dist/assets "s3://$BUCKET/assets" --region "$REGION" --recursive \
  --exclude "*" --include "*.jpg" --content-type image/jpeg \
  --cache-control "public,max-age=31536000,immutable"

echo "Clearing the CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION" --paths "/*" \
  --query 'Invalidation.Id' --output text >/dev/null

echo
echo "Live at: $URL"

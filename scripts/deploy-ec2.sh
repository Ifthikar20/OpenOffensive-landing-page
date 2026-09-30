#!/usr/bin/env bash
# Build the site and publish it to an EC2 server running nginx.
#
#   EC2_HOST=1.2.3.4 npm run deploy
#
#   EC2_HOST   public IP or DNS name of the instance (required)
#   KEY_PATH   path to your .pem key (default: ~/.ssh/openoffensive.pem)
#   EC2_USER   ssh user: ubuntu (Ubuntu, the default) or ec2-user (Amazon Linux)
#
# The key stays on your machine. It is never read into the repository, and *.pem is git-ignored.
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${EC2_HOST:?Set EC2_HOST to the public IP or DNS name of the instance}"
USER_NAME="${EC2_USER:-ubuntu}"
KEY="${KEY_PATH:-$HOME/.ssh/openoffensive.pem}"
WEBROOT=/var/www/openoffensive

[ -f "$KEY" ] || { echo "Key not found: $KEY (set KEY_PATH)" >&2; exit 1; }
# Refuse to run if the key is inside this repo and could be committed.
case "$(cd "$(dirname "$KEY")" && pwd)/" in
  "$PWD"/*)
    if git ls-files --error-unmatch "$KEY" >/dev/null 2>&1 || ! git check-ignore -q "$KEY"; then
      echo "Refusing to deploy: $KEY is tracked or not git-ignored. Move it to ~/.ssh." >&2
      exit 1
    fi ;;
esac
chmod 400 "$KEY"

SSH_OPTS=(-i "$KEY" -o StrictHostKeyChecking=accept-new -o IdentitiesOnly=yes)
remote() { ssh "${SSH_OPTS[@]}" "$USER_NAME@$HOST" "$@"; }

echo "Building the site..."
npm run build

echo "Preparing the server (installs nginx on the first run)..."
remote "sudo bash -s" <<REMOTE
set -e
if ! command -v nginx >/dev/null 2>&1 || ! command -v rsync >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update -y && apt-get install -y nginx rsync
  else
    dnf install -y nginx rsync
  fi
fi
mkdir -p $WEBROOT
chown $USER_NAME:$USER_NAME $WEBROOT
systemctl enable nginx
REMOTE

echo "Uploading the site..."
rsync -az --delete -e "ssh ${SSH_OPTS[*]}" dist/ "$USER_NAME@$HOST:$WEBROOT/"

echo "Applying the nginx config..."
scp "${SSH_OPTS[@]}" infra/nginx.conf "$USER_NAME@$HOST:/tmp/openoffensive.conf"
remote "sudo bash -s" <<'REMOTE'
set -e
rm -f /etc/nginx/sites-enabled/default
if [ -d /etc/nginx/sites-available ]; then
  install -m 644 /tmp/openoffensive.conf /etc/nginx/sites-available/openoffensive
  ln -sf /etc/nginx/sites-available/openoffensive /etc/nginx/sites-enabled/openoffensive
else
  install -m 644 /tmp/openoffensive.conf /etc/nginx/conf.d/openoffensive.conf
fi
nginx -t
systemctl restart nginx
REMOTE

echo
echo "Live at: http://$HOST"

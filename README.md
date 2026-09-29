# OpenOffensive landing page

The website for [OpenOffensive](https://github.com/Ifthikar20/open-offensive), the open-source
multi-agent AI pentester. Built with Vue 3, Vue Router, and Vite. It builds to plain static files
and needs no server.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page |
| `/docs` | Documentation: overview, quickstart, concepts, commands, configuration |
| `/blog`, `/blog/:slug` | Blog |

The docs page is intentionally high level. Deeper documentation stays in the main repository.

## Develop

Requires Node 20.19 or newer.

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # writes dist/
npm run preview    # serves dist/ locally
```

`npm run build` also runs `scripts/prerender.mjs`, which writes one HTML file per route with its own
title, description, and canonical URL, plus `404.html`, `sitemap.xml`, and `robots.txt`.
Deep links such as `/docs/` therefore answer with a normal 200 on a static host.

## Where things live

```text
src/
  assets/         base.css (design tokens), header.css, home.css, docs.css, pages.css
  components/     header, footer, buttons, code block, and components/docs/* for the docs page
  content/        docs.js (docs copy) and posts/*.vue (blog posts)
  lib/            site.js (links and domain), pages.js (route metadata), posts.js (blog index)
  pages/          one file per route
public/           favicon and the optimized hero image
design/           source artwork that is not deployed
infra/            the CloudFormation template for AWS
scripts/          the post-build prerender step and the AWS deploy script
```

## Common changes

- **Domain.** Set `SITE.url` in `src/lib/site.js`. The canonical URLs, sitemap, and robots file
  are generated from it.
- **Colors.** The palette is defined once at the top of `src/assets/base.css`. It was sampled from
  the hero image.
- **Hero image.** `design/background.png` is the source. The site serves `public/background.webp`.
  After replacing the source, regenerate it:

  ```bash
  cwebp -q 80 -m 6 design/background.png -o public/background.webp
  ```

- **Blog.** Add an entry to `src/lib/posts.js`, create the post body in `src/content/posts/`, and
  register it in `src/lib/postComponents.js`.
- **Docs copy.** Edit `src/content/docs.js` and the components in `src/components/docs/`.

## Deploy to AWS

The site is static, so the setup is small: a private S3 bucket behind CloudFront. CloudFront serves
it over HTTPS on its own address, so you can go live without touching a domain. One CloudFormation
stack creates everything, and one command builds and publishes the site.

You need the AWS CLI, Node, and working credentials for the account you want to use.

```bash
aws sts get-caller-identity   # shows which account you are about to use
npm run deploy
```

The first run takes several minutes while CloudFront is created, then prints the site's address.
Later runs upload only what changed and clear the cache. To use a named profile, run
`AWS_PROFILE=<name> npm run deploy`.

What the stack creates:

- A private, encrypted S3 bucket that only CloudFront can read.
- A CloudFront distribution that redirects HTTP to HTTPS and adds standard security headers.
- A small function that maps `/docs` onto `docs/index.html`, and a custom 404 page.

At low traffic this costs pennies a month. The template and script contain no keys or account IDs.
They use whatever credentials your AWS CLI already has.

### Use your own domain

1. In AWS Certificate Manager, region `us-east-1`, request a public certificate for the domain and
   add the DNS record it asks for.
2. Deploy again with the domain and certificate:

   ```bash
   DOMAIN_NAME=www.example.com CERTIFICATE_ARN=arn:aws:acm:us-east-1:... npm run deploy
   ```

3. At your DNS provider, point the domain at the CloudFront address that the deploy printed.
4. Set `SITE.url` in `src/lib/site.js` to the final address so canonical URLs and the sitemap match.

### Remove everything

```bash
BUCKET=$(aws cloudformation describe-stacks --stack-name openoffensive-site \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" --output text)
aws s3 rm "s3://$BUCKET" --recursive
aws cloudformation delete-stack --stack-name openoffensive-site
```

### Other static hosts

Use `npm run build` as the build command and `dist` as the output directory. Netlify, Vercel, and
Cloudflare Pages work without extra configuration.

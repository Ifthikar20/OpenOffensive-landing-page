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
- **Hero image.** `design/background.png` is the source. The site serves `src/assets/background.webp`.
  After replacing the source, regenerate it:

  ```bash
  cwebp -q 80 -m 6 design/background.png -o src/assets/background.webp
  ```

- **Blog.** Add an entry to `src/lib/posts.js`, create the post body in `src/content/posts/`, and
  register it in `src/lib/postComponents.js`.
- **Docs copy.** Edit `src/content/docs.js` and the components in `src/components/docs/`.

## Deploy to AWS (Amplify Hosting)

The simplest option: no server and no key file. Amplify builds from GitHub on every push and serves
the site over HTTPS through CloudFront. The build is described in `amplify.yml`.

1. Push this repo to GitHub.
2. In the AWS console, open **AWS Amplify**, choose **Host web app**, connect GitHub, and pick the
   repo and the `main` branch. Amplify picks up `amplify.yml`. Save and deploy.
3. Open **Hosting > Custom domains**, add `openoffensive.ai`, and let Amplify create its certificate.
4. In Cloudflare DNS, add the CNAME records Amplify shows (one to validate the certificate, one for
   the site). Set them to **DNS only** (grey cloud) so validation succeeds.
5. Set `SITE.url` in `src/lib/site.js` to the final address if it differs from `https://openoffensive.ai`.

From then on, `git push` deploys. If a page such as `/docs` returns 404, add a rewrite rule in
**Hosting > Rewrites and redirects**: source `/<*>`, target `/<*>/index.html`, type `200`, limited
to paths without a file extension.

## Alternative: EC2 + nginx + Cloudflare

The site is static, so the simplest setup is one small EC2 instance running nginx, with Cloudflare
in front for DNS and HTTPS. `npm run deploy` builds the site, installs nginx on the first run, and
uploads the files over SSH.

### 1. Create the server (once)

1. In the EC2 console, launch a `t3.micro` (or `t4g.micro`) with **Ubuntu 24.04**.
2. Create a key pair and download the `.pem`. Save it outside the repo, for example
   `~/.ssh/openoffensive.pem`. `*.pem` is git-ignored, and the deploy script never copies it anywhere.
3. In the instance's security group, allow inbound **SSH (22)** from your IP only, and **HTTP (80)**
   from anywhere.
4. Optional but recommended: allocate an **Elastic IP** and attach it, so the address survives a reboot.

### 2. Deploy

```bash
EC2_HOST=<elastic-ip> npm run deploy
```

Options: `KEY_PATH` (default `~/.ssh/openoffensive.pem`) and `EC2_USER` (`ubuntu` by default, or
`ec2-user` on Amazon Linux). Run it again after any change to publish the update.

### 3. Point the domain with Cloudflare

1. In Cloudflare DNS, add an `A` record for `@` (and `www`) pointing at the Elastic IP, with the
   orange cloud (Proxied) on.
2. Under **SSL/TLS**, set the mode to **Flexible**. Cloudflare serves HTTPS to visitors and talks
   plain HTTP to the server. Turn on **Always Use HTTPS** under Edge Certificates.
3. Confirm `SITE.url` in `src/lib/site.js` matches the final address.

For stricter security, install a Cloudflare Origin Certificate on nginx, switch to **Full (strict)**,
and close port 80 to everything except Cloudflare's IP ranges.

The nginx config is in `infra/nginx.conf`.

### Alternative: S3 + CloudFront

`npm run deploy:s3` publishes to a private S3 bucket behind CloudFront using
`infra/site.yaml`. It needs the AWS CLI and credentials, not a key file. To use a custom domain,
run `DOMAIN_NAME=www.example.com CERTIFICATE_ARN=arn:aws:acm:us-east-1:... npm run deploy:s3`. To
remove it, empty the bucket and run `aws cloudformation delete-stack --stack-name openoffensive-site`.

### Other static hosts

Use `npm run build` as the build command and `dist` as the output directory. Netlify, Vercel, and
Cloudflare Pages work without extra configuration.

# Platform Admin Production Hosting

Platform Admin is an internal control-plane frontend and must use a dedicated restricted HTTPS hostname.

## Production platform

Platform Admin is deployed as Cloudflare Workers Static Assets.

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Output directory: `dist`
- Non-production branch builds: disabled
- Worker preview URLs: disabled by `wrangler.jsonc`

The production build wrapper detects Cloudflare Workers Builds on `main` and refuses to build when either required production URL is missing, non-HTTPS, or local.

## Required production build variables

Set under Worker > Settings > Build > Variables and secrets:

- `VITE_LUKE_SHOP_API_BASE_URL=https://<production-api-host>`
- `VITE_LUKE_SHOP_CUSTOMER_WEB_BASE_URL=https://<production-customer-web-host>`

`VITE_APP_ENV=production` may also be set explicitly; the build wrapper sets it for the production Vite process automatically.

The Customer Web base URL is required because Platform Admin generates and opens published tenant storefront links from the client-management interface.

## Backend CORS

Add only the final Platform Admin HTTPS origin to Backend `CORS_ORIGINS`.

Example shape:

`https://platform.<your-domain>`

Do not use wildcard CORS. Backend production startup rejects wildcard, HTTP, localhost, credentials, paths, query strings, and fragments in configured CORS origins.

## Access policy

Platform Admin is not tenant-branded and must not be exposed as a merchant/customer login surface. Protect the final hostname using the platform's normal operator authentication and, where appropriate, Cloudflare Access/WAF policy.

Local development runs on port `4172` and is not subject to the production URL gate.

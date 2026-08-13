# Deployment Checklist — Platform Admin v0.1.1

1. Backend v0.7.1 ready.
2. Backend CORS includes `http://localhost:4172`.
3. Preserve `.env` and `package-lock.json`.
4. Set `VITE_LUKE_SHOP_CUSTOMER_WEB_BASE_URL=http://localhost:4174`.
5. Run install, verify, build, dev.
6. Open a tenant and test Open storefront / Copy URL.
7. Add a PENDING domain; only mark VERIFIED after the hostname is actually intended for that tenant.

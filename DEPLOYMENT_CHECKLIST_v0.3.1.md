# Deployment Checklist — Platform Admin v0.3.1

- [ ] Deploy Backend v0.10.0 / migration 011 first.
- [ ] Set `VITE_LUKE_SHOP_API_BASE_URL` and `VITE_LUKE_SHOP_CUSTOMER_WEB_BASE_URL` production build variables.
- [ ] Ensure the Platform Admin origin is included in Backend CORS.
- [ ] Run `npm run verify` and production Vite build in CI/local environment with dependencies installed.
- [ ] Verify Template & Font Studio loads templates and typography presets.
- [ ] Edit one non-production template and verify the updated preview.
- [ ] Duplicate, disable, and re-enable a non-production template.
- [ ] Confirm merchant Admin sees only ACTIVE templates.

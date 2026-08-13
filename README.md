# LUKE_SHOP_PLATFORM_ADMIN — current release v0.3.0

**Template Library + Readable Platform Controls** · 2026-08-13

See `RELEASE_NOTES_v0.3.0.md` and `DEPLOYMENT_CHECKLIST_v0.3.0.md`.

# Luke Shop Platform Admin v0.2.1

## v0.2.1 UX Polish

- Search/filter/date controls for Platform Audit.
- Expandable audit details and local pagination.
- Cleaner Platform Owner identity block and keyboard focus treatment.
- Backend v0.8.0 remains unchanged.

Separate Super Admin for the Luke Shop Platform Owner. Requires **Backend v0.8.0+**.

## v0.2.0 Professional Control Center

- Premium enterprise navigation and Platform Owner login.
- Responsive control-plane shell using the Luke Professional Design System.
- No API or database contract changes.

## v0.1.1
- Shows each tenant's canonical Customer Web route.
- Open/copy storefront actions.
- Custom-domain records per tenant.
- Add PENDING domains, manually verify during foundation testing, and remove domains.
- Existing tenant provisioning, plans, modules, capabilities, owner security, and audit remain intact.

## Local development
```env
VITE_LUKE_SHOP_API_BASE_URL=http://localhost:4100
VITE_LUKE_SHOP_CUSTOMER_WEB_BASE_URL=http://localhost:4174
VITE_APP_ENV=development
```

```powershell
npm install --no-audit --no-fund
npm run verify
npm run build
npm run dev
```

Open `http://localhost:4172`. Platform accounts remain separate from Client Admin accounts.

Custom-domain DNS challenge/SSL automation is not included yet; domain VERIFIED state is a routing foundation controlled by Platform Owner.

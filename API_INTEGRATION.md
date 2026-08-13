# API Integration — Platform Admin v0.1.1

Backend requirement: Luke Shop Backend v0.7.1+.

Platform Admin uses `/v1/platform/*` only. It does not query PostgreSQL directly and does not send merchant/customer tenant headers.

Routing controls:
- tenant detail returns `storefront_path`, primary store metadata, and domain records
- `GET /v1/platform/tenants/:tenantRef/domains`
- `POST /v1/platform/tenants/:tenantRef/domains`
- `POST /v1/platform/tenants/:tenantRef/domains/:domainRef/verify`
- `DELETE /v1/platform/tenants/:tenantRef/domains/:domainRef`

The frontend combines the backend-authoritative `storefront_path` with `VITE_LUKE_SHOP_CUSTOMER_WEB_BASE_URL`. Custom-domain verification in v0.1.1 is a Platform Owner foundation/manual operation; automated DNS validation and TLS provisioning are not represented as complete.

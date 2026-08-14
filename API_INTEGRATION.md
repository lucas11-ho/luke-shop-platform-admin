# API Integration — Platform Admin v0.4.0

Required backend: Luke Shop Backend v0.11.0.

Platform Admin uses `/v1/platform/*` only. It never queries PostgreSQL directly and does not send Merchant/Customer tenant headers.

## Platform controls

- platform overview and audit
- tenant list/create/detail/update
- tenant lifecycle, plan, module/limit/capability overrides
- tenant currency/locale/timezone/internal notes
- tenant owner display name/email/access state/password reset/session revocation
- tenant store list/create/update
- plan list/create/update
- template list/create/update/duplicate via Template Studio
- typography preset list/create/update
- custom-domain create/check-DNS/remove
- Platform Owner self profile/password/session management

## DNS verification

Domain creation returns a one-time DNS TXT challenge. `POST /v1/platform/tenants/:tenantRef/domains/:domainRef/verify` performs a backend DNS TXT lookup. The UI does not offer a manual “mark verified” override.

## Security boundary

Platform Owner authorization is separate from merchant/customer identity. Sensitive tenant writes are audited by the backend.

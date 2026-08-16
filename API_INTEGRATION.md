# API Integration — Platform Admin v0.5.0

Required backend: Luke Shop Backend v0.12.0 with migration 013.

Platform Admin uses `/v1/platform/*` only. It never queries PostgreSQL directly and does not send Merchant/Customer tenant headers.

## Status visual pack control

- `GET /v1/platform/status-visual-packs`
- `PATCH /v1/platform/status-visual-packs/:packKey`

Platform Owner can manage approved icon-name mappings and pack status/name. Backend supplies the controlled semantic-status list and approved icon-name list.

Templates store a `status_visual_pack` default. Merchant Customer Experience may inherit it or choose an explicit pack. Customer Web receives the effective resolved mapping through Backend.

Arbitrary SVG/HTML icon uploads are intentionally not part of this contract.

## Existing Platform controls carried forward

Overview/audit, tenants, lifecycle/plan/overrides, regional settings, tenant owner, tenant stores, plans, templates, typography, custom-domain DNS verification and Platform Owner self-security remain supported.

## v0.6.0 customer identity governance visibility

`GET /v1/platform/tenants/:tenantRef` now exposes the tenant `customer_identity` configuration. Platform Admin displays the customer ID prefix, next sequence preview and merchant-configured login methods read-only. Merchant Admin remains the owner of customer-facing identity policy.

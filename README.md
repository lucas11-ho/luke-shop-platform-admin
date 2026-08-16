# LUKE_SHOP_PLATFORM_ADMIN — current release v0.6.0

**Customer Identity & Login Governance Visibility** · 2026-08-17

Requires Luke Shop Backend v0.13.0 with migration 014 for customer identity governance visibility; status visual and existing platform control features remain compatible.

See `RELEASE_NOTES_v0.6.0.md`, `TECHNICAL_ANALYSIS_v0.6.0.md` and `DEPLOYMENT_CHECKLIST_v0.6.0.md`.


## v0.6.0 release focus

Requires Backend v0.13.0 + migration 014. Platform operators can inspect a tenant’s customer ID prefix, next code and configured login methods without silently overriding merchant-owned customer login policy.

Coordinated versions: Backend v0.13.0, Merchant Admin v0.11.0, Customer Web v0.8.0, Platform Admin v0.6.0.

## Status Visual Pack Control Center

Platform Owner can manage approved status-icon mappings, activate/deactivate packs, and assign pack defaults to storefront templates. Customer Web receives the resolved mapping from Backend; order/fulfillment status semantics are not changed by visual configuration.

## Platform Owner controls

Platform Admin now manages plans, typography presets, tenant stores, tenant lifecycle/plan, regional settings, internal notes, tenant-owner identity/access, owner password/session revocation, custom domains with live DNS TXT verification, audit history, and the signed-in Platform Owner's own profile/password/sessions.

Template & Font Studio v3 remains the design-catalog control plane. Platform Admin never sends merchant/customer tenant headers and never queries PostgreSQL directly.

## Domain verification

Creating a custom domain returns a one-time DNS TXT challenge. `Check DNS` asks the backend to resolve TXT records and only verifies the domain when the expected challenge is observed. Manual “mark verified” behavior is not exposed.

## Verification

The shipped `npm run verify` command performs source/regression checks only. No local dev/build workflow is included in this release package.

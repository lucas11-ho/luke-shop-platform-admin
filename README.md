# LUKE_SHOP_PLATFORM_ADMIN — current release v0.5.0

**Status Visual Pack Control Center** · 2026-08-16

Requires Luke Shop Backend v0.12.0 with migration 013 for platform-managed status visual packs; existing platform control features remain compatible.

See `RELEASE_NOTES_v0.5.0.md`, `TECHNICAL_ANALYSIS_v0.5.0.md` and `DEPLOYMENT_CHECKLIST_v0.5.0.md`.

## Status Visual Pack Control Center

Platform Owner can manage approved status-icon mappings, activate/deactivate packs, and assign pack defaults to storefront templates. Customer Web receives the resolved mapping from Backend; order/fulfillment status semantics are not changed by visual configuration.

## Platform Owner controls

Platform Admin now manages plans, typography presets, tenant stores, tenant lifecycle/plan, regional settings, internal notes, tenant-owner identity/access, owner password/session revocation, custom domains with live DNS TXT verification, audit history, and the signed-in Platform Owner's own profile/password/sessions.

Template & Font Studio v3 remains the design-catalog control plane. Platform Admin never sends merchant/customer tenant headers and never queries PostgreSQL directly.

## Domain verification

Creating a custom domain returns a one-time DNS TXT challenge. `Check DNS` asks the backend to resolve TXT records and only verifies the domain when the expected challenge is observed. Manual “mark verified” behavior is not exposed.

## Verification

The shipped `npm run verify` command performs source/regression checks only. No local dev/build workflow is included in this release package.

# LUKE_SHOP_PLATFORM_ADMIN — current release v0.4.0

**Platform Control Completion** · 2026-08-14

Requires Luke Shop Backend v0.11.0 with migration 012 for the new platform session/control fields.

See `RELEASE_NOTES_v0.4.0.md`, `TECHNICAL_ANALYSIS_v0.4.0.md` and `DEPLOYMENT_CHECKLIST_v0.4.0.md`.

## Platform Owner controls

Platform Admin now manages plans, typography presets, tenant stores, tenant lifecycle/plan, regional settings, internal notes, tenant-owner identity/access, owner password/session revocation, custom domains with live DNS TXT verification, audit history, and the signed-in Platform Owner's own profile/password/sessions.

Template & Font Studio v3 remains the design-catalog control plane. Platform Admin never sends merchant/customer tenant headers and never queries PostgreSQL directly.

## Domain verification

Creating a custom domain returns a one-time DNS TXT challenge. `Check DNS` asks the backend to resolve TXT records and only verifies the domain when the expected challenge is observed. Manual “mark verified” behavior is not exposed.

## Verification

The shipped `npm run verify` command performs source/regression checks only. No local dev/build workflow is included in this release package.

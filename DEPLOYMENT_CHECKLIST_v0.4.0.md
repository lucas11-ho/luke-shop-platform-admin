# Deployment Checklist — Platform Admin v0.4.0

- [ ] Deploy Backend v0.11.0 and migration 012 first.
- [ ] Confirm Platform Admin production origin is permitted by backend CORS.
- [ ] Test Platform Owner profile/password/session management.
- [ ] Test plan create/edit and typography preset create/edit.
- [ ] Test tenant store create/edit and regional settings.
- [ ] Test tenant-owner identity/status changes and session revocation.
- [ ] Create a controlled custom domain, publish the shown TXT challenge and confirm `Check DNS` verifies only after DNS resolves correctly.
- [ ] Review platform audit entries for sensitive writes.

No local dev/build workflow is part of this release package.

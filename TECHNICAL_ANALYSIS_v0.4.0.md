# Technical Analysis — Platform Admin v0.4.0

Backend control routes for tenants, plans and design catalogs are now surfaced as explicit Platform Owner controls. The tenant detail workspace distinguishes effective plan values from editable tenant overrides, preventing inherited values from being accidentally persisted as overrides.

Tenant-owner identity/status changes are separate from password reset and session revocation. Suspending or blocking the owner revokes active sessions server-side.

Domain verification is now evidence based: the backend resolves a DNS TXT challenge instead of accepting a manual VERIFIED state. The challenge value is shown to the Platform Owner when the domain is created.

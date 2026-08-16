# Luke Shop Platform Admin v0.5.0

## Status Visual Pack Control Center

Base: v0.4.0. Requires Backend v0.12.0 + migration 013.

- Template & Font Studio now includes Status visuals.
- Platform Owner manages approved semantic-status → icon-name mappings for each visual pack.
- Templates choose the default status visual pack used by merchants/stores.
- Pack activation/name/icon mappings are loaded from and persisted by Backend v0.12.0.
- Arbitrary uploaded SVG/HTML icons are intentionally not supported.
- Changing a visual pack never changes order state-machine semantics.

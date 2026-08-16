# Technical Analysis — Platform Admin v0.5.0

The status icon system is a platform control plane, not order data. Platform Admin edits approved mappings stored in `platform_status_visual_packs`; templates reference a pack key; Merchant Admin may inherit/override the pack; Customer Web receives the resolved public mapping through the storefront Experience payload.

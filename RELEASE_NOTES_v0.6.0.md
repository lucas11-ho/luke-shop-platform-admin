# Luke Shop luke-shop-platform-admin v0.6.0

## Customer Identity & Login Governance Visibility

- Adds read-only tenant identity governance card to Client Platform detail.
- Shows customer ID prefix, next-code preview and configured login methods.
- Merchant remains the owner of customer-facing ID/login policy; Platform inspection does not silently override it.

## Release boundary

- Requires Backend v0.13.0 + migration 014 for customer_identity data.
- No new Platform write authority is introduced for merchant customer login policy.

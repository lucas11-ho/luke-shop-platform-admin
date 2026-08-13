# Hosting — Luke Shop Platform Admin v0.1.0

Local development port: `4172`. Production should use a dedicated restricted Platform Admin hostname over HTTPS. Set `VITE_LUKE_SHOP_API_BASE_URL` to Backend v0.7.0+ and allow only the exact Platform Admin origin in backend CORS.

This frontend is not tenant-branded and should not be exposed as a client login surface.

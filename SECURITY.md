# Security

Platform access is intentionally separate from merchant access. Platform JWTs use a dedicated audience; only Platform OWNER can provision or mutate tenants. Browser tokens are stored in sessionStorage for tab-scoped development behavior. Production deployment should use HTTPS, strict CORS, long signing secrets, and a restricted Platform Admin hostname.

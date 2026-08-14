@echo off
setlocal
cd /d "%~dp0"
echo =============================================================
echo Luke Shop Platform Admin v0.3.1 - Template ^& Font Studio
echo =============================================================
if not exist .env copy /Y .env.example .env >nul
node -e "const v=+process.versions.node.split('.')[0];if(v<24){console.error('Node 24+ required');process.exit(1)}"
if errorlevel 1 pause & exit /b 1
if not exist node_modules call npm install --no-audit --no-fund
if errorlevel 1 pause & exit /b 1
call npm run verify
if errorlevel 1 pause & exit /b 1
call npm run build
if errorlevel 1 pause & exit /b 1
call npm run dev

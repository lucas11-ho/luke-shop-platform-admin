@echo off
setlocal
cd /d "%~dp0"
call npm run verify
if errorlevel 1 pause & exit /b 1
pause

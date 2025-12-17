@echo off
REM Development setup script for Windows

echo 🚀 Sales Projection Dashboard Setup
echo ====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed successfully!

REM Build for production
echo.
echo 🔨 Building for production...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)

echo ✅ Build completed successfully!
echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo   Development:  npm run dev
echo   Production:   npm start
echo   Build:        npm run build
echo.
echo 📖 Visit http://localhost:3000 to view the dashboard

pause


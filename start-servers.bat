@echo off
echo Starting PrintCraft with Virtual Try-On AI Avatar...
echo.

echo Starting Backend Server...
start "PrintCraft Backend" cmd /k "cd backend && npm start"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "PrintCraft Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
echo.
echo Virtual Try-On feature is ready!
echo Select a product, choose size/color, then click Virtual Try-On
echo.
echo Press any key to exit this window (servers will continue running)
pause > nul

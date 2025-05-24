@echo off
echo ========================================================================
echo VibeScribe Project Runner
echo ========================================================================
echo.
echo IMPORTANT: Before you begin, please ensure you have:
echo 1. Installed Node.js and Python.
echo 2. Installed frontend dependencies: Open a terminal, cd into 'frontend',
echo    and run 'npm install'.
echo 3. Installed backend dependencies: Open a terminal, cd into 'backend',
echo    create a Python virtual environment (e.g., python -m venv .venv),
echo    activate it (e.g., .venv\Scripts\activate), and then run
echo    'pip install -r requirements.txt'.
echo 4. Set up API Keys for the AI features:
echo    - Copy 'backend/.env.example' to 'backend/.env'.
echo    - Fill in your GOOG_API_KEY and LFM_API_KEY in 'backend/.env'.
echo      (Note: The AI script 'ai/recommendations.py' might also
echo       look for this .env file in the project root if not found in backend/)
echo 5. Applied database migrations: In the 'backend' directory (with venv
echo    activated), run 'python manage.py migrate'.
echo.
echo This script will attempt to start the Frontend and Backend servers.
echo Press any key to continue...
pause > nul
echo.

echo Starting Frontend Server (React/Vite)...
cd frontend
start "VibeScribe Frontend" cmd /k npm run dev
cd ..
echo Frontend server is starting in a new window.
echo It typically runs on http://localhost:5173 or http://localhost:3000.
echo Please wait for it to compile and become accessible.
echo.

echo Starting Backend Server (Django)...
cd backend
REM Check if virtual environment exists and try to activate it
IF EXIST .venv\Scripts\activate (
    echo Activating Python virtual environment...
    start "VibeScribe Backend" cmd /k ".venv\Scripts\activate && python manage.py runserver"
) ELSE (
    echo Virtual environment not found at backend\.venv\Scripts\activate
    echo Please ensure it's created and dependencies are installed.
    echo Attempting to run server without explicit venv activation in this script...
    start "VibeScribe Backend" cmd /k "python manage.py runserver"
)
cd ..
echo Backend server is starting in a new window.
echo Please wait for it to become accessible.
echo.
echo ========================================================================
echo Servers are starting up. Please allow a moment for them to initialize.
echo ========================================================================
echo.
echo To run the AI Recommendation Test Script (Optional):
echo 1. Open a new terminal/command prompt.
echo 2. Navigate to the project root directory: cd /path/to/team-Data-Sayangtists-2025
echo 3. If you use a virtual environment for the backend, activate it.
echo    (e.g., backend\.venv\Scripts\activate)
echo 4. Ensure your .env file with API keys (GOOG_API_KEY, LFM_API_KEY)
echo    is in the 'backend/' directory
echo 5. Run the script: python ai/recommendations.py
echo    (You might need to provide input text as prompted by the script)
echo.
echo ========================================================================
echo To stop the servers, close their respective command prompt windows.
echo ========================================================================
echo.

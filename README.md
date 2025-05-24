# VibeScribe

## Project Description

VibeScribe is an intelligent journaling application designed to enhance your reflective moments with a personalized soundtrack. As you pen down your thoughts and feelings, VibeScribe analyzes the emotional undertones of your entry using advanced AI. It then curates and suggests music tracks that resonate with your current mood, helping you to deepen your connection with your experiences.

**Key Features:**
*   **AI-Powered Mood Analysis:** Leverages AI (Google Gemini) to understand the sentiment and themes of your journal entries.
*   **Personalized Music Recommendations:** Suggests tracks from Last.fm tailored to your vibe, providing a unique soundtrack to your thoughts.
*   **Seamless Journaling Experience:** Offers a clean, intuitive interface built with React and Chakra UI for a pleasant writing and reflection process.
*   **Enhanced Emotional Connection:** Aims to help users discover music that complements and amplifies their current state of mind, making journaling a more immersive experience.

## Team Members

*   Shaun Marvin Acenas
*   Dean Avior Peñamora
*   Zen Adrian Tandogon

## Technologies Used

*   **Frontend:** React, TypeScript, Chakra UI
*   **Backend:** Django, Django REST Framework
*   **AI/ML:** Google Gemini API (for theme extraction), Last.fm API (for music recommendations)
*   **Database:** SQLite
*   **Language:** Python (Backend & AI), TypeScript (Frontend)

## Setup Instructions

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (usually comes with Node.js)
*   Python (v3.8.x or later recommended)
*   pip (usually comes with Python)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment (recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Set up environment variables:
    *   In the `backend` directory, copy the example environment file: `cp .env.example .env`
    *   Open the newly created `.env` file and add your API keys:
        ```dotenv
        GOOG_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
        LFM_API_KEY="YOUR_LAST_FM_API_KEY"
        ```

5.  Apply database migrations:
    ```bash
    python manage.py migrate
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory (from the project root):
    ```bash
    cd frontend 
    ```
    (If you are in the `backend` directory, use `cd ../frontend`)
2.  Install npm dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    *   In the `frontend` directory, copy the example environment file (`env.example`) to a `.env` file.


### Quick Start (Windows using `run_project.bat`)

For Windows users, the easiest way to get the frontend and backend servers running is to use the provided batch script. 

**Prerequisites:** Before running the script, ensure you have completed all relevant steps in the "Setup Instructions" section above, including:
*   Installing Node.js, Python, and all dependencies (`npm install` in `frontend/`, `pip install -r backend/requirements.txt`).
*   Setting up the `.env` files in both `frontend/` (with `VITE_API_BASE_URL`) and `backend/` (with your API keys).
*   Running database migrations (`python manage.py migrate` in `backend/` with the virtual environment active).

**To Run:**
1.  Navigate to the project root directory in your command prompt.
2.  Execute the script:
    ```batch
    .\run_project.bat
    ```
3.  This will open separate windows for the frontend and backend servers. Follow any instructions displayed by the script.

### Running the Application Manually (All Platforms)

If you are not on Windows, or prefer to run the servers manually:

1.  **Start the Backend Server:**
    *   Ensure you are in the `backend` directory and your virtual environment is activated.
    *   Run the Django development server:
        ```bash
        python manage.py runserver
        ```
    *   The backend server should start, typically on `http://127.0.0.1:8000`.

2.  **Start the Frontend Development Server:**
    *   Ensure you are in the `frontend` directory.
    *   Run the React development server:
        ```bash
        npm run dev
        ```
    *   The frontend development server will start, typically on `http://localhost:5173` or `http://localhost:3000`.

## Usage Guide

VibeScribe allows you to create journal entries and receive music recommendations based on the themes extracted from your text.

*   **Creating a New Entry:** 
    1.  Navigate to the main page of the application.
    2.  Click on the "New Entry" or similar button.
    3.  Enter a title and your thoughts in the content area.
    4.  Click "Save".
*   **Viewing Entries:** 
    1.  Past entries are listed on the sidebar
    2.  Click on an entry summary to view its full details.
*   **Music Recommendations:** 
    1.  After saving a new entry, the system automatically analyzes its content.
    2.  Music recommendations based on the detected themes will be displayed below your entry details.

## Test Cases / Sample Inputs

To test the core music recommendation logic independently, you can run the `ai/recommendations.py` script directly. This script takes a text input (simulating a journal entry) and outputs a JSON with music recommendations.

1.  **Navigate to the project root directory** if you are not already there.

2.  **Ensure your API keys are set in `backend/.env`:** The script `ai/recommendations.py` is configured to load the `GOOG_API_KEY` and `LFM_API_KEY` from the `.env` file located in the `backend/` directory. Make sure this file exists and contains your keys as described in the "Backend Setup" section.

3.  **Run the script:**
    ```bash
    python ai/recommendations.py
    ```
    The script will prompt you: `¿Qué estás pensando?` Enter your sample journal entry text.

### Sample Files

*   `examples/sample_entry_input.txt`: Contains sample text that can be used as input for `ai/recommendations.py`.
*   `examples/sample_recommendation_output.json`: Shows an example of the JSON output produced by the script for the sample input.


## Architecture / System Flow

*   **Frontend (React/TypeScript with Chakra UI):** Handles user interaction, displays journal entries, and presents music recommendations. Communicates with the backend via REST API calls.
*   **Backend (Django/Python):** 
    *   Provides API endpoints for CRUD operations on journal entries.
    *   When a new entry is created, it calls the AI module.
    *   Stores journal entries and associated recommendations in the SQLite database.
*   **AI Module (`ai/recommendations.py`):**
    1.  Receives text content from the backend.
    2.  Uses Google Gemini API to extract key themes from the text.
    3.  For each theme, queries the Last.fm API to get relevant music track recommendations.
    4.  Returns the structured recommendation data to the backend.
*   **Data Flow:** 
    1.  User creates/submits a journal entry via the Frontend.
    2.  Frontend sends entry data (title, content, date) to Backend API.
    3.  Backend saves the entry to the database.
    4.  Backend calls the AI Module with the entry content.
    5.  AI Module processes the content, fetches recommendations from Gemini and Last.fm, and returns them to the Backend.
    6.  Backend saves recommendations to the database, associated with the entry.
    7.  Backend sends the created entry and its recommendations back to the Frontend.
    8.  Frontend displays the entry and its music recommendations to the user.

## Future Enhancements

*   User authentication and multiple user support.
*   More sophisticated theme extraction and sentiment analysis.
*   Option to directly play music previews within the app.
*   Ability to save/favorite recommended tracks.
*   Different recommendation sources (e.g., Spotify, Apple Music).
*   Data visualization of mood trends over time.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

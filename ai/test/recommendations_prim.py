import google.generativeai as genai
from dotenv import load_dotenv
# from collections import defaultdict
import os
import json
import requests

# Load environment variables
load_dotenv()

load_dotenv(dotenv_path="../env/.env")

# API keys
genai.configure(api_key=os.getenv("GOOG_API_KEY")) # type: ignore
last_fm_api = os.getenv("LFM_API_KEY")

# Initialize the model
model = genai.GenerativeModel("models/gemma-3-12b-it") # type: ignore

def extract_themes(text):
    prompt = f"""You are a helpful assistant that summarizes content themes concisely.
Given the following text, identify and return a maximum of three one-word themes that best represent the main idea. 
Respond with only the one-word themes, separated by commas. No explanation or extra text.

Text: {text}

Themes:"""
    response = model.generate_content(prompt)
    theme_string = response.text.strip().lower()
    themes = [theme.strip() for theme in theme_string.split(",") if theme.strip()]
    return themes[:5] # Adjustable at any number (it could be 1, 5, or even 10 based on preference)

def recos_cada_tema(theme, limit=10):
    url = "https://ws.audioscrobbler.com/2.0/"
    params = {
        "method": "tag.gettoptracks",
        "tag": theme,
        "api_key": last_fm_api,
        "format": "json",
        "limit": limit
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data.get("tracks", {}).get("track", [])

def get_recommendations(input):
    themes = extract_themes(input)
    print(f"Themes: {themes}")
    
    recommendations = {}
    for theme in themes:
        print(f"Fetching recommendations for theme: {theme}")
        tracks = recos_cada_tema(theme)
        recommendations[theme] = [
            {
                "name": track["name"],
                "artist": track["artist"]["name"],
                "url": track["url"],
                "image": track["image"][2]["#text"] if track["image"] else None
            }
            for track in tracks
        ]
    return recommendations

if __name__ == "__main__":
    user_input = input("Que estas piensando?\n")
    recommendations = get_recommendations(user_input)
    print(json.dumps(recommendations, indent=2))
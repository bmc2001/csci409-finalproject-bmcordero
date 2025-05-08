import os
from dotenv import load_dotenv

load_dotenv()

WMATA_API_KEY = os.getenv("WMATA_API_KEY")

HEADERS = {
    "api_key": WMATA_API_KEY
}
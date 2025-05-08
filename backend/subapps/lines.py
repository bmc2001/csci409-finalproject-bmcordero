from fastapi import APIRouter, Depends
import requests
from config import HEADERS
from auth import authenticate

router = APIRouter()


@router.get("/lines")
def get_lines(user: str = Depends(authenticate)):
    url = "https://api.wmata.com/Rail.svc/json/jLines"
    response = requests.get(url, headers=HEADERS)
    return response.json()

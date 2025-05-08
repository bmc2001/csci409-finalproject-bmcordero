from fastapi import APIRouter, Depends
import requests
from config import HEADERS
from auth import authenticate

router = APIRouter()


@router.get("/station/{station_code}")
def get_station_info(station_code: str, user: str = Depends(authenticate)):
    url = f"https://api.wmata.com/Rail.svc/json/jStationInfo?StationCode={station_code}"
    response = requests.get(url, headers=HEADERS)
    return response.json()

from fastapi import FastAPI
from subapps import lines, stations, station_info

app = FastAPI()

app.include_router(lines.router)
app.include_router(stations.router)
app.include_router(station_info.router)

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import os
from dotenv import load_dotenv

load_dotenv()

security = HTTPBasic()


def authenticate(credentials: HTTPBasicCredentials = Depends(security)):
    username = os.getenv("AUTH_USERNAME")
    password = os.getenv("AUTH_PASSWORD")

    if credentials.username != username or credentials.password != password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid login details",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

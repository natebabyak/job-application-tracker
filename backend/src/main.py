from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os
from src.applications.router import router
from src.db import create_tables
from typing import Annotated

API_KEY = os.getenv('API_KEY')

if API_KEY is None:
    raise ValueError('API_KEY is None')


async def verify_api_key(x_api_key: Annotated[str, Header()]) -> str:
    if x_api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='X-Api-Key is invalid'
        )

    return x_api_key


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield
    

app = FastAPI(
    dependencies=[Depends(verify_api_key)],
    lifespan=lifespan
)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

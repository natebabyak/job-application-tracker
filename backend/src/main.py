from src.applications.router import router as applications_router
from contextlib import asynccontextmanager
from src.database import create_tables
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.users.router import router as users_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title="Apt",
    lifespan=lifespan,
    license_info={
        "name": "MIT"
    }
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://frontend:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applications_router)
app.include_router(users_router)

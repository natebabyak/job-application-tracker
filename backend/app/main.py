from contextlib import asynccontextmanager
from .dependencies import create_db_and_tables
from fastapi import FastAPI
from .routers import applications, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(applications.router)
app.include_router(users.router)

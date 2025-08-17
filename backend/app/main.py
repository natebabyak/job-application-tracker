from app.dependencies import create_tables
from app.routers import applications, users
from contextlib import asynccontextmanager
from fastapi import FastAPI


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

app.include_router(applications.router)
app.include_router(users.router)

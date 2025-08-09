from dotenv import load_dotenv
from fastapi import Depends, FastAPI
from os import getenv
from .routers import applications, users
from sqlmodel import create_engine, Session, SQLModel

app = FastAPI(dependencies=[Depends()])

app.include_router(applications.router)
app.include_router(users.router)

load_dotenv()

DATABASE_URL = getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable failed to load")

engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session

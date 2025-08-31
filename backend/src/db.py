import os
from sqlmodel import create_engine, Session, SQLModel
from typing import Generator

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is None")

engine = create_engine(DATABASE_URL, echo=True)


def create_tables() -> None:
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

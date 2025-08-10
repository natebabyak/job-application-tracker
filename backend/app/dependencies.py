from dotenv import load_dotenv
from fastapi_nextauth_jwt import NextAuthJWT  # type: ignore
import os
from sqlmodel import create_engine, Session, SQLModel
from typing import Generator

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is None.")

engine = create_engine(DATABASE_URL, echo=True)


def create_tables() -> None:
    """Creates the user and application tables."""
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """Yields the database session.

    Yields
    ------
    Session
        Database session.
    """
    with Session(engine) as session:
        yield session


JWT = NextAuthJWT()

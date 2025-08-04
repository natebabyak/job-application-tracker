from sqlmodel import create_engine, Session, SQLModel
from dotenv import load_dotenv
from os import getenv

load_dotenv()

DATABASE_URL = getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable failed to load")

engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    """Creates the PostgreSQL database and application and user tables."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Returns the """
    with Session(engine) as session:
        yield session

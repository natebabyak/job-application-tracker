from sqlmodel import create_engine, SQLModel
from dotenv import load_dotenv
from os import getenv

load_dotenv()

DATABASE_URL = getenv("DATABSE_URL", '')

engine = create_engine(DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

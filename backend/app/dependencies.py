from dotenv import load_dotenv
from fastapi_nextauth_jwt import NextAuthJWT  # type: ignore
from fastapi.security import OAuth2PasswordBearer
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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = JWT.verify(token)  # decode & verify JWT
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

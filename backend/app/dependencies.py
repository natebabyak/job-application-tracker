from dotenv import load_dotenv
from fastapi import Depends, Header, HTTPException, status
from fastapi_nextauth_jwt import NextAuthJWT  # type: ignore
import os
from sqlmodel import create_engine, Session, SQLModel
from typing import Annotated, Dict, Generator, Literal

load_dotenv()

API_KEY = os.getenv("API_KEY")
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


def verify_api_key(x_api_key: Annotated[str, Header()]) -> Literal[True]:
    """Verifies the internal API key."""
    if API_KEY is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="API key is None."
        )

    if x_api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid API key."
        )

    return True


def get_current_user_id(token: Annotated[Dict[str, int], Depends(JWT)]) -> int:
    """Gets the current user's unique identifier.

    Parameters
    ----------
    token : Dict[str, int]
        JSON web token containing the user's unique identifier.

    Returns
    -------
    int
        Current user's unique identifier.

    Raises
    ------
    HTTPException
        If the user's ID does not exist.
    """
    user_id = token.get('sub')

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="User ID is None."
        )

    return user_id

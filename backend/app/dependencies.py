from app.models.user import Provider, User
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi_nextauth_jwt import NextAuthJWT  # type: ignore
import os
from sqlmodel import create_engine, select, Session, SQLModel
from typing import Annotated, Dict, Generator
from uuid import UUID

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


def get_current_user_id(
    token: Annotated[Dict[str, Provider | int], Depends(JWT)],
    session: Annotated[Session, Depends(get_session)]
) -> UUID:
    """Gets the current user's unique identifier.

    Parameters
    ----------
    token : Dict[str, Provider | int]
        JSON web token containing the user's provider and provider ID.

    Returns
    -------
    UUID
        Current user's unique identifier.

    Raises
    ------
    HTTPException
        If the token is invalid.
    """
    provider = token.get('provider')
    provider_id = token.get('providerId')

    if provider is None or provider_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token."
        )

    user = session.exec(select(User).where(
        User.provider == Provider(provider),
        User.provider_id == int(provider_id)
    )).first()

    if user is None:
        user = User(
            provider=Provider(provider),
            provider_id=int(provider_id)
        )

        session.add(user)
        session.commit()
        session.refresh(user)

    return user.id

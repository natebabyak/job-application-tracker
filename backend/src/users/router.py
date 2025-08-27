from src.database import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, Session
from typing import Annotated
from src.users.constants import Theme
from src.users.dependencies import get_current_user_id
from src.users.models import User
from src.users.schemas import UserCreate, UserRead
from uuid import UUID

router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post("/", response_model=UserRead)
async def create_user(
    user_create: UserCreate,
    session: Annotated[Session, Depends(get_session)]
) -> User:
    """Creates a user.

    Parameters
    ----------
    user_create : UserCreate
        Schema for creating a user.
    session : Session
        Database session.

    Returns
    -------
    User
        Created user.
    """
    statement = select(User).where(User.provider == user_create.provider).where(
        User.provider_id == user_create.provider_id)

    user = session.exec(statement).first()

    if user is not None:
        return user

    user = User(**user_create.model_dump())

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.get("/{user_id}", response_model=UserRead)
async def read_user(
    user_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> User:
    """Reads a user by their unique identifier.

    Parameters
    ----------
    user_id : UUID
        Unique identifier of the user to read.
    session : Session
        Database session.

    Returns
    -------
    User
        Read user.

    Raises
    ------
    HTTPException
        If the user is not found.
    """
    user = session.get(User, user_id)

    if user is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            f"User with ID '{user_id}' not found."
        )

    return user


@router.patch("/me/theme")
async def update_user(
    user_id: Annotated[UUID, Depends(get_current_user_id)],
    theme: Theme,
    session: Annotated[Session, Depends(get_session)]
) -> None:
    raise NotImplementedError


@router.delete("/me")
async def delete_user(
    user_id: Annotated[UUID, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> None:
    """Deletes a user by their unique identifier.

    Parameters
    ----------
    user_id : UUID
        Unique identifier of the user to delete.
    session : Session
        Database session.

    Raises
    ------
    HTTPException
        If the user is not found.
    """
    user = session.get(User, user_id)

    if user is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            f"User with ID '{user_id}' not found."
        )

    session.delete(user)
    session.commit()

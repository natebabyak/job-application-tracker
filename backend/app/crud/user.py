from dependencies import get_session
from fastapi import Depends, HTTPException
from models.user import User
from schemas.user import UserCreate, UserUpdate
from sqlmodel import select, Session
from typing import Annotated
from uuid import UUID


def create_user(
    user_create: UserCreate,
    session: Session
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
    user = session.exec(select(User).where(User.id == user_create.id)).first()

    if user is not None:
        return user

    new_user = User(**user_create.model_dump())

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return new_user


def read_user(
    user_id: UUID,
    session: Session
) -> User:
    """Reads a user by their ID.

    Parameters
    ----------
    user_id : UUID
        Unique identifier of the user to delete.
    session : Session
        Database session.

    Raises
    ------
    HTTPException
        404 error if the user is not found.
    """
    user = session.get(User, user_id)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user


def update_user(
    user_update: UserUpdate,
    session: Session
) -> User:
    """Updates a user."""
    raise NotImplementedError()


def delete_user(
    user_id: UUID,
    session: Session
) -> None:
    """
    Deletes a user by their ID.

    Parameters
    ----------
    user_id : UUID
        Unique identifier of the user to delete.
    session : Session
        Database session.

    Raises
    ------
    HTTPException
        404 error if the user is not found.
    """
    user = session.get(User, user_id)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    session.delete(user)
    session.commit()

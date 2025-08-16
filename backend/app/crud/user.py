from fastapi import HTTPException
from models.user import User
from schemas.user import UserCreate, UserUpdate
from sqlmodel import Session
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
    user = session.get(User, user_create.id)

    if user is not None:
        return user

    new_user = User(**user_create.model_dump())

    session.add(new_user)
    session.commit()

    return new_user


def read_user(
    user_id: UUID,
    session: Session
) -> User:
    """Reads a user.

    Parameters
    ----------
    user_id : int
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
        raise HTTPException(status_code=404, detail="User not found")

    return user


def update_user(
    user_update: UserUpdate,
    session: Session
) -> User:
    """Updates a user.

    Parameters
    ----------
    user_update : UserUpdate
        Schema for updating a user.
    session : Session
        Database session.

    Returns
    -------
    User
        Updated user.

    Raises
    ------
    HTTPException
        If the user is not found.
    """
    user = session.get(User, user_update.id)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user = User(**user_update.model_dump())

    session.add(user)
    session.commit()

    return user


def delete_user(
    user_id: UUID,
    session: Session
) -> None:
    """Deletes a user.

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
        raise HTTPException(status_code=404, detail="User not found")

    session.delete(user)
    session.commit()

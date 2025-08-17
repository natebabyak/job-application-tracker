from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from fastapi import HTTPException, status
from sqlmodel import Session


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
    existing_user = session.get(User, user_create.id)

    if existing_user is not None:
        return existing_user

    new_user = User(**user_create.model_dump())

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return new_user


def read_user(
    user_id: int,
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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID '{user_id}' not found."
        )

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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID '{user_update.id}' not found."
        )

    user = User(**user_update.model_dump())

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


def delete_user(
    user_id: int,
    session: Session
) -> None:
    """Deletes a user.

    Parameters
    ----------
    user_id : int
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
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID '{user_id}' not found."
        )

    session.delete(user)
    session.commit()

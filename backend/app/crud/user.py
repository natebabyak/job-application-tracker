from models.user import User
from schemas.user import UserCreate
from fastapi import HTTPException
from sqlmodel import select, Session
from uuid import UUID


def create_user(user_create: UserCreate, session: Session) -> User:
    existing_user = session.exec(
        select(User).where(
            User.provider == user_create.provider,
            User.provider_id == user_create.provider_id
        )
    ).first()

    if existing_user:
        return existing_user

    new_user = User(
        provider=user_create.provider,
        email=user_create.email,
        provider_id=user_create.provider_id,
        image=user_create.image,
        name=user_create.name
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return new_user


def delete_user(user_id: UUID, session: Session) -> None:
    """
    Deletes a user.

    Parameters
    ----------
    user_id : UUID
        Unique identifier of user to delete.
    session : Session
        Database session.

    Raises
    ------
    HTTPException
        If the user is not found.
    """
    user = session.get(User, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    session.delete(user)
    session.commit()

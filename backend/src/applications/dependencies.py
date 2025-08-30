from backend.src.db import get_session
from fastapi import Depends, HTTPException, status
from fastapi_nextauth_jwt import NextAuthJWT  # type: ignore
from typing import Annotated, Any, Dict
from sqlmodel import select, Session
from src.users.models import User

JWT = NextAuthJWT()


def get_current_user_id(
    token: Annotated[Dict[str, str], Depends(JWT)],
    session: Annotated[Session, Depends(get_session)]
) -> int:
    user_id = token['id']

    if user_id is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)

    statement = select(User).where(
        User.id == provider,
        User.provider_account_id == provider_account_id
    )

    user = session.exec(statement).first()

    if user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    return user.id

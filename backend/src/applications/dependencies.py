from src.database import get_session
from fastapi import Depends, HTTPException, status
from fastapi_nextauth_jwt import NextAuthJWT  # type: ignore
from typing import Annotated, Any, Dict
from sqlmodel import select, Session
from src.users.models import User
from uuid import UUID

JWT = NextAuthJWT()


def get_current_user_id(
    token: Annotated[Dict[str, Any], Depends(JWT)],
    session: Annotated[Session, Depends(get_session)]
) -> UUID:
    provider = token.get('provider')
    provider_id = token.get('providerId')

    if provider is None or provider_id is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)

    statement = select(User).where(User.provider == provider).where(
        User.provider_id == provider_id)

    user = session.exec(statement).first()

    if user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    return user.id

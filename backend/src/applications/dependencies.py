from fastapi import Depends
from fastapi_nextauth_jwt import NextAuthJWT  # type: ignore
from typing import Annotated, Dict

JWT = NextAuthJWT()


def get_current_user_id(
    token: Annotated[Dict[str, str], Depends(JWT)]
) -> str:
    return token['id']

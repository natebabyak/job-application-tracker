from fastapi import HTTPException, Request, status
import jwt
import os


def get_current_user_id(request: Request) -> str:
    authorization_header = request.headers.get('Authorization')

    if authorization_header is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Authorization header is missing'
        )

    if not authorization_header.startswith('Bearer'):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Authorization header is invalid'
        )

    token = authorization_header[7:]

    secret = os.getenv('JWT_SECRET')

    if secret is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Secret is missing'
        )

    payload = jwt.decode(token, secret, algorithms=["HS256"])

    user_id = payload.get("email")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='User ID is missing'
        )

    return user_id

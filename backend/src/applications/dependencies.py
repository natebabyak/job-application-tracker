from dotenv import load_dotenv
from fastapi import HTTPException, Request, status
import jwt
import os

load_dotenv()


def get_current_user_id(request: Request) -> str:
    encoded = request.cookies.get('authjs.session-token')

    if encoded is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='authjs.session-token is None'
        )

    secret = os.getenv('AUTH_SECRET')

    if secret is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='AUTH_SECRET is None'
        )

    decoded = jwt.decode(
        jwt=encoded,
        key=secret,
        algorithms=['HS256'],
        verify=True
    )

    print(decoded)

    user_id = decoded.get('id')

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='user_id is None'
        )

    return user_id

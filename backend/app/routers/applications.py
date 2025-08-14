from fastapi import APIRouter, Depends, HTTPException, status
from crud.application import create_application, create_applications
from schemas.application import ApplicationCreate, ApplicationRead
from typing import Annotated, Any, Dict
from dependencies import get_session, JWT
from models.user import User
from sqlmodel import Session

router = APIRouter()


@router.get("/applications", response_model=ApplicationRead)
async def create_application_endpoint(
    application_create: ApplicationCreate,
    session: Annotated[Session, Depends(get_session)],
    jwt: Annotated[Dict[str, Any], Depends(JWT)]
) -> ApplicationRead:
    user_id = jwt['sub']

    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    return create_application(ApplicationCreate(

    ))

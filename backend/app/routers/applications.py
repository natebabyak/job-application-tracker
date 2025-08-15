from fastapi import APIRouter, Depends, HTTPException, status
from crud.application import create_application
from schemas.application import ApplicationCreate, ApplicationRead
from typing import Annotated, Any, Dict
from dependencies import get_session, JWT
from sqlmodel import Session
from models.application import Application

router = APIRouter()


@router.post("/applications", response_model=ApplicationRead)
async def create_application_endpoint(
    application_create: ApplicationCreate,
    session: Annotated[Session, Depends(get_session)],
    jwt: Annotated[Dict[str, Any], Depends(JWT)]
) -> Application:
    user_id = jwt.get('sub')

    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    application_data = application_create.model_copy(
        update={"owner_id": user_id})

    return create_application(application_data, session=session)

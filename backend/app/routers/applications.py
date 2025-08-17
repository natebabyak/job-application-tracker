import app.crud.application as crud
from app.dependencies import get_session, verify_api_key, get_current_user_id
from app.models.application import Application
import app.schemas.application as schemas
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from typing import Annotated, List
from uuid import UUID

router = APIRouter(
    prefix="/applications",
    tags=["applications"],
    dependencies=[Depends(verify_api_key)]
)


@router.post("/me", response_model=schemas.ApplicationRead)
async def create_application(
    application_create: schemas.ApplicationCreate,
    session: Annotated[Session, Depends(get_session)],
    user_id: Annotated[int, Depends(get_current_user_id)]
) -> Application:
    return crud.create_application(application_create, user_id, session)


@router.post("/me", response_model=List[schemas.ApplicationRead])
async def create_applications(
    applications_create: List[schemas.ApplicationCreate],
    session: Annotated[Session, Depends(get_session)],
    user_id: Annotated[int, Depends(get_current_user_id)]
) -> List[Application]:
    return crud.create_applications(applications_create, user_id, session)


@router.get("/{application_id}", response_model=schemas.ApplicationRead)
async def read_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> Application:
    return crud.read_application(application_id, session=session)


@router.get("/{user_id}", response_model=List[schemas.ApplicationRead])
async def read_applications(
    user_id: int,
    session: Annotated[Session, Depends(get_session)]
) -> List[Application]:
    return crud.read_applications(user_id, session)


@router.put("/{application_id}", response_model=schemas.ApplicationRead)
async def update_application(
    application_id: UUID,
    application_update: schemas.ApplicationUpdate,
    session: Annotated[Session, Depends(get_session)],
) -> Application:
    return crud.update_application(application_id, application_update, session=session)


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> None:
    crud.delete_application(application_id, session=session)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_applications(
    session: Annotated[Session, Depends(get_session)],
    current_user_id: Annotated[int, Depends(get_current_user_id)]
) -> None:
    crud.delete_applications(current_user_id, session)

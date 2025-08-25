import app.crud.application as crud
from app.dependencies import get_session, get_current_user_id
from app.models.application import Application
import app.schemas.application as schemas
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from typing import Annotated, List
from uuid import UUID

router = APIRouter(
    prefix="/applications",
    tags=["applications"],
)


@router.post("/me", response_model=schemas.ApplicationRead)
async def create_application(
    application_create: schemas.ApplicationCreate,
    owner_id: Annotated[UUID, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> Application:
    return crud.create_application(application_create, owner_id, session)


@router.get("/{application_id}", response_model=schemas.ApplicationRead)
async def read_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> Application:
    return crud.read_application(application_id, session)


@router.get("/me", response_model=List[schemas.ApplicationRead])
async def read_applications(
    owner_id: Annotated[UUID, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> List[Application]:
    return crud.read_applications(owner_id, session)


@router.put("/{application_id}", response_model=schemas.ApplicationRead)
async def update_application(
    application_id: UUID,
    application_update: schemas.ApplicationUpdate,
    session: Annotated[Session, Depends(get_session)],
) -> Application:
    return crud.update_application(application_id, application_update, session)


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> None:
    crud.delete_application(application_id, session)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_applications(
    owner_id: Annotated[UUID, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> None:
    crud.delete_applications(owner_id, session)

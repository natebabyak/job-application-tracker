import app.crud.application as crud
from app.dependencies import get_session, verify_api_key, get_current_user_id
from app.models.application import Application
from app.schemas.application import ApplicationBase, ApplicationCreate, ApplicationRead, ApplicationUpdate
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from typing import Annotated, List
from uuid import UUID

router = APIRouter(
    prefix="/applications",
    tags=["applications"],
    dependencies=[Depends(verify_api_key)]
)


@router.post("/me", response_model=ApplicationRead)
async def create_application(
    application_base: ApplicationBase,
    session: Annotated[Session, Depends(get_session)],
    current_user_id: Annotated[int, Depends(get_current_user_id)]
) -> Application:
    application_create = ApplicationCreate(
        **application_base.model_dump(),
        user_id=current_user_id
    )

    return crud.create_application(application_create, session)


@router.post("/me", response_model=List[ApplicationRead])
async def create_applications(
    applications_base: List[ApplicationBase],
    session: Annotated[Session, Depends(get_session)],
    current_user_id: Annotated[int, Depends(get_current_user_id)]
) -> List[Application]:
    applications_create = [
        ApplicationCreate(
            **application_base.model_dump(),
            user_id=current_user_id
        )
        for application_base in applications_base
    ]

    return crud.create_applications(applications_create, session)


@router.get("/{application_id}", response_model=ApplicationRead)
async def read_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> Application:
    return crud.read_application(application_id, session=session)


@router.get("/{user_id}", response_model=List[ApplicationRead])
async def read_applications(
    user_id: int,
    session: Annotated[Session, Depends(get_session)]
) -> List[Application]:
    return crud.read_applications(user_id, session)


@router.put("/{application_id}", response_model=ApplicationRead)
async def update_application(
    application_base: ApplicationBase,
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)],
) -> Application:
    application_update = ApplicationUpdate(
        **application_base.model_dump(),
        id=application_id
    )

    return crud.update_application(application_update, session=session)


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

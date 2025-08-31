from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, Session
from src.applications.dependencies import get_current_user_id
from src.applications.models import Application
from src.applications.schemas import ApplicationCreate, ApplicationRead, ApplicationUpdate
from src.db import get_session
from typing import Annotated
from uuid import UUID

router = APIRouter(
    prefix="/applications",
    tags=["applications"],
)


@router.post("/", response_model=ApplicationRead)
async def create_application(
    application_create: ApplicationCreate,
    user_id: Annotated[str, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> Application:
    created_application = Application(
        **application_create.model_dump(),
        user_id=user_id
    )

    session.add(created_application)
    session.commit()
    session.refresh(created_application)

    return created_application


@router.get("/me", response_model=list[ApplicationRead])
async def get_applications(
    user_id: Annotated[str, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> list[Application]:
    statement = select(Application).where(Application.user_id == user_id)
    applications = session.exec(statement)

    return list(applications)


@router.get("/{application_id}", response_model=ApplicationRead)
async def get_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> Application:
    application = session.get(Application, application_id)

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID '{application_id}' not found"
        )

    return application


@router.put("/{application_id}", response_model=ApplicationRead)
async def update_application(
    application_id: UUID,
    application_update: ApplicationUpdate,
    session: Annotated[Session, Depends(get_session)],
) -> Application:
    application = session.get(Application, application_id)

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID '{application_id}' not found"
        )

    updated_application = Application(**application_update.model_dump())

    session.add(updated_application)
    session.commit()
    session.refresh(updated_application)

    return updated_application


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_applications(
    user_id: Annotated[str, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> None:
    statement = select(Application).where(Application.user_id == user_id)
    applications = list(session.exec(statement))

    session.delete(applications)
    session.commit()


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> None:
    application_to_delete = session.get(Application, application_id)

    if application_to_delete is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID '{application_id}' not found"
        )

    session.delete(application_to_delete)
    session.commit()

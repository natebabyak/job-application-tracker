from src.applications.dependencies import get_current_user_id
from src.applications.models import Application
from src.applications.schemas import ApplicationCreate, ApplicationRead, ApplicationUpdate
from backend.src.db import get_session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, Session
from typing import Annotated, List
from uuid import UUID

router = APIRouter(
    prefix="/applications",
    tags=["applications"],
)


@router.post("/", response_model=ApplicationRead)
async def create_application(
    application_create: ApplicationCreate,
    user_id: Annotated[UUID, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> Application:
    """Creates an application.

    Parameters
    ----------
    application_create : ApplicationCreate
        Schema for creating an application.
    user_id : UUID
        Unique identifier of the user.
    session : Session
        Database session.

    Returns
    -------
    Application
        Created application.
    """
    new_application = Application(
        **application_create.model_dump(),
        owner_id=user_id
    )

    session.add(new_application)
    session.commit()
    session.refresh(new_application)

    return new_application


@router.get("/me", response_model=List[ApplicationRead])
async def read_applications(
    owner_id: Annotated[UUID, Depends(get_current_user_id)],
    session: Annotated[Session, Depends(get_session)]
) -> List[Application]:
    """Reads a user's applications.

    Parameters
    ----------
    owner_id : UUID
        Unique identifier of the owner of the applications to read.
    session : Session
        Database session.

    Returns
    -------
    List[Application]
        Read applications.
    """
    return list(session.exec(
        select(Application).where(Application.owner_id == owner_id)
    ).all())


@router.get("/{application_id}", response_model=ApplicationRead)
async def read_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> Application:
    """Reads an application.

    Parameters
    ----------
    application_id : UUID
        Unique identifier of the application to read.
    session : Session
        Database session.

    Returns
    -------
    Application
        Read application.

    Raises
    ------
    HTTPException
        If the application is not found.
    """
    application = session.get(Application, application_id)

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID '{application_id}' not found."
        )

    return application


@router.put("/{application_id}", response_model=ApplicationRead)
async def update_application(
    application_id: UUID,
    application_update: ApplicationUpdate,
    session: Annotated[Session, Depends(get_session)],
) -> Application:
    """Updates an application.

    Parameters
    ----------
    application_id : UUID
        Unique identifier of the application.
    application_update : ApplicationUpdate
        Schema for updating an application.
    session : Session
        Database session.

    Returns
    -------
    Application
        Updated application.

    Raises
    ------
    HTTPException
        If the application is not found.
    """
    application = session.get(Application, application_id)

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID '{application_id}' not found."
        )

    application = Application(**application_update.model_dump())

    session.add(application)
    session.commit()
    session.refresh(application)

    return application


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_application(
    application_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> None:
    """Deletes an application by its ID.

    Parameters
    ----------
    application_id : UUID
        Unique identifier of the application to delete.
    session : Session
        Database session.

    Raises
    ------
    HTTPException
        If the application is not found.
    """
    application = session.get(Application, application_id)

    if application is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            f"Application with ID '{application_id}' not found."
        )

    session.delete(application)
    session.commit()

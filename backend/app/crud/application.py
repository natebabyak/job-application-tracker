from app.models.application import Application
from app.schemas.application import ApplicationCreate, ApplicationUpdate
from fastapi import HTTPException, status
from sqlmodel import select, Session
from typing import List
from uuid import UUID


def create_application(
    application_create: ApplicationCreate,
    owner_id: UUID,
    session: Session
) -> Application:
    """Creates an application.

    Parameters
    ----------
    application_create : ApplicationCreate
        Schema for creating an application.
    owner_id : UUID
        Unique identifier of the application's owner.
    session : Session
        Database session.

    Returns
    -------
    Application
        Created application.
    """
    new_application = Application(
        **application_create.model_dump(),
        owner_id=owner_id
    )

    session.add(new_application)
    session.commit()
    session.refresh(new_application)

    return new_application


def create_applications(
    applications_create: List[ApplicationCreate],
    owner_id: UUID,
    session: Session
) -> List[Application]:
    """Creates multiple applications.

    Parameters
    ----------
    applications_create : List[ApplicationCreate]
        List of schemas for creating an application.
    owner_id : UUID
        Unique identifier of the applications' owner.
    session : Session
        Database session.

    Returns
    -------
    List[Application]
        Created applications.
    """
    new_applications = [
        Application(
            **application_create.model_dump(),
            owner_id=owner_id
        )
        for application_create in applications_create
    ]

    session.add_all(new_applications)
    session.commit()

    for new_application in new_applications:
        session.refresh(new_application)

    return new_applications


def read_application(
    application_id: UUID,
    session: Session
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


def read_applications(
    owner_id: UUID,
    session: Session
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


def update_application(
    application_id: UUID,
    application_update: ApplicationUpdate,
    session: Session
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


def delete_application(
    application_id: UUID,
    session: Session
) -> None:
    """Deletes an application.

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
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID '{application_id}' not found."
        )

    session.delete(application)
    session.commit()


def delete_applications(
    owner_id: UUID,
    session: Session
) -> None:
    """Deletes a user's applications.

    Parameters
    ----------
    owner_id : UUID
        Unique identifier of the owner of the applications to delete.
    session : Session
        Database session.
    """
    applications = session.exec(
        select(Application).where(Application.owner_id == owner_id)
    ).all()

    session.delete(applications)
    session.commit()

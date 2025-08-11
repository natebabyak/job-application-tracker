from models.application import Application
from schemas.application import ApplicationCreate, ApplicationRead, ApplicationUpdate
from fastapi import HTTPException, status
from sqlmodel import Session
from typing import List
from uuid import UUID


def create_application(
    application_create: ApplicationCreate,
    session: Session
) -> Application:
    """Creates an application.

    Parameters
    ----------
    application_create : ApplicationCreate
        Schema for creating an application.
    session : Session
        Database session.

    Returns
    -------
    Application
        Created application.
    """
    raise NotImplementedError()


def create_applications(
    applications_create: List[ApplicationCreate],
    session: Session
) -> List[Application]:
    """Creates multiple applications.

    Parameters
    ----------
    applications_create : List[ApplicationCreate]
        List of schemas for creating an application.
    session : Session
        Database session.

    Returns
    -------
    List[Application]
        Created applications.
    """
    raise NotImplementedError()


def read_application(
    application_id: UUID,
    session: Session
) -> ApplicationRead:
    """Reads an application.

    Parameters
    ----------
    application_id : UUID
        Unique identifier of the application to read.
    session : Session
        Database session.

    Returns
    -------
    ApplicationRead
        Read application.
    """
    raise NotImplementedError()


def read_applications(
    user_id: UUID,
    session: Session
) -> List[Application]:
    """Reads a user's applications.

    Parameters
    ----------
    user_id : UUID
        Unique identifier of the user whose applications to read.
    session : Session
        Database session.
    """
    raise NotImplementedError()


def update_application(
    application_update: ApplicationUpdate,
    session: Session
) -> Application:
    """Updates an application.


    """
    raise NotImplementedError()


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
    application_to_delete = session.get(Application, application_id)

    if application_to_delete is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID '{application_id}' not found."
        )

    session.delete(application_to_delete)
    session.commit()


def delete_applications(
    user_id: UUID,
    session: Session
) -> None:
    """Deletes all of a user's applications.

    """
    raise NotImplementedError()

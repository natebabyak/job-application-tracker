from datetime import date
from models.application import Status
from sqlmodel import SQLModel
from uuid import UUID


class ApplicationBase(SQLModel):
    """
    Base schema for a job application.

    Attributes
    ----------
    position_title : str
        Title of the position applied for.
    company_name : str
        Name of the company applied to.
    date_submitted : date
        Date the application was submitted.
    status : Status
        Current status of the application.
    """
    position_title: str
    company_name: str
    date_submitted: date
    status: Status


class ApplicationCreate(ApplicationBase):
    """
    Schema for creating a job application.

    Attributes
    ----------
    owner_id : UUID
        Unique identifier of the user who owns the application.
    """
    owner_id: UUID


class ApplicationRead(ApplicationBase):
    """
    Schema for reading a job application.

    Attributes
    ----------
    id: UUID
        Unique identifier of the application.
    """
    id: UUID

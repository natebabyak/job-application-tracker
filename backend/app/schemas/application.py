from app.models.application import Status
from datetime import date, datetime
from sqlmodel import SQLModel
from uuid import UUID


class ApplicationBase(SQLModel):
    """Base schema for an application.

    Attributes
    ----------
    position : str
        Title of the position applied for.
    company : str
        Name of the company applied to.
    date : date
        Date the application was submitted.
    status : Status
        Current status of the application.
    """
    position: str
    company: str
    date: date
    status: Status


class ApplicationCreate(ApplicationBase):
    """Schema for creating an application.

    Attributes
    ----------
    owner_id : UUID
        Unique identifier of the user who owns the application.
    """
    owner_id: UUID


class ApplicationRead(ApplicationBase):
    """Schema for reading an application.

    Attributes
    ----------
    id: UUID
        Unique identifier of the application.
    created_at: datetime
        Timestamp when the application was created.
    updated_at: datetime
        Timestamp when the application was last updated.
    """
    id: UUID
    created_at: datetime
    updated_at: datetime


class ApplicationUpdate(ApplicationBase):
    """Schema for updating an application.

    Attributes
    ----------
    id: UUID
        Unique identifier of the application.
    """
    id: UUID

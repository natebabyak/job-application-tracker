from app.models.application import Status
from datetime import date, datetime
from sqlmodel import SQLModel
from uuid import UUID


class ApplicationBase(SQLModel):
    """Base schema for an application.

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
    """Schema for creating an application.

    Attributes
    ----------
    user_id : str
        Unique identifier of the user who owns the application.
    """
    user_id: str


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
    """Schema for updating an application."""
    pass

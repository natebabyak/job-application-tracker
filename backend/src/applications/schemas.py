from datetime import date
from sqlmodel import SQLModel
from src.applications.models import Status
from uuid import UUID


class ApplicationBase(SQLModel):
    """Base schema of an application."""
    position: str
    company: str
    submitted_on: date
    status: Status


class ApplicationCreate(ApplicationBase):
    """Schema for creating an application."""
    pass


class ApplicationRead(ApplicationBase):
    """Schema for reading an application."""
    id: UUID


class ApplicationUpdate(ApplicationBase):
    """Schema for updating an application."""
    pass

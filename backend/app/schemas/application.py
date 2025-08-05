from datetime import date
from models.application import Status
from sqlmodel import SQLModel
from uuid import UUID


class ApplicationBase(SQLModel):
    """Base schema for a job application."""
    position: str
    company: str
    date: date
    status: Status


class ApplicationCreate(ApplicationBase):
    """Schema for creating a job application."""
    user_id: UUID


class ApplicationRead(ApplicationBase):
    """Schema for reading a job application."""
    id: UUID

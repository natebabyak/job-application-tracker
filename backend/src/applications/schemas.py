from src.applications.models import Status
from datetime import date, datetime
from sqlmodel import Field, SQLModel
from uuid import UUID


class ApplicationBase(SQLModel):
    """Base schema for an application."""
    position: str = Field(
        title="Position",
        description="Title of the position applied for."
    )

    company: str = Field(
        title="Company",
        description="Name of the company applied to."
    )

    submitted_on: date = Field(
        title="Submitted On",
        description="Date the application was submitted."
    )

    status: Status = Field(
        title="Status",
        description="Current status of the application."
    )


class ApplicationCreate(ApplicationBase):
    """Schema for creating an application."""
    pass


class ApplicationRead(ApplicationBase):
    """Schema for reading an application."""
    id: UUID = Field(
        title="ID",
        description="Unique identifier of the application."
    )

    created_at: datetime = Field(
        title="Created At",
        description="Timestamp when the application was created."
    )

    updated_at: datetime = Field(
        title="Updated At",
        description="Timestamp when the application was last updated."
    )


class ApplicationUpdate(ApplicationBase):
    """Schema for updating an application."""
    pass

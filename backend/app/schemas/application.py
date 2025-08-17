from app.models.application import Status
from datetime import date, datetime
from sqlmodel import Field, SQLModel
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
    position_title: str = Field(
        title="Position Title",
        description="Title of the position applied for."
    )

    company_name: str = Field(
        title="Company Name",
        description="Name of the company applied to."
    )

    date_submitted: date = Field(
        title="Date Submitted",
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

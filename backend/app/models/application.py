from datetime import date, datetime
from enum import Enum
from .user import User
from sqlmodel import Field, Relationship, SQLModel
from uuid import UUID, uuid4
from typing import Optional


class Status(str, Enum):
    """Represents the status of an application."""
    ACCEPTED = "accepted"
    DECLINED = "declined"
    INTERVIEWING = "interviewing"
    OFFERED = "offered"
    REJECTED = "rejected"
    SUBMITTED = "submitted"


class Application(SQLModel, table=True):
    """
    Model for storing an application.

    Attributes
    ----------
    id: UUID
        Unique identifier of the application.
    position_title : str
        Title of the position applied for.
    company_name : str
        Name of the company applied to.
    date_submitted : date
        Date the application was submitted.
    status : Status
        Current status of the application.
    owner_id : UUID
        Unique identifier of the user who owns the application.
    owner : User | None
        User who owns the application.
    created_at: datetime
        Timestamp when the application was created.
    updated_at: datetime
        Timestamp when the application was last updated.
    """
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    position_title: str
    company_name: str
    date_submitted: date
    status: Status

    owner_id: UUID = Field(foreign_key="user.id", index=True)
    owner: Optional["User"] = Relationship(back_populates="applications")

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

from app.models.user import User
from datetime import date, datetime, timezone
from enum import Enum
from sqlmodel import Field, Relationship, SQLModel
from uuid import UUID, uuid4


class Status(str, Enum):
    """Status of an application."""
    ACCEPTED = "accepted"
    DECLINED = "declined"
    INTERVIEWING = "interviewing"
    OFFERED = "offered"
    REJECTED = "rejected"
    SUBMITTED = "submitted"


class Application(SQLModel, table=True):
    """Model for storing an application."""
    __tablename__ = "applications"  # type: ignore

    id: UUID = Field(
        default_factory=uuid4,
        title="ID",
        description="Unique identifier of the application.",
        primary_key=True
    )

    position: str = Field(
        title="Position",
        description="Title of the position applied for.",
        min_length=1,
        max_length=255
    )

    company: str = Field(
        title="Company",
        description="Name of the company applied to.",
        min_length=1,
        max_length=255
    )

    submitted_on: date = Field(
        title="Submitted On",
        description="Date the application was submitted."
    )

    status: Status = Field(
        title="Status",
        description="Current status of the application."
    )

    owner_id: UUID = Field(
        title="Owner ID",
        description="Unique identifier of the application's owner.",
        foreign_key="users.id",
        index=True
    )

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        title="Created At",
        description="Timestamp when the application was created."
    )

    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        title="Updated At",
        description="Timestamp when the application was last updated.",
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)},
    )

    owner: User = Relationship(back_populates="applications")

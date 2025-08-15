from datetime import date, datetime, timezone
from enum import Enum
from models.user import User
from sqlmodel import Field, Relationship, SQLModel
from uuid import UUID, uuid4


class Status(str, Enum):
    """Represents the status of an application."""
    ACCEPTED = "accepted"
    DECLINED = "declined"
    INTERVIEWING = "interviewing"
    OFFERED = "offered"
    REJECTED = "rejected"
    SUBMITTED = "submitted"


class Application(SQLModel, table=True):
    """Model for storing an application.

    Attributes
    ----------
    id : UUID
        Unique identifier of the application.
    position : str
        Title of the position applied for.
    company : str
        Name of the company applied to.
    date : date
        Date the application was submitted.
    status : Status
        Current status of the application.
    owner_id : str
        Unique identifier of the user who owns the application.
    created_at : datetime
        Timestamp when the application was created.
    updated_at : datetime
        Timestamp when the application was last updated.
    owner : User
        User who owns the application.
    """
    __tablename__ = "applications"  # type: ignore

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    position: str
    company: str
    date: date
    status: Status
    user_id: str = Field(foreign_key="user.id", index=True)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)}
    )

    user: User = Relationship(back_populates="applications")

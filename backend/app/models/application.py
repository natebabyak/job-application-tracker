from datetime import date, datetime
from enum import Enum
from sqlmodel import Field, SQLModel
from uuid import UUID, uuid4


class Status(str, Enum):
    """Represents the status of a job application."""
    ACCEPTED = "accepted"
    APPLIED = "applied"
    GHOSTED = "ghosted"
    INTERVIEWING = "interviewing"
    OFFERED = "offered"
    REJECTED = "rejected"
    WITHDRAWN = "withdrawn"


class Application(SQLModel, table=True):
    """
    Represents a job application.

    Attributes
    ----------
    id : UUID
        Unique identifier of the application. Defaults to a generated UUID.
    position : str
        Name of the position applied for.
    company : str
        Name of the company applied to.
    date : date
        Submission date of the application.
    status : Status
        Current status of the application.
    user_id : UUID
        Unique identifier of the user who submitted the application.
    created_at : datetime
        Timestamp of when the application was created. Defaults to the current time.
    updated_at : datetime
        Timestamp of when the application was last updated. Defaults to the current time.
    """
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    position: str = Field(max_length=255)
    company: str = Field(max_length=255)
    date: date
    status: Status
    user_id: UUID = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

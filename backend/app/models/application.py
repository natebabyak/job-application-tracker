from datetime import date, datetime
from enum import Enum
from sqlmodel import Field, SQLModel
from uuid import UUID, uuid4


class Status(str, Enum):
    """Enumeration of job application statuses."""
    ACCEPTED = "accepted"
    APPLIED = "applied"
    GHOSTED = "ghosted"
    INTERVIEWING = "interviewing"
    OFFERED = "offered"
    REJECTED = "rejected"
    WITHDRAWN = "withdrawn"


class Application(SQLModel, table=True):
    """Represents a job application."""
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    position: str = Field(max_length=255)
    company: str = Field(max_length=255)
    date: date
    status: Status
    user_id: UUID = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

from datetime import date
from enum import Enum
from sqlmodel import Field, SQLModel
from uuid import UUID, uuid4


class ApplicationStatus(str, Enum):
    """Represents the status of a job application."""
    accepted = 'accepted'
    applied = 'applied'
    ghosted = 'ghosted'
    interviewing = 'interviewing'
    offered = 'offered'
    rejected = 'rejected'
    withdrawn = 'withdrawn'


class Application(SQLModel, table=True):
    """
    Represents a job application.

    Attributes
    ----------
    id : UUID
        Unique identifier of the application.

    position : str
        Title of the position applied for.

    company : str
        Name of the company the application was submitted to.

    date : date
        Date the application was submitted.

    status : ApplicationStatus
        Current status of the application.

    user_id : UUID
        Unique identifier of the user who submitted the application.
    """
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    position: str
    company: str
    date: date
    status: ApplicationStatus
    user_id: UUID = Field(foreign_key="user.id")

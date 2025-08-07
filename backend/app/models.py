from datetime import date, datetime
from enum import StrEnum
from sqlmodel import Field, Relationship, SQLModel
from uuid import UUID, uuid4
from typing import List, Optional


class ApplicationStatus(StrEnum):
    """The status of a job application."""
    ACCEPTED = "accepted"
    DECLINED = "declined"
    INTERVIEWING = "interviewing"
    OFFERED = "offered"
    REJECTED = "rejected"
    SUBMITTED = "submitted"


class Application(SQLModel, table=True):
    """
    A job application.

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
    status: ApplicationStatus

    owner_id: UUID = Field(foreign_key="user.id", index=True)
    owner: Optional["User"] = Relationship(back_populates="applications")

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)


class Provider(StrEnum):
    """Represents an authentication provider."""
    DISCORD = 'discord'
    GITHUB = 'github'


class User(SQLModel, table=True):
    """
    Model for storing a user.

    Attributes
    ----------
    id: UUID
        Unique identifier of the user.
    provider : Provider
        Authentication provider of the user.
    provider_email : str | None
        Email address from the user's provider.
    provider_id : str
        Unique identifier from user's provider.
    provider_image : str | None
        Profile image URL from user's provider.
    provider_name : str | None
        Name from user's provider.
    applications : List[Application]
        List of applications belonging to the user.
    created_at : datetime
        Timestamp when the user was created.
    updated_at : datetime
        Timestamp when the user was last updated.
    """
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    provider: Provider
    provider_email: Optional[str]
    provider_id: str
    provider_image: Optional[str]
    provider_name: Optional[str]

    applications: List["Application"] = Relationship(back_populates="owner")

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

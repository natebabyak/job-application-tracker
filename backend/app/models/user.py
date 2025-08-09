from datetime import datetime, timezone
from enum import Enum
from sqlmodel import Field, Relationship, SQLModel, UniqueConstraint
from typing import List, Optional, TYPE_CHECKING
from uuid import UUID, uuid4

if TYPE_CHECKING:
    from app.models.application import Application


class Provider(str, Enum):
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
    email: Optional[str]
        Email address from the user's provider.
    provider_id : str
        Unique identifier from the user's provider.
    image : Optional[str]
        Profile image URL from the user's provider.
    name : Optional[str]
        Username from the user's provider.
    applications : List[Application]
        List of applications belonging to the user.
    created_at : datetime
        Timestamp when the user was created.
    updated_at : datetime
        Timestamp when the user was last updated.
    """
    __tables_args__ = (UniqueConstraint("provider", "provider_id"),)

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    provider: Provider
    email: Optional[str]
    provider_id: str
    image: Optional[str]
    name: Optional[str]

    applications: List["Application"] = Relationship(back_populates="owner")

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))

from datetime import datetime
from enum import Enum
from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional, TYPE_CHECKING
from uuid import UUID, uuid4


if TYPE_CHECKING:
    from .application import Application


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

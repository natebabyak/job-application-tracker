from enum import Enum
from sqlmodel import Field, SQLModel
from typing import Optional
from uuid import UUID, uuid4


class Provider(str, Enum):
    """Represents an authentication provider."""
    discord = 'discord'
    github = 'github'


class User(SQLModel, table=True):
    """
    Represents a user.

    Attributes
    ----------
    id : UUID
        Unique identifier of the user.

    provider: Provider
        Authentication provider used by the user.

    provider_id : str
        Unique identifier assigned by the provider.

    name : str | None
        Display name of the user, if available.

    email : str | None
        Email address of the user, if available.

    image : str | None
        URL to the user's profile image, if available.
    """
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    provider: Provider
    provider_id: str
    email: Optional[str]
    image: Optional[str]
    name: Optional[str]

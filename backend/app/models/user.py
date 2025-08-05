from enum import Enum
from sqlmodel import Field, SQLModel
from typing import Optional
from uuid import UUID


class Provider(str, Enum):
    """Enumeration of authentication providers."""
    DISCORD = 'discord'
    GITHUB = 'github'


class User(SQLModel, table=True):
    """Model for a user."""
    id: UUID = Field(primary_key=True)
    provider: Provider
    email: Optional[str]
    provider_id: str
    image: Optional[str]
    name: Optional[str]

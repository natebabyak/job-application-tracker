from datetime import datetime, timezone
from enum import Enum
from sqlmodel import Field, Relationship, SQLModel
from typing import List, TYPE_CHECKING
from uuid import UUID, uuid4

if TYPE_CHECKING:
    from app.models.application import Application


class Provider(str, Enum):
    """Authentication provider of a user."""
    DISCORD = "discord"
    GITHUB = "github"


class Theme(str, Enum):
    """Preferred theme of a user."""
    DARK = "dark"
    LIGHT = "light"
    SYSTEM = "system"


class User(SQLModel, table=True):
    """Model for storing a user."""
    __tablename__ = "users"  # type: ignore

    id: UUID = Field(
        default_factory=uuid4,
        title="ID",
        description="Unique identifier of the user.",
        primary_key=True
    )

    provider: Provider = Field(
        title="Provider",
        description="Authentication provider of the user.",
    )

    theme: Theme = Field(
        default=Theme.SYSTEM,
        title="Theme",
        description="Preferred theme of the user."
    )

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        title="Created At",
        description="Timestamp when the user was created."
    )

    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        title="Updated At",
        description="Timestamp when the user was last updated.",
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)},
    )

    applications: List[Application] = Relationship(
        back_populates="owner",
        cascade_delete=True
    )

from datetime import datetime, timezone
from sqlmodel import Field, Relationship, SQLModel
from typing import List, TYPE_CHECKING
from src.users.constants import Provider
from uuid import UUID, uuid4

if TYPE_CHECKING:
    from src.applications.models import Application


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
        description="Provider of the user."
    )

    provider_account_id: int = Field(
        title="Provider Account ID",
        description="Provider account ID of the user."
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

    applications: List["Application"] = Relationship(
        back_populates="owner",
        cascade_delete=True
    )

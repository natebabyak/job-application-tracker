from datetime import datetime
from sqlmodel import Field, SQLModel
from src.users.models import Provider
from uuid import UUID


class UserBase(SQLModel):
    """Base schema for a user."""
    provider: Provider = Field(
        title="Provider",
        description="Provider of the user."
    )

    provider_account_id: int = Field(
        title="Provider Account ID",
        description="Provider account ID of the user."
    )


class UserCreate(UserBase):
    """Schema for creating a user."""
    pass


class UserRead(UserBase):
    """Schema for reading a user."""
    id: UUID = Field(
        title="ID",
        description="Unique identifier of the user."
    )

    created_at: datetime = Field(
        title="Created At",
        description="Timestamp when the user was created."
    )

    updated_at: datetime = Field(
        title="Updated At",
        description="Timestamp when the user was last updated."
    )

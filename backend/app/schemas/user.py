from app.models.user import Provider
from datetime import datetime
from sqlmodel import Field, SQLModel
from uuid import UUID


class UserBase(SQLModel):
    """Base schema for a user."""
    id: UUID = Field(
        title="ID",
        description="Unique identifier of the user."
    )

    provider: Provider = Field(
        title="Provider",
        description="Authentication provider of the user.",
    )

    provider_id: int = Field(
        title="Provider ID",
        description="Unique identifier from the provider of the user."
    )


class UserCreate(UserBase):
    """Schema for creating a user."""
    pass


class UserRead(UserBase):
    """Schema for reading a user."""
    created_at: datetime = Field(
        title="Created At",
        description="Timestamp when the user was created."
    )

    updated_at: datetime = Field(
        title="Updated At",
        description="Timestamp when the user was last updated."
    )


class UserUpdate(UserBase):
    """Schema for updating a user."""
    pass

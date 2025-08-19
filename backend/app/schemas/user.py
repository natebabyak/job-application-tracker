from datetime import datetime
from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    """Base schema for a user."""
    id: int = Field(
        title="ID",
        description="Unique identifier of the user."
    )


class UserCreate(UserBase):
    """Schema for creating a user."""
    pass


class UserRead(UserBase):
    """Schema for reading a user."""
    created_at: datetime = Field(
        title="Created At",
        description="Timestamp when the application was created."
    )

    updated_at: datetime = Field(
        title="Updated At",
        description="Timestamp when the application was last updated."
    )


class UserUpdate(UserBase):
    """Schema for updating a user."""
    pass

from datetime import datetime
from sqlmodel import Field, SQLModel
from typing import Optional


class UserBase(SQLModel):
    """Base schema for a user.

    id : int
        Unique identifier of the user.
    email_address : str, optional
        Email address of the user.
    profile_picture_url : str, optional
        Profile picture URL of the user.
    username : str, optional
        Username of the user.
    """
    id: int = Field(
        title="ID",
        description="Unique identifier of the user."
    )

    email_address: Optional[str] = Field(
        title="Email Address",
        description="Email address of the user."
    )

    profile_picture_url: Optional[str] = Field(
        title="Profile Picture URL",
        description="Profile picture URL of the user."
    )

    username: Optional[str] = Field(
        title="Username",
        description="Username of the user."
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

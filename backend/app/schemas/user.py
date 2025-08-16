from datetime import datetime
from sqlmodel import SQLModel
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
    id: int
    email_address: Optional[str]
    profile_picture_url: Optional[str]
    username: Optional[str]


class UserCreate(UserBase):
    """Schema for creating a user."""
    pass


class UserRead(UserBase):
    """Schema for reading a user.

    Attributes
    ----------
    created_at : datetime
        Timestamp when the user was created.
    updated_at : datetime
        Timestamp when the user was last updated.
    """
    created_at: datetime
    updated_at: datetime


class UserUpdate(UserBase):
    """Schema for updating a user."""
    pass

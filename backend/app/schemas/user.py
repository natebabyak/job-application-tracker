from datetime import datetime
from sqlmodel import SQLModel
from typing import Optional


class UserBase(SQLModel):
    """Base schema for a user.

    Attributes
    ----------
    id : str
        Unique identifier of the user.
    email : str, optional
        Email address of the user.
    image : str, optional
        Profile image URL of the user.
    name : str, optional
        Display name of the user.
    """
    id: str
    email: Optional[str]
    image: Optional[str]
    name: Optional[str]


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

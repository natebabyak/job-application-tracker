from datetime import datetime
from sqlmodel import SQLModel
from typing import Optional


class UserBase(SQLModel):
    """Base schema for a user."""
    id: int
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

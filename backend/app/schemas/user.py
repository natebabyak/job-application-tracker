from app.models.user import Provider
from datetime import datetime
from sqlmodel import SQLModel
from typing import Optional
from uuid import UUID


class UserBase(SQLModel):
    """
    Base schema for a user.

    Attributes
    ----------
    provider : Provider
        Authentication provider of the user.
    email: Optional[str]
        Email address from the user's provider.
    provider_id : str
        Unique identifier from the user's provider.
    image : Optional[str]
        Profile image URL from the user's provider.
    name : Optional[str]
        Username from the user's provider.
    """
    provider: Provider
    email: Optional[str]
    provider_id: str
    image: Optional[str]
    name: Optional[str]


class UserCreate(UserBase):
    """Schema for creating a user."""
    pass


class UserRead(UserBase):
    """
    Schema for reading a user.

    Attributes
    ----------
    id: UUID
        Unique identifier of the user.
    created_at : datetime
        Timestamp when the user was created.
    updated_at : datetime
        Timestamp when the user was last updated.
    """
    id: UUID
    created_at: datetime
    updated_at: datetime

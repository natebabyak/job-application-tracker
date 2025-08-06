from models.user import Provider
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
    provider_email : str | None
        Email address from the user's provider.
    provider_id : str
        Unique identifier from user's provider.
    provider_image : str | None
        Profile image URL from user's provider.
    provider_name : str | None
        Name from user's provider.
    """
    provider: Provider
    provider_email: Optional[str]
    provider_id: str
    provider_image: Optional[str]
    provider_name: Optional[str]


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
    """
    id: UUID

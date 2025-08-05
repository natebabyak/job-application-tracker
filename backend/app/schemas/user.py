from models.user import Provider
from sqlmodel import SQLModel
from typing import Optional


class UserBase(SQLModel):
    """Base schema for a user."""
    provider: Provider
    email: Optional[str]
    provider_id: str
    image: Optional[str]
    name: Optional[str]


class UserCreate(UserBase):
    """Schema for creating a user."""
    pass


class UserRead(UserBase):
    """Schema for reading a user."""
    pass

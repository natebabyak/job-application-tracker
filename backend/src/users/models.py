from datetime import datetime
from sqlmodel import Column, DateTime, Field, Relationship, SQLModel
from typing import Optional, TYPE_CHECKING


if TYPE_CHECKING:
    from src.applications.models import Application


class User(SQLModel, table=True):
    """Database model of a user."""
    __tablename__ = "users"  # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    name: int = Field(max_length=255)
    email: int = Field(max_length=255)
    emailVerified: datetime = Field(sa_column=Column(DateTime(timezone=True)))
    image: str

    applications: list["Application"] = Relationship(
        back_populates="applications", cascade_delete=True)

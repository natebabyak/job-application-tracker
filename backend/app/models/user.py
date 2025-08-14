from datetime import datetime, timezone
from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.application import Application


class User(SQLModel, table=True):
    """Model for storing a user.

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
    created_at : datetime
        Timestamp when the user was created.
    updated_at : datetime
        Timestamp when the user was last updated.
    applications : List[Application]
        List of applications belonging to the user.
    """
    __tablename__ = "users"  # type: ignore

    id: str = Field(primary_key=True)
    email: Optional[str]
    image: Optional[str]
    name: Optional[str]

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)}
    )

    applications: List["Application"] = Relationship(
        back_populates="owner",
        cascade_delete=True
    )

from datetime import datetime, timezone
from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.application import Application


class User(SQLModel, table=True):
    """Model for storing a user.

    Attributes
    ----------
    id : int
        Unique identifier of the user.
    email_address : str, optional
        Email address of the user.
    profile_picture_url : str, optional
        Profile picture URL of the user.
    username : str, optional
        Username of the user.
    created_at : datetime
        Timestamp when the user was created.
    updated_at : datetime
        Timestamp when the user was last updated.
    applications : List[Application]
        List of applications belonging to the user.
    """
    id: int = Field(primary_key=True)
    email_address: Optional[str]
    profile_picture_url: Optional[str]
    username: Optional[str]

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)},
    )

    applications: List["Application"] = Relationship(
        back_populates="user",
        cascade_delete=True
    )

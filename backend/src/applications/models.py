from datetime import date
from sqlmodel import Field, Relationship, SQLModel
from src.applications.constants import Level, Status
from src.users.models import User
from typing import Optional, TYPE_CHECKING
from uuid import UUID, uuid4

if TYPE_CHECKING:
    from src.users.models import User


class Application(SQLModel, table=True):
    """Database model of an application."""
    __tablename__ = "applications"  # type: ignore

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    position: str = Field(min_length=1, max_length=255)
    company: str = Field(min_length=1, max_length=255)
    submitted_on: date
    status: Status

    description: Optional[str]
    level: Optional[Level]
    location: Optional[str]
    normalized_company: Optional[str]
    normalized_position: Optional[str]
    skills: Optional[list[str]]
    url: Optional[str]

    user_id: Optional[int] = Field(
        default=None, foreign_key="user.id", ondelete="CASCADE")
    user: User = Relationship(back_populates="applications")

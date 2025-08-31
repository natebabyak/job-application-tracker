from datetime import date
from sqlmodel import Field, SQLModel
from src.applications.constants import Status
from uuid import UUID, uuid4


class Application(SQLModel, table=True):
    """Database model of an application."""
    __tablename__ = 'applications'  # type: ignore

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    position: str = Field(min_length=1, max_length=255)
    company: str = Field(min_length=1, max_length=255)
    submitted_on: date
    status: Status

    user_id: str

from datetime import datetime
from sqlmodel import Column, DateTime, Field, SQLModel
from typing import Optional


class Session(SQLModel, table=True):
    """Database model of a session."""
    __tablename__ = "sessions"  # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    userId: int = Field(nullable=False)
    expires: datetime = Field(sa_column=Column(
        DateTime(timezone=True), nullable=False))
    sessionToken: str = Field(max_length=255, nullable=False)

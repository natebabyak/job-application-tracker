from datetime import datetime
from sqlmodel import Column, DateTime, Field, SQLModel
from typing import Optional


class VerificationToken(SQLModel, table=True):
    """Database model of a verification token."""
    __tablename__ = "verification_token"  # type: ignore

    identifier: Optional[int] = Field(primary_key=True, nullable=False)
    expires: datetime = Field(sa_column=Column(
        DateTime(timezone=True), nullable=False))
    token: str = Field(primary_key=True, nullable=False)

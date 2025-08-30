from sqlmodel import Field, SQLModel
from typing import Optional


class Account(SQLModel, table=True):
    """Database model of an account."""
    __tablename__ = "accounts"  # type: ignore

    id: Optional[int] = Field(default=None, primary_key=True)
    userId: int = Field(nullable=False)
    provider: str = Field(max_length=255, nullable=False)
    providerAccountId: str = Field(max_length=255, nullable=False)
    refresh_token: str
    access_token: str
    expires_at: int
    id_token: str
    scope: str
    session_state: str
    token_type: str

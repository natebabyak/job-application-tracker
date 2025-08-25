import app.crud.user as crud
from app.dependencies import get_session
from app.models.user import User
import app.schemas.user as schemas
from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import Annotated
from uuid import UUID

router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post("/", response_model=schemas.UserRead)
async def create_user(
    user_create: schemas.UserCreate,
    session: Annotated[Session, Depends(get_session)]
) -> User:
    return crud.create_user(user_create, session)


@router.get("/{user_id}", response_model=schemas.UserRead)
async def read_user(
    user_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> User:
    return crud.read_user(user_id, session)


@router.put("/", response_model=schemas.UserRead)
async def update_user(
    user_update: schemas.UserUpdate,
    session: Annotated[Session, Depends(get_session)]
) -> User:
    return crud.update_user(user_update, session)


@router.delete("/{user_id}")
async def delete_user(
    user_id: UUID,
    session: Annotated[Session, Depends(get_session)]
) -> None:
    crud.delete_user(user_id, session)

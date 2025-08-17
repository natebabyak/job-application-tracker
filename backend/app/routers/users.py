import app.crud.user as crud
from app.dependencies import get_session, verify_api_key
from app.models.user import User
from app.schemas.user import UserCreate, UserRead, UserUpdate
from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import Annotated


router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(verify_api_key)]
)


@router.post("/", response_model=UserRead)
async def create_user(
    user_create: UserCreate,
    session: Annotated[Session, Depends(get_session)]
) -> User:
    return crud.create_user(user_create, session)


@router.get("/{user_id}", response_model=UserRead)
async def read_user(
    user_id: int,
    session: Annotated[Session, Depends(get_session)]
) -> User:
    return crud.read_user(user_id, session)


@router.put("/", response_model=UserRead)
async def update_user(
    user_update: UserUpdate,
    session: Annotated[Session, Depends(get_session)]
) -> User:
    return crud.update_user(user_update, session)


@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    session: Annotated[Session, Depends(get_session)]
) -> None:
    crud.delete_user(user_id, session)

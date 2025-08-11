from fastapi import APIRouter, Depends
from crud.application import create_application, create_applications
from schemas.application import ApplicationRead
from typing import Annotated, Any, Dict
from dependencies import JWT

router = APIRouter()


@router.get("/applications", response_model=ApplicationRead)
async def read_applications_endpoint(
    current_user: Annotated[User, Depends(JWT.get)]
):
    return create_application()

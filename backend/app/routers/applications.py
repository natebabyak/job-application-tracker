from fastapi import APIRouter, Depends
from crud.application import create_application, create_applications
from schemas.application import ApplicationCreate, ApplicationRead
from typing import Annotated, Any, Dict
from dependencies import JWT
from models.user import User

router = APIRouter()


@router.get("/applications", response_model=ApplicationRead)
async def read_applications_endpoint(
    jwt: Annotated[Dict[str, Any], Depends(JWT)]
):
    user_id = jwt['id']
    return create_application(ApplicationCreate(

    ))

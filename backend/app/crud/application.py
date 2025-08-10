from schemas.application import ApplicationCreate
from fastapi import Depends
from sqlmodel import Session
from typing import Annotated
from dependencies import get_session


def create_application(application: ApplicationCreate, session: Annotated[Session, Depends(get_session)]):
    pass

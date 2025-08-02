from datetime import date
from enum import Enum
from fastapi import FastAPI
from sqlmodel import Field, SQLModel
from uuid import UUID, uuid4


class ApplicationStatus(Enum):
    accepted = 'accepted'
    applied = 'applied'
    ghosted = 'ghosted'
    interviewing = 'interviewing'
    offered = 'offered'
    rejected = 'rejected'
    withdrawn = 'withdrawn'


class Application(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    position: str
    company: str
    date: date
    status: ApplicationStatus


app = FastAPI()


@app.post("/v1/applications")
async def create_application(application: Application):
    return application


@app.get("/v1/applications")
async def read_applications():
    return {"message": "Hello World"}


@app.put("/v1/applications/{application_id}")
async def update_application(application_id: UUID):
    return application_id


@app.delete("/v1/applications/{application_id}")
async def delete_application(application_id: UUID):
    return application_id

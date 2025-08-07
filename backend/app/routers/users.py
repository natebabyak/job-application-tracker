from fastapi import APIRouter

router = APIRouter()


@router.post("/users/")
async def create_user():
    return [{"username": "Rick"}, {"username": "Morty"}]


@router.get("/users/{username}", tags=["users"])
async def read_user(username: str):
    return {"username": username}

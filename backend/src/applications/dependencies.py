from fastapi import Header
from typing import Annotated


def get_current_user_id(x_user_id: Annotated[str, Header()]) -> str:
    return x_user_id

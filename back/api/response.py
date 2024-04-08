from pydantic import BaseModel


class Data(BaseModel):
    id: int
    name_pass: str
    password: dict

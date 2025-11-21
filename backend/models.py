from pydantic import BaseModel
from typing import List, Optional

class Tool(BaseModel):
    id: int
    name: str
    description: str

class ToolCreate(BaseModel):
    name: str
    description: str
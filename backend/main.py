from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Tool, ToolCreate
from typing import List

app = FastAPI(title="Line Tools API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory data store
tools_db = []
current_id = 1

@app.get("/")
async def root():
    return {"message": "Line Tools API"}

@app.get("/tools", response_model=List[Tool])
async def get_tools():
    """Retrieve all tools"""
    return tools_db

@app.post("/tools", response_model=Tool)
async def create_tool(tool: ToolCreate):
    """Create a new tool"""
    global current_id
    new_tool = Tool(
        id=current_id,
        name=tool.name,
        description=tool.description
    )
    tools_db.append(new_tool)
    current_id += 1
    return new_tool

@app.delete("/tools/{tool_id}")
async def delete_tool(tool_id: int):
    """Delete a tool by ID"""
    global tools_db
    
    for index, tool in enumerate(tools_db):
        if tool.id == tool_id:
            deleted_tool = tools_db.pop(index)
            return {"message": f"Tool '{deleted_tool.name}' deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Tool not found")

# Add some sample data
@app.on_event("startup")
async def startup_event():
    """Add sample data on startup"""
    global tools_db, current_id
    sample_tools = [
        {"name": "Hammer", "description": "A tool for hammering nails"},
        {"name": "Screwdriver", "description": "Used for turning screws"},
        {"name": "Wrench", "description": "For tightening nuts and bolts"}
    ]
    
    for tool_data in sample_tools:
        tools_db.append(Tool(
            id=current_id,
            name=tool_data["name"],
            description=tool_data["description"]
        ))
        current_id += 1

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
import io
import os
import json
from fastapi import FastAPI, HTTPException, Query, Header
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from typing import List, Dict, Union, Optional, Tuple, Any
from pptx import Presentation
from signup import create_dummy_input_data, create_dummy_output_data
from ppt import create_slide
from database.connection import Database
from models.user_model import UserModel
from models.input_model import InputModel
from models.output_model import OutputModel
from models.gpt_output_model import GptOutputModel
from models.default_value_model import DefaultValueModel
from bson import ObjectId
from datetime import datetime
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Database.initialize()
user_model = UserModel()
input_model = InputModel()
output_model = OutputModel()
gpt_output_model = GptOutputModel()
default_value_model = DefaultValueModel()

load_dotenv()
IS_DUMMY = os.getenv("IS_DUMMY")

# ContentValueType = Union[str, List[str], List[Dict[str, Union[str, int]]]]
ContentValueType = Union[str, List[str], List[List[Union[str, int]]], List[Dict[str, Union[str, int]]]]

class ContentItem(BaseModel):
    type: str
    value: Optional[ContentValueType] = None
    data: Optional[ContentValueType] = None
    headers: Optional[List[str]] = None
    graphType: str = None

class SlideData(BaseModel):
    title: str
    content: List[ContentItem]

class PresentationData(BaseModel):
    slides: List[SlideData]

class UserLogin(BaseModel):
    email: str
    password: str

class UserSignUp(BaseModel):
    email: str
    password: str
    name:str

def filter_slides(slides, selected_cards):
    if not selected_cards:
        return {"slides": slides}

    filtered_slides = []

    for slide in slides:
        filtered_content = []
        for content in slide["content"]:
            filtered_data = [
                row for row in content["data"]
                if row[0] in selected_cards
            ]

            if filtered_data:
                filtered_content.append({
                    "headers": content["headers"],
                    "data": filtered_data,
                    "type": content["type"]
                })

        if filtered_content:
            filtered_slides.append({
                "title": slide["title"],
                "content": filtered_content
            })

    return {"slides": filtered_slides}

def convert_ai_use_json_list(input_list):
    converted_list = []
    id = 1
    for input_json in input_list:
        # Extract risks dictionary for easier access
        risks = input_json.get('risks', {})

        converted_json = {
            "id": id,
            "name": input_json.get('value_area_name'),
            "applicationTypes": input_json.get('category_name'),
            "horizon": input_json.get('ai_use_class')+ " " +input_json.get('horizonClassification'),
            "infoExposure": risks.get('infoExposure'),
            "dataSensitivity": risks.get('infoSensitivity'),
            "complexityOfUsage": input_json.get('riskComplexity'),
            "riskRating": risks.get('riskRating'),
            "description":input_json.get('description'),
            "reasoning": [risks.get('reasoning')] if risks.get('reasoning') else [],
            "level_of_specialisation_interactionact":risks.get('level_of_specialisation_interaction'),
            "app_operation":risks.get('app_operation'),
        }
        
        converted_list.append(converted_json)
        id = id+1
    return converted_list

def extract_applications(data):
    applications = []
    id_counter = 1  # Initialize the counter

    for key, value in data.items():  # Changed from item() to items() to fix syntax
        for application in value['applications']:
            application['id'] = id_counter  # Add the incremental id
            applications.append(application)  # Use append instead of extend
            id_counter += 1  # Increment the counter for the next application

    return applications

def transform_tech_reasoning_json(user_id):

    output = output_model.find({"userId": user_id})
    default_values = default_value_model.find({})
    question_data = default_values["techQuadQuestion"]

    if not output or not output.get("techQuad"):
        raise HTTPException(status_code=400, detail="Tech quad data is not found")

    tech_quad = output.get("techQuad")
    
    if tech_quad is None:
        return

    transformed_data = []
    
    for _, item in tech_quad.items():
        transformed_item = {
            "title": f"{item['new_app_name']} - {item['category_name']}",
            "description": item['description'] if 'description' in item else '',
            "defaultInfo": [
                {
                    "icon": "🧹",
                    "title": "Linked AI Value",
                    "options": [
                        {"value": item['value_area_name'], "selected": True}
                    ]
                },
                {
                    "icon": "📊",
                    "title": "AI Responsiible Use",
                    "options": [
                        {"value": "Everyday use", "selected": item['ai_use_class'] == "Everyday use"},
                        {"value": "Augmentation", "selected": item['ai_use_class'] == "Augmentation"},
                        {"value": "Transformation", "selected": item['ai_use_class'] == "Transformation"}
                    ]
                },
                {
                    "icon": "🔒",
                    "title": "Quadrant Mapping",
                    "options": [
                        {"value": "Quadrant-1", "selected": item['ai_enablement_quadrant'] == "Quadrant 1"},
                        {"value": "Quadrant-2", "selected": item['ai_enablement_quadrant'] == "Quadrant 2"},
                        {"value": "Quadrant-3", "selected": item['ai_enablement_quadrant'] == "Quadrant 3"},
                        {"value": "Quadrant-4", "selected": item['ai_enablement_quadrant'] == "Quadrant 4"}
                    ]
                }
            ],
            "quadrant_reasoning": item['quadrant_reasoning'] if 'quadrant_reasoning' in item else '',
            "questions":question_data
        }
        transformed_data.append(transformed_item)

    output_model.update({"userId": user_id}, { "techEnablement": transformed_data})

    return  transformed_data


# Pydantic model for request body
class DataModel(BaseModel):
    data: dict

class UserLoginData(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class DataModelList(BaseModel):
    data: list

class GeneratePPTRequest(BaseModel):
    type: str  
    selected_cards: List[dict] 

@app.post("/save-business-context")
async def save_business_context(data: dict, User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")

    insertedResult = input_model.update({"userId": User_id}, {"businessContext": data})
    if insertedResult:
        data = {"message": "Operation successful", "data": []}
        return JSONResponse(content=data, status_code=200)

    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")

@app.get("/fetch-value-areas")
async def fetch_value_areas(User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")
    
    output = output_model.find({"userId": User_id})

    if output and output['suggestionOutput']:
        return output["suggestionOutput"]

    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")

@app.post("/save-suggestions")
async def save_suggestions(data: dict, User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")

    result = input_model.update({"userId": User_id}, {"suggestionInput": data})

    data = {"message": "Operation successful", "data": []}
    return JSONResponse(content=data, status_code=200)

@app.get("/fetch-opportunities")
async def fetch_opportunities(User_id: str = Header(...)):

    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")

    output = output_model.find({"userId": User_id})

    if output and output['opportunities']:
        return output["opportunities"]
    
    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")
    
@app.get("/fetch-ai-strategy")
async def fetch_ai_strategy(User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")

    output = output_model.find({"userId": User_id})

    if output and output['aiApplication']:
        application_list = extract_applications(output["aiApplication"])
        return application_list
    
    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")

@app.post("/save-ai-strategy")
async def save_ai_strategy(data: List[Dict[str, Any]], User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")

    insertedResult = input_model.update({"userId": User_id}, {"aiApplication": data})

    if insertedResult:
        result = {"message": "Operation successful", "data": []}
        return JSONResponse(content=result, status_code=200)
    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")

@app.get("/fetch-ai-use")
async def fetch_ai_use(User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")
    
    output = output_model.find({"userId": User_id})

    if output and output['aiUse']:
        result = convert_ai_use_json_list(output["aiUse"]["applications"])
        return result
    
    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")
    
@app.post("/save-edited-ai-use")
async def fetch_ai_use(data: dict, User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")
    
    insertedResult = input_model.update({"userId": User_id}, {"editedAiUse": data})

    if insertedResult:
        result = {"message": "Operation successful", "data": []}
        return JSONResponse(content=result, status_code=200)

    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")

@app.get("/fetch-tech-reasoning")
async def fetch_tech_reasoning(User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")

    transformed_data = transform_tech_reasoning_json(User_id)

    return transformed_data

@app.post("/save-tech-reasoning")
async def save_tech_reasoning(data: dict, User_id: str = Header(...)):
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")

    insertedResult = input_model.update({"userId": User_id}, {"techReasoning": data})
    if insertedResult:  
        output = output_model.find({"userId": User_id})
        if output and output['result']:
            return output['result']
        raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")
    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")

@app.post("/generate-ppt")
async def generate_ppt(request: GeneratePPTRequest, User_id: str = Header(...)):

    print(f"request.type: '{request.type}'")
    user_check_result = user_model.find({"_id":ObjectId(User_id)})
    if user_check_result is None:
        raise HTTPException(status_code=403, detail="User not found")

    if request.type.strip().lower() not in ['short', 'comprehensive']:
        raise HTTPException(status_code=400, detail="Invalid type. Use 'short' or 'comprehensive'.")
    
    json_file = "short_table.json" if request.type == "short" else "table.json"
    filename = "short_presentation.pptx" if request.type == "short" else "presentation.pptx"

    insertedResult = input_model.update({"userId": User_id}, {"finalSelectedResult": request.selected_cards})
    if insertedResult:
        output = gpt_output_modal.find({"userId":User_id})
        json_data = output["finalResult"]

    try:
        presentation_data = PresentationData(**json_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON structure: {str(e)}")

    prs = Presentation()
    for slide_data in presentation_data.slides:
        create_slide(prs, slide_data)

    ppt_io = io.BytesIO()
    prs.save(ppt_io)
    ppt_io.seek(0)

    return StreamingResponse(
        ppt_io,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

@app.post("/login")
def login(data: UserLogin):
    user = user_model.find({"email": data.email})
    if user and user['password'] == data.password: 
        return {
            "message": "Login successful", 
            "data": {
                    "id": str(user["_id"]),
                    "email": user["email"],
                    "name": user["username"]
                }
            }
    raise HTTPException(status_code=400, detail="Invalid email or password")

@app.post("/signup")
async def signup(data: UserSignUp):
    query = {
        '$or': [
            { "username": data.name },
            { "email": data.email }
        ]
    }
    user = user_model.find(query)

    if user:
        raise HTTPException(status_code=400, detail="User with this email or username already exists")
    
    new_user = {
        "username": data.name,
        "email": data.email,
        "password": data.password  # Note: In production, hash the password!
    }
    insertedUser = user_model.create(new_user)
    if insertedUser and insertedUser.get("_id"):
        if(IS_DUMMY == 'true'):
            input_data = create_dummy_input_data(str(insertedUser["_id"]))
            insertedInput = input_model.create(input_data)
            if insertedInput and  insertedInput.get("_id"):
                output_data = create_dummy_output_data(str(insertedUser["_id"]), str(insertedInput["_id"]))
                insertedOutput = output_model.create(output_data)
                inserted_gpt_Output = gpt_output_model.create({"userId":str(insertedUser["_id"]), "inputId": str(insertedInput["_id"])})
                return {"message": "User created successfully", "data": {"id":str(insertedUser["_id"]), "name":insertedUser["username"], "email":insertedUser["email"]}}
        else:
                insertedInput = input_model.create({"userId":str(insertedUser["_id"])})
                if insertedInput and  insertedInput.get("_id"):
                    insertedOutput = output_model.create({"userId":str(insertedUser["_id"]), "inputId": str(insertedInput["_id"])})
                    inserted_gpt_Output = gpt_output_model.create({"userId":str(insertedUser["_id"]), "inputId": str(insertedInput["_id"])})
                    return {"message": "User created successfully", "data": {"id":str(insertedUser["_id"]), "name":insertedUser["username"], "email":insertedUser["email"]}}
    raise HTTPException(status_code=500, detail="There is some error while processing your request please try agaion later")


@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI application!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
from pydantic import BaseModel
import json
import os
import shutil
from typing import List, Dict, Tuple
import string
from datetime import datetime

def read_from_json(path: str, filename: str) -> Tuple[Dict, int, str]:
    full_path = os.path.join(path, filename)
    
    # Using with statement to open the file
    with open(full_path, 'r') as file:
        data = json.load(file)  # Load the JSON data from the file
    
    return data 

def create_dummy_input_data(userId):
    businessContext = read_from_json(f"./jsons/default_folders/input/", "business_context.json")
    suggestionInput = read_from_json(f"./jsons/default_folders/input/", "suggestion_input.json")
    aiApplication = read_from_json(f"./jsons/default_folders/input/", "ai_strategy_input.json")
    techReasoning = read_from_json(f"./jsons/default_folders/input/", "tech_reasoning.json")
    finalSelectedResult = read_from_json(f"./jsons/default_folders/input/", "final_selected_result.json")

    return {
        "userId":userId,
        "businessContext":businessContext,
        "suggestionInput":suggestionInput,
        "aiApplication":aiApplication,
        "techReasoning":techReasoning,
        "finalSelectedResult":finalSelectedResult,
        "editedAiUse":{}
    }

def create_dummy_output_data(userId, inputId):
    techQuad = read_from_json(f"./jsons/default_folders/output/", "tech_quad_dict.json")
    techEnablement = read_from_json(f"./jsons/default_folders/output/", "tech_enablement_values.json")
    suggestionOutput = read_from_json(f"./jsons/default_folders/output/", "suggestion_output.json")
    opportunities = read_from_json(f"./jsons/default_folders/output/", "opportunities.json")
    aiApplication = read_from_json(f"./jsons/default_folders/output/", "ai_strategy_output.json")
    aiUse = read_from_json(f"./jsons/default_folders/output/", "ai_use_gpt_output.json")
    result = read_from_json(f"./jsons/default_folders/output/", "result.json")
    shortTable = read_from_json(f"./jsons/default_folders/output/", "short_table.json")
    
    return {
        "userId":userId,
        "inputId":inputId,
        "techQuad":techQuad,
        "techEnablement":techEnablement,
        "suggestionOutput":suggestionOutput,
        "opportunities":opportunities,
        "aiApplication":aiApplication,
        "aiUse":aiUse,
        "result":result,
        "shortTable":shortTable
    }



from pydantic import BaseModel
import json
import os
import shutil
from typing import List, Dict, Union
import string
from datetime import datetime

def generate_next_id(existing_ids):
    if not existing_ids:
        return "60c72b2f9b1d4e001c8f8c1a"
    
    last_id = existing_ids[-1]
    
    # Find the position of the last number in the ID
    last_num_pos = -2  # Position right before the last character
    while last_num_pos >= -len(last_id) and not last_id[last_num_pos].isdigit():
        last_num_pos -= 1
    
    # If the last character is 'z' and we found a number before it
    if last_id[-1] == 'z' and last_num_pos >= -len(last_id):
        num = int(last_id[last_num_pos])
        # Replace the number with its increment and reset letter to 'a'
        new_id = (
            last_id[:last_num_pos] + 
            str(num + 1) + 
            last_id[last_num_pos + 1:-1] + 
            'a'
        )
        return new_id
    else:
        # If not ending in 'z' or no number found, just increment the last letter
        base_id = last_id[:-1]
        last_char = last_id[-1]
        chars = string.ascii_lowercase
        next_char_index = chars.index(last_char) + 1
        return f"{base_id}{chars[next_char_index]}"

# def create_user_folders(user_id: str):
#     # Create user's base directory
#     user_base_dir = os.path.join(f"./jsons/", user_id)
    
#     # Create input and output folders within user's directory
#     input_folder = os.path.join(user_base_dir, "input")
#     output_folder = os.path.join(user_base_dir, "output")
#     gpt_output_folder = os.path.join(user_base_dir, "gpt_output")

#     os.makedirs(input_folder, exist_ok=True)
#     os.makedirs(output_folder, exist_ok=True)
#     os.makedirs(gpt_output_folder, exist_ok=True)


def create_user_folders(user_id: str):
    default_folder="./jsons/default_folders"
    # Create user's base directory
    user_base_dir = os.path.join(f"./jsons/", user_id)
    
    # Create input, output, and gpt_output folders by copying from default folder
    input_folder = os.path.join(user_base_dir, "input")
    output_folder = os.path.join(user_base_dir, "output")
    gpt_output_folder = os.path.join(user_base_dir, "gpt_output")
    
    # Create user's base directory
    os.makedirs(user_base_dir, exist_ok=True)
    
    # Copy default folders to user's base directory
    shutil.copytree(os.path.join(default_folder, "input"), input_folder)
    shutil.copytree(os.path.join(default_folder, "output"), output_folder)
    shutil.copytree(os.path.join(default_folder, "gpt_output"), gpt_output_folder)

def save_users(users: List[Dict]):
    os.makedirs(os.path.dirname(USER_FILE), exist_ok=True)
    with open(USER_FILE, 'w') as f:
        json.dump(users, f, indent=4)
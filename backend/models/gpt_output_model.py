from pymongo import MongoClient
from pymongo.errors import CollectionInvalid
from collections import OrderedDict
from datetime import datetime
from typing import Dict, Any
from database.connection import Database

class GptOutputModel:
    def __init__(self):
        """Initialize GptOutputModel"""
        self.db = Database.get_db()
        self.collection_name = 'gpt_outputs'
        self.setup_collection()
        
    def setup_collection(self):
        # Define the schema for User collection
        gpt_output_schema = {
            'userId': {
                'bsonType': 'string',
                'description': 'User ID is required',
            },
            'inputId': {
                'bsonType': 'string',
                'description': 'Input ID is required',
            },
            "aiStrategyOutput": {
                'bsonType': 'object',
                'description': 'ai startegy output information',
                'properties': {},
                'additionalProperties': True
            },
            'aiUse_1': {
                'bsonType': 'object',
                'description': 'ai use one information',
                'properties': {},
                'additionalProperties': True  # Allows any properties in the object
            },
            'rawAiUse': {
                'bsonType': 'object',
                'description': 'raw ai use information',
                'properties': {},
                'additionalProperties': True 
            },
            'aiUse':{
                'bsonType': 'object',
                'description': 'ai use information',
                'properties': {},
                'additionalProperties': True 
            },
            'finalResult': {
                'bsonType': 'object',
                'description': 'final result information',
                'properties': {},
                'additionalProperties': True 
            },
            'flattenedAiStrategyOutput': {
                'bsonType': 'object',
                'description': 'flattened ai strategy output information',
                'properties': {},
                'additionalProperties': True 
            },
            'opportunities': {
                'bsonType': 'object',
                'description': 'opportunities information',
                'properties': {},
                'additionalProperties': True 
            },
            'suggestedVa': {
                'bsonType': 'object',
                'description': 'suggested va information',
                'properties': {},
                'additionalProperties': True
            },
            'techQuadRaw': {
                'bsonType': 'object',
                'description': 'tech quad information',
                'properties': {},
                'additionalProperties': True
            },
            'created_at': {
                'bsonType': 'date',
                'description': 'Creation timestamp'
            },
            'updated_at': {
                'bsonType': 'date',
                'description': 'Last update timestamp'
            }
        }

        # Build validator
        validator = {
            '$jsonSchema': {
                'bsonType': 'object',
                'required': ['userId', 'inputId'],
                'properties': gpt_output_schema
            }
        }

        # Create or modify collection with validator
        try:
            self.db.create_collection(self.collection_name)
        except CollectionInvalid:
            pass

        # Apply the validator
        query = [
            ('collMod', self.collection_name),
            ('validator', validator)
        ]
        self.db.command(OrderedDict(query))
        self.db.gpt_outputs.create_index([('userId', 1), ('inputId', 1)], unique=True)

    def create(self, gpt_output_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new gpt output with automatic timestamp handling
        """
        current_time = datetime.utcnow()
        
        # Add timestamps
        gpt_output_data['created_at'] = current_time
        gpt_output_data['updated_at'] = current_time

        object_fields = ['aiStrategyOutput', 'aiUse_1', 'rawAiUse', 'aiUse','finalResult', 'flattenedAiStrategyOutput', 'opportunities', 'suggestedVa', 'techQuadRaw']

        for field in object_fields:
            if field not in gpt_output_data:
                gpt_output_data[field] = {}  # Initialize as empty object

        # Insert into database
        result = self.db.gpt_outputs.insert_one(gpt_output_data)
        
        # Return the created document
        return self.db.gpt_outputs.find_one({'_id': result.inserted_id})

    def update(self, query: Dict[str, Any], update_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update a gpt output with automatic timestamp handling
        """
        # Add updated_at timestamp
        update_data['updated_at'] = datetime.utcnow()
        
        # Update the document
        result = self.db.gpt_outputs.update_one(
            query, 
            {'$set': update_data}
        )
        
        # Return the updated document
        return self.db.gpt_outputs.find_one(query)

    def find(self, query: Dict[str, Any]) -> Dict[str, Any]:
        """
        Find a gpt output by query
        """
        return self.db.gpt_outputs.find_one(query)
from pymongo import MongoClient
from pymongo.errors import CollectionInvalid
from collections import OrderedDict
from datetime import datetime
from typing import Dict, Any
from database.connection import Database

class OutputModel:
    def __init__(self):
        """Initialize OutputModel"""
        self.db = Database.get_db()
        self.collection_name = 'outputs'
        self.setup_collection()
        
    def setup_collection(self):
        # Define the schema for User collection
        output_schema = {
            'userId': {
                'bsonType': 'string',
                'description': 'User ID is required',
            },
            'inputId': {
                'bsonType': 'string',
                'description': 'Input ID is required',
            },
            "suggestionOutput": {
                'bsonType': 'array',
                'description': 'suggestion output information',
                'properties': {},
                'additionalProperties': True
            },
            'aiUse': {
                'bsonType': 'object',
                'description': 'ai use information',
                'properties': {},
                'additionalProperties': True  # Allows any properties in the object
            },
            'opportunities': {
                'bsonType': 'array',
                'description': 'Opportunities data',
                'properties': {},
                'additionalProperties': True
            },
            'techQuad':{
                'bsonType': 'object',
                'description': 'Tech quad information',
                'properties': {},
                'additionalProperties': True 
            },
            'techEnablement': {
                'bsonType': 'array',
                'description': 'Tech Enablement information',
                'properties': {},
                'additionalProperties': True
            },
            'ppt': {
                'bsonType': 'array',
                'description': 'PPT information',
                'properties': {},
                'additionalProperties': True
            },
            'result': {
                'bsonType': 'array',
                'description': 'Result information',
                'properties': {},
                'additionalProperties': True
            },
            'shortTable': {
                'bsonType': 'object',
                'description': 'short table information',
                'properties': {},
                'additionalProperties': True
            },
            'table': {
                'bsonType': 'object',
                'description': 'Table information',
                'properties': {},
                'additionalProperties': True
            },
            'linkedAiVlaues': {
                'bsonType': 'array',
                'description': 'Linked Ai Vlaues information',
                'properties': {},
                'additionalProperties': True
            },
            'aiApplication':{
                'bsonType': 'object',
                'description': 'Ai use information',
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
                'properties': output_schema
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
        self.db.outputs.create_index([('userId', 1), ('inputId', 1)], unique=True)

    def create(self, output_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new output with automatic timestamp handling
        """
        current_time = datetime.utcnow()
        
        # Add timestamps
        output_data['created_at'] = current_time
        output_data['updated_at'] = current_time

        array_fields = ['opportunities', 'ppt', 'result', 'linkedAiVlaues', 'suggestionOutput', 'techEnablement']
        object_fields = ['shortTable', 'table', 'aiApplication', 'aiUse','techQuad']

        for field in array_fields:
            if field not in output_data:
                output_data[field] = []  # Initialize as empty array

        for field in object_fields:
            if field not in output_data:
                output_data[field] = {}  # Initialize as empty object

        # Insert into database
        result = self.db.outputs.insert_one(output_data)
        
        # Return the created document
        return self.db.outputs.find_one({'_id': result.inserted_id})

    def update(self, query: Dict[str, Any], update_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update a output with automatic timestamp handling
        """
        # Add updated_at timestamp
        update_data['updated_at'] = datetime.utcnow()
        
        # Update the document
        result = self.db.outputs.update_one(
            query, 
            {'$set': update_data}
        )
        
        # Return the updated document
        return self.db.outputs.find_one(query)

    def find(self, query: Dict[str, Any]) -> Dict[str, Any]:
        """
        Find a output by query
        """
        return self.db.outputs.find_one(query)
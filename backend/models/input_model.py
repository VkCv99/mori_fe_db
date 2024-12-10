from pymongo import MongoClient
from pymongo.errors import CollectionInvalid
from collections import OrderedDict
from datetime import datetime
from typing import Dict, Any
from database.connection import Database

class InputModel:
    def __init__(self):
        """Initialize InputModel"""
        self.db = Database.get_db()
        self.collection_name = 'inputs'
        self.setup_collection()
        
    def setup_collection(self):
        # Define the schema for User collection
        input_schema = {
            'userId': {
                'bsonType': 'string',
                'description': 'User ID is required',
            },
            'businessContext': {
                'bsonType': 'object',
                'description': 'Business context information',
                'properties': {},
                'additionalProperties': True  # Allows any properties in the object
            },
            'suggestionInput': {
                'bsonType': 'object',
                'description': 'Suggestion input data',
                'properties': {},
                'additionalProperties': True
            },
            'techReasoning': {
                'bsonType': 'object',
                'description': 'Technical reasoning information',
                'properties': {},
                'additionalProperties': True
            },
            'aiApplication':{
                'bsonType': 'array',
                'description': 'AI Application information',
                'properties': {},
                'additionalProperties': True
            },
            'finalSelectedResult':{
                'bsonType': 'array',
                'description': 'final selected result information',
                'properties': {},
                'additionalProperties': True
            },
            'editedAiUse': {
                'bsonType': 'object',
                'description': 'edited ai use information',
                'properties': {},
                'additionalProperties': True  # Allows any properties in the object
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
                'required': ['userId'],  # Only userId is required
                'properties': input_schema
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
        self.db.inputs.create_index([('userId', 1)], unique=True)

    def create(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new Input with automatic timestamp handling
        """
        current_time = datetime.utcnow()
        
        # Add timestamps
        input_data['created_at'] = current_time
        input_data['updated_at'] = current_time

        # Ensure businessContext, suggestionInput, and techReasoning are objects
        array_fields = ['aiApplication']
        object_fields = ['businessContext', 'suggestionInput', 'techReasoning', 'editedAiUse']

        for field in array_fields:
            if field not in input_data:
                input_data[field] = []  # Initialize as empty array

        for field in object_fields:
            if field not in input_data:
                input_data[field] = {}  # Initialize as empty object

        # Insert into database
        result = self.db.inputs.insert_one(input_data)
        
        # Return the created document
        return self.db.inputs.find_one({'_id': result.inserted_id})

    def update(self, query: Dict[str, Any], update_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update a input with automatic timestamp handling
        """
        # Add updated_at timestamp
        update_data['updated_at'] = datetime.utcnow()
        
        # Update the document
        result = self.db.inputs.update_one(
            query, 
            {'$set': update_data}
        )
        
        # Return the updated document
        return self.db.inputs.find_one(query)

    def find(self, query: Dict[str, Any]) -> Dict[str, Any]:
        """
        Find a input by query
        """
        return self.db.inputs.find_one(query)
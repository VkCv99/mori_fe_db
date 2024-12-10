from pymongo import MongoClient
from pymongo.errors import CollectionInvalid
from collections import OrderedDict
from datetime import datetime
from typing import Dict, Any
from database.connection import Database

class DefaultValueModel:
    def __init__(self):
        """Initialize DefaultValueModel"""
        self.db = Database.get_db()
        self.collection_name = 'default_values'
        self.setup_collection()

    def setup_collection(self):
        # Define the schema for User collection
        default_value_schema = {
            "suggestionTemplate": {
                'bsonType': 'array',
                'description': 'Suggestion Template Information',
                'properties': {},
                'additionalProperties': True
            },
            'techQuadQuestion': {
                'bsonType': 'array',
                'description': 'Tech Quad Question Information',
                'properties': {},
                'additionalProperties': True  # Allows any properties in the object
            },
            'created_at': {
                'type': 'date',
                'required': True,
            },
            'updated_at': {
                'type': 'date',
                'required': True,
            }
        }

        # Build validator
        validator = {
            '$jsonSchema': {
                'bsonType': 'object',
                'properties': {}
            }
        }

        # Build validator
        validator = {
            '$jsonSchema': {
                'bsonType': 'object',
                'properties': {}
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

    def create(self, default_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new default_values with automatic timestamp handling
        """
        current_time = datetime.utcnow()
        
        # Add timestamps
        default_data['created_at'] = current_time
        default_data['updated_at'] = current_time

        array_fields = ['suggestionTemplate', 'techQuadQuestion']

        for field in array_fields:
            if field not in output_data:
                output_data[field] = []

        # Insert into database
        result = self.db.default_values.insert_one(default_data)
        
        # Return the created document
        return self.db.default_values.find_one({'_id': result.inserted_id})

    def update(self, query: Dict[str, Any], update_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update a record with automatic timestamp handling
        """
        # Add updated_at timestamp
        update_data['updated_at'] = datetime.utcnow()
        
        # Update the document
        result = self.db.default_values.update_one(
            query,
            {'$set': update_data}
        )
        
        # Return the updated document
        return self.db.default_values.find_one(query)

    def find(self, query: Dict[str, Any]) -> Dict[str, Any]:
        """
        Find a user by query
        """
        return self.db.default_values.find_one(query)

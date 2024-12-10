from pymongo import MongoClient
from pymongo.errors import CollectionInvalid
from collections import OrderedDict
from datetime import datetime
from typing import Dict, Any
from database.connection import Database

class UserModel:
    def __init__(self):
        """Initialize UserModel"""
        self.db = Database.get_db()
        self.collection_name = 'users'
        self.setup_collection()
        
    def setup_collection(self):
        # Define the schema for User collection
        user_schema = {
            'username': {
                'type': 'string',
                'minlength': 1,
                'required': True,
            },
            'email': {
                'type': 'string',
                'required': True,
            },
            'password': {
                'type': 'string',
                'minlength': 6,
                'required': True,
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

        required = []
        for field_key, field in user_schema.items():
            properties = {'bsonType': field['type']}
            
            if 'minlength' in field:
                properties['minimum'] = field['minlength']
            
            if field.get('required'):
                required.append(field_key)
                
            validator['$jsonSchema']['properties'][field_key] = properties

        if required:
            validator['$jsonSchema']['required'] = required

        # Create or modify collection with validator
        collection = 'users'
        try:
            self.db.create_collection(collection)
        except CollectionInvalid:
            pass

        # Apply the validator
        query = [
            ('collMod', collection),
            ('validator', validator)
        ]
        self.db.command(OrderedDict(query))

    def create(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new user with automatic timestamp handling
        """
        current_time = datetime.utcnow()
        
        # Add timestamps
        user_data['created_at'] = current_time
        user_data['updated_at'] = current_time

        # Insert into database
        result = self.db.users.insert_one(user_data)
        
        # Return the created document
        return self.db.users.find_one({'_id': result.inserted_id})

    def update(self, user_id: str, update_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update a user with automatic timestamp handling
        """
        # Add updated_at timestamp
        update_data['updated_at'] = datetime.utcnow()
        
        # Update the document
        result = self.db.users.update_one(
            {'_id': user_id},
            {'$set': update_data}
        )
        
        # Return the updated document
        return self.db.users.find_one({'_id': user_id})

    def find(self, query: Dict[str, Any]) -> Dict[str, Any]:
        """
        Find a user by query
        """
        return self.db.users.find_one(query)

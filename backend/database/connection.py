# # db_connection.py
# import os
# from pymongo import MongoClient
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # Get the MongoDB URI from environment variables
# mongo_uri = os.getenv("MONGO_URI")

# # Create a MongoDB client
# client = MongoClient(mongo_uri)

# # Select the database
# db = client.get_default_database()  # Adjust if you want to specify the database name

# def get_db():
#     return db


# database/connection.py

import os
from pymongo import MongoClient
from typing import Optional
from datetime import datetime
from dotenv import load_dotenv


class Database:
    client: Optional[MongoClient] = None
    db = None
    load_dotenv()
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("DB_NAME")

    @classmethod
    def initialize(cls):
        """Initialize database connection"""
        if cls.client is None:
            try:
                cls.client = MongoClient(cls.mongo_uri)
                cls.db = cls.client[cls.db_name]
                print(f"Connected to MongoDB at {cls.mongo_uri}")
            except Exception as e:
                print(f"Error connecting to MongoDB: {str(e)}")
                raise e
        return cls.db

    @classmethod
    def get_db(cls):
        """Get database instance, initializing if necessary"""
        if cls.db is None:
            cls.initialize()
        return cls.db

    @classmethod
    def close(cls):
        """Close database connection"""
        if cls.client is not None:
            cls.client.close()
            cls.client = None
            cls.db = None

    @classmethod
    def is_initialized(cls) -> bool:
        """Check if database is initialized"""
        return cls.client is not None and cls.db is not None
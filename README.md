# Project Title
marketing-stategies

## Table of Contents

## Technologies

- **Frontend**: React
  - Node.js version: 18.18
- **Backend**: Python
  - Python version: 3.9.20

  ## Installation

### Backend Setup

    Clone the repository:
    cd backend
    python -m venv venv
    pip install -r requirements.txt
    uvicorn main:app --reload

### Frontend Setup

    Clone the repository:
    cd frontend
    npm install
    npm start

## Docker Setup

### Build and Run with Docker Compose

To build and run both the frontend and backend services using Docker Compose, follow these steps:

1. **Ensure Docker and Docker Compose are installed** on your machine.

2. **From the project root directory**, run the following command to build the images and start the containers:

  1. **Navigate to the backend directory**:
      
      ```bash
      cd backend
      docker build -t backend:latest .
      docker run -idt -p 8000:8000 backend:latest

  2. **Navigate to the frontend directory**:

      ```bash
      cd frontend
      docker build -t frontend:latest .
      docker run -idt -p 3000:3000 frontend:latest


### Folder structure
/project-root
    |-- /backend
    |   |-- venv/
    |   |-- main.py   
    |   |-- requirements.txt
    |
    |-- /frontend
    |   |-- node_modules/
    |   |-- src/
    |   |-- public/
    |   |-- package.json



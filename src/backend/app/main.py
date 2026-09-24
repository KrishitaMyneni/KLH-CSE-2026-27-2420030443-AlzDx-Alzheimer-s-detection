from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import test_database_connection

app = FastAPI(
    title="AlzDx API",
    description="Backend API for the Alzheimer's Disease Detection System",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "AlzDx API is running"
    }


@app.get("/health")
def health_check():
    try:
        test_database_connection()

        return {
            "status": "healthy",
            "database": "connected",
        }

    except Exception as error:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(error),
        }
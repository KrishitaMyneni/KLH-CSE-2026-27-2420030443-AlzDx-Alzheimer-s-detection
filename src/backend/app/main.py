from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine, test_database_connection
from app.models.assessment import Assessment  # noqa: F401 - registers model metadata
from app.api.assessment import router as assessment_router
from app.api.predict import router as predict_router
from app.api.transcribe import router as transcribe_router
from app.services.predictor import load_predictor

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

app.include_router(predict_router)
app.include_router(transcribe_router)
app.include_router(assessment_router)


@app.on_event("startup")
def create_database_tables():
    load_predictor()
    Base.metadata.create_all(bind=engine)


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

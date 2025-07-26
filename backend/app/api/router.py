from fastapi import APIRouter

from app.api.endpoints import therapy

api_router = APIRouter()
api_router.include_router(therapy.router, prefix="/therapy", tags=["therapy"])

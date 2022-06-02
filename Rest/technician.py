from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json

openFileJSON = open('./JSON/api_technician_response_data.json')

json_data = json.load(openFileJSON)

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/v1/solar_farms/{solar_farm_id}/technicians")
async def geoData(solar_farm_id: int):
    return JSONResponse(json_data)
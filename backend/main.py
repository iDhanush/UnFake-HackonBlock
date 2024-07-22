from fastapi import FastAPI
from starlette.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from auth.api import auth_router
from unmask.api import unmask_router
# from blockchain.api import bchain_router
from uploads.api import upload_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/dwd", StaticFiles(directory="assets"), name="download")
app.include_router(auth_router)
# app.include_router(bchain_router)
app.include_router(upload_router)
app.include_router(unmask_router)
# uvicorn.run(app, host="localhost", port=8000)

from fastapi import FastAPI
from backend.global_var import Var
from backend.database import DataBase
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(_fastapi: FastAPI):
    Var.db = DataBase()
    yield


app = FastAPI(lifespan=lifespan)

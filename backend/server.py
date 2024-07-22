from fastapi import FastAPI
from global_var import Var
from database import DataBase
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(_fastapi: FastAPI):
    Var.db = DataBase()
    yield


app = FastAPI(lifespan=lifespan)

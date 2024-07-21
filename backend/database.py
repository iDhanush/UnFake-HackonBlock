import datetime
import re
from typing import Union
from motor import motor_asyncio


class DataBase:


    def __init__(self):
        uri = 'localhost:27017'
        self._client = motor_asyncio.AsyncIOMotorClient(uri)
        self.db = self._client["unfake"]

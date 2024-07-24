import datetime
from motor import motor_asyncio
from pydantic import BaseModel


class CertificateData(BaseModel):
    time: datetime.datetime
    file_uid: str
    file_hash: str
    tx_id: str
    owner_address: str
    polygon_url: str


class DataBase:
    def __init__(self):
        uri = 'localhost:27017'
        self._client = motor_asyncio.AsyncIOMotorClient(uri)
        self.db = self._client["unfake"]
        self.certs = self.db['certs']

    async def add_cert(self, certificate: CertificateData):
        await self.certs.insert_one(certificate.model_dump())

import os

from PIL import Image
from fastapi import APIRouter, HTTPException
from unmask.unmasker import unmask_image
from utils import image_extensions, file_to_sha256, video_extensions

unmask_router = APIRouter(tags=['unmask'])


@unmask_router.get('/unmask/{client_address:str}/{file_uid:str}')
async def unmasker(client_address: str, file_uid: str):
    path = f'assets/{file_uid}'

    file = Image.open(f"assets/{file_uid}")
    print(path)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail='File not found')

    if file_uid.split('.')[-1].lower() in image_extensions:
        ftype = 'image'
    elif file_uid.split('.')[-1].lower() in video_extensions:
        ftype = 'video'
    else:
        return HTTPException(402, 'filetype error')
    if ftype == 'video':
        return {'status': 'pending', 'type': ftype}

    prediction = unmask_image(file)
    res = {'prediction': prediction,
           'status': 'finish',
           'type': ftype,
           'fid': file_uid,
           'hash': file_to_sha256(f'assets/{file_uid}')}
    return res

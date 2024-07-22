from fastapi import APIRouter
from unmasker import unmask_image
unmask_router = APIRouter(tags=['unmask'])


@unmask_router.get('/unmask/{client_address:str}/<file_uid:str>')
async def unmasker(client_address: str, file_uid: str):
    file = open(f'assets/{file_uid}', 'rb')
    print(file)
    return {
        "url": "https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg"}

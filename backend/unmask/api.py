from fastapi import APIRouter

unmask_router = APIRouter(tags=['unmask'])


@unmask_router.get('/unmask/{client_address:str}/<file_uid:str>')
async def unmasker(client_address: str, file_uid: str):
    file = open(f'assets/{client_address}_{file_uid}', 'rb')
    return {
        "url": "https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg"}

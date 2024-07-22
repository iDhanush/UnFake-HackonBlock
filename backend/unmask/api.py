from fastapi import APIRouter

unmask_router = APIRouter(tags=['unmask'])


@unmask_router.get('/unmask/<file_uid:str>')
async def unmasker(file_uid: str):
    file = open(f'assets/{file_uid}', 'rb')

    return {
        "url": "https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg"}

import json
import os
import dotenv
from brownie.network import web3
from web3 import Web3
from fastapi import APIRouter
from pydantic import BaseModel
from brownie import project, network, accounts
from brownie.project import get_loaded_projects
from brownie.network.account import LocalAccount

bchain_router = APIRouter(tags=['bchain'])
dotenv.load_dotenv()

p = project.load('blockchain/brown')

network.connect('polygon-zkevm-test2')
# Get the deployed contracts
# FundMe = p.FundMe
SimpleCollectible = p.SimpleCollectible
get_loaded_projects()[0].load_config()
print(get_loaded_projects()[0])


def get_account() -> LocalAccount:
    return accounts.add(os.environ.get('PRIVATE_KEY'))


account = get_account()
print(account)

simple_collectible = SimpleCollectible.deploy({"from": account, "gas_price": Web3.to_wei("0.1", "gwei")})

account = get_account()


class PostData(BaseModel):
    transc: str


OPENSEA_URL = "https://testnets.opensea.io/assets/{}/{}"


@bchain_router.post('/mint_certificate/')
async def mint_certificate(post_data: PostData):
    img_url = 'https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg'
    uri = {
        "name": f"kjhdaskjhagsdadskjhgadskjhgklajsdh",
        "description": f"lkjnfaskadlsjhadsklhjgasdlkjhasdlkjh",
        "image": img_url,
        "attributes": [
            {
                "Result": f"asdas",
                "value": str('100')
            }
        ]
    }
    json_uri = json.dumps(uri)
    tx = web3.eth.get_transaction(post_data.transc)
    client_address = tx.get('from')
    print(client_address, tx)

    tx = simple_collectible.createCollectible(json_uri, client_address,
                                              {"from": account, "gas_price": Web3.to_wei("0.1", "gwei")})
    print(
        f"You can view your nft at {OPENSEA_URL.format(simple_collectible.address, simple_collectible.tokenCounter() - 1)}")
    print("Payment Transfered")
    return {"url": img_url}

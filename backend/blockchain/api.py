import os
import dotenv
from brownie import project, network, accounts
from brownie.network.account import LocalAccount
from brownie.project import get_loaded_projects
from fastapi import APIRouter

bchain_router = APIRouter(tags=['bchain'])
dotenv.load_dotenv()

p = project.load('blockchain/brown')

network.connect('sepolia')
# Get the deployed contracts
# FundMe = p.FundMe
SimpleCollectible = p.SimpleCollectible

get_loaded_projects()[0].load_config()
print(get_loaded_projects()[0])


def get_account() -> LocalAccount:
    return accounts.add(os.environ.get('PRIVATE_KEY'))


# Now you can interact with your contracts
account = get_account()
print(account)

simple_collectible = SimpleCollectible.deploy({"from":account})

account = get_account()


@bchain_router.post('/mint_certificate/')
async def mint_certificate():
    pass

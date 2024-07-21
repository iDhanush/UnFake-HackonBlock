import os
import json
import dotenv
from brownie import project, network, config, accounts, web3
from brownie.network.account import LocalAccount
from brownie.project import get_loaded_projects
from fastapi import APIRouter
from pydantic import BaseModel

from web3.datastructures import AttributeDict

dotenv.load_dotenv()
blockchn_router = APIRouter(tags=['crypto'])

p = project.load('crypto')
network.connect('sepolia')
# Get the deployed contracts
FundMe = p.FundMe
SimpleCollectible = p.SimpleCollectible

get_loaded_projects()[0].load_config()
print(get_loaded_projects()[0])


def get_account() -> LocalAccount:
    return accounts.add(os.environ.get('PRIVATE_KEY'))


# Now you can interact with your contracts
account = get_account()
print(account)

if len(FundMe) > 0:
    fund_me = FundMe[-1]
else:
    print("FundMe not deployed yet on Sepolia")

simple_collectible = SimpleCollectible[-1]

account = get_account()


@blockchn_router.post('/mint_certificate/')
async def mint_certificate():
    pass

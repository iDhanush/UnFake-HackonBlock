import requests

url = "https://api.reservoir.tools/tokens/v6?collection=0xf22756f18828b857c8252b4B735907fA9Ba24C9b&tokenName=%231"

headers = {
    "accept": "*/*",
    "x-api-key": "8213dba5-1433-5c88-b2c3-b65b481e7ac4"
}

response = requests.get(url, headers=headers)

print(response.text)
# Crypto wallet
REST API implementing CRUD interface for address book of crypto wallets with the ability to receive a balance in **Ethereum** and **USDT**

![pexels-lukas-915917](https://user-images.githubusercontent.com/38041284/173495874-afdddcaf-6fbf-49cb-b78a-0b8e44aee69a.jpg)


## Deployment
https://crypto-wallet-eth.herokuapp.com/api/v1/balance/0x5754284f345afc66a98fbb0a0afe71e0f007b949

**Withount DB! Only checking balance without saving** 

## Usage
API supports CRUD operations with wallets:
1. POST `/api/v1/wallet`
2. GET `/api/v1/wallet/:id`
3. PUT `/api/v1/wallet/:id`
4. DELETE `/api/v1/wallet/:id`

Body for POST & PUT requests:
```json
{
    "address": "0xf977814e90da44bfa03b6295a0616a897441acec"
}
```
Response for POST, GET & PUT requests:
```json
{
    "id": 2,
    "address": "0xf977814e90da44bfa03b6295a0616a897441acec",
    "balance": {
        "ethBalance": "350176.369374059052253538",
        "tetherBalance": "1897283277"
    }
}
```

And checking balance without saving address to DB:

5. GET `/api/v1/balance/:address`

## Error statuses
* 400: Invalid address
* 404: Not found wallet
* 500: DataBase unavailable or another server error

## Local development
1. Create `.env` and write: 
```
INFURA_TOKEN=<token>
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
``` 
2. Launch Docker and run `npm run postgres:up`;
3. Run `nvm use && npm run dev`;

## Based on
* Node.js v18.3.0;
* Typescript;
* Express;
* Inversify;
* Web3;
* PostgreSQL;
* Typeorm;
* Jest;

## Read more
* USDT contract:
https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7

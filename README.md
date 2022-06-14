# Crypto wallet

## Local development

1. Create `.env` and write: 
```
INFURA_TOKEN=<token>
``` 
2. Run `nvm use && npm run dev`;

## Usage
API supports CRUD operations with wallets:
1. POST `http://localhost:3001/api/v1/wallet`
2. GET `http://localhost:3001/api/v1/wallet/:id`
3. PUT `http://localhost:3001/api/v1/wallet/:id`
4. DELETE `http://localhost:3001/api/v1/wallet/:id`

Body for POST & PUT requests:
```json
{
    "address": "0xf977814e90da44bfa03b6295a0616a897441acec"
}
```
Response for POST, GET & PUT requests:
```json
{
    "id":1,
    "address":"0xf977814e90da44bfa03b6295a0616a897441acec",
    "ethBalance":"350176.37164372055022388",
    "tetherBalance":"1897283277"
}
```

## Based on
* Node.js v18.3.0;
* Express;
* Inversify;
* Web3;
* PostgreSQL
* Typeorm;

## Read more:

* USDT contract:
https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7
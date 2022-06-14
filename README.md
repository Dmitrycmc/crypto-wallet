# Crypto wallet
REST API implementing CRUD interface for address book of crypto wallets with the ability to receive a balance in **Ethereum** and **USDT**

## Local development
1. Create `.env` and write: 
```
INFURA_TOKEN=<token>
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
``` 
2. Launch Docker and run `npm run posgres:up`;
3. Run `nvm use && npm run dev`;

## Usage
API supports CRUD operations with wallets:
1. POST `/api/v1/wallet`
2. GET `/api/v1/wallet/:id`
3. PUT `/api/v1/wallet/:id`
4. DELETE `/api/v1/wallet/:id`

And checking balance without saving:

5. GET `/api/v1/wallet/usdt/:address`
6. GET `/api/v1/wallet/eth/:address`

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
* PostgreSQL;
* Typeorm;

## Read more:
* USDT contract:
https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7
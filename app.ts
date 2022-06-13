import "./imports";

import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';

import { myContainer } from './inversify.config';
import { Types } from './types';
import { IEthereumProvider } from './types';

import { DataSource } from "typeorm"
import { Wallet } from "./entities/wallet"
 
const appDataSource = myContainer.get<DataSource>(Types.DataSource);

appDataSource.initialize()
    .then(() => {
        const blockChainService = myContainer.get<IEthereumProvider>(Types.IEthereumProvider);

        const walletRepository = appDataSource.getRepository(Wallet);
        walletRepository.find().then(console.log);


        const app = express();
        const server = http.createServer(app);

        app.use(bodyParser.json());

        app.get('/get-eth-balance/:wallet', async (req, res) => {
            res.send(await blockChainService.getEthBalance(req.params.wallet));
        });

        app.get('/get-usdt-balance/:wallet', async (req, res) => {
            res.send(await blockChainService.getUsdtBalance(req.params.wallet));
        });



        const port = process.env.PORT || '3001';

        server.listen(port, () => {
            console.log(`listening on *:${port}`);
        });
    })
    .catch((error) => console.log(error))
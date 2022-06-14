import './imports';

import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';

import { myContainer } from './inversify.config';
import { IRouterWrapper, Types } from './types';

import { DataSource } from 'typeorm';
 
(async () => {
    const appDataSource = myContainer.get<DataSource>(Types.DataSource);
    const walletRouter = myContainer.get<IRouterWrapper>(Types.IRouterWrapper);

    try {
        await appDataSource.initialize();
    } catch (e) {
        console.error("Unable to connect to PostreSQL");
    }

    const app = express();
    const server = http.createServer(app);

    app.use(bodyParser.json());

    app.use('/api/v1/wallet', walletRouter.getRouter());

    const port = process.env.PORT || '3001';

    server.listen(port, () => {
        console.log(`listening on *:${port}`);
    });
})();
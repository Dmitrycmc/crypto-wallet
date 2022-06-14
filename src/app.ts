import './imports';

import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';

import { myContainer } from './inversify.config';
import { IRouterWrapper, Types } from './types';
 
const apiRouter = myContainer.get<IRouterWrapper>(Types.ApiRouter);

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

app.use('/api/v1', apiRouter.getRouter());

const port = process.env.PORT || '3001';

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
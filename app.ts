import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import {getBalance} from './logic';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

app.get('/get-balance/:wallet', async (req, res) => {
    res.send(await getBalance(req.params.wallet));
});

const port = process.env.PORT || '3001';

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
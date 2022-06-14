import {Router} from 'express';
import { inject, injectable } from 'inversify';
import { IError } from '../errors/i-error';
import { Types, IWalletService } from '../types';

@injectable()
export class WalletRouter {
    @inject(Types.IWalletService) private _walletService: IWalletService;

    private _router: Router;

    constructor() {
        this._router = Router();

        this._router.post('/', (req, res, next) => {
            this._walletService.saveWallet(req.body.address)
                .then(data => res.send(data))
                .catch(err => next(err));
        });

        this._router.get('/:id', (req, res, next) => {
            this._walletService.getWallet(Number(req.params.id))
                .then(data => res.send(data))
                .catch(err => next(err));
        });

        this._router.put('/:id', (req, res, next) => {
            this._walletService.updateWallet(Number(req.params.id), req.body.address)
                .then(data => res.send(data))
                .catch(err => next(err));
        });

        this._router.delete('/:id', (req, res, next) => {
            this._walletService.deleteWallet(Number(req.params.id))
                .then(() => res.end())
                .catch(err => next(err));
        });

        this._router.get('/usdt/:address', (req, res, next) => {
            this._walletService.getUsdtBalance(req.params.address)
                .then(data => res.send(data))
                .catch(err => next(err));
        });

        this._router.get('/eth/:address', (req, res, next) => {
            this._walletService.getEthBalance(req.params.address)
                .then(data => res.send(data))
                .catch(err => next(err));
        });

        this._router.use('/', (err: IError | any, _req, res, _next) => {
            console.error(err);
            res.status(err.statusCode || 500).send(err.statusMessage || 'Something went wrong');
        });
    }

    getRouter() {
        return this._router;
    }
}
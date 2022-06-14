import {Router} from 'express';
import { inject, injectable } from 'inversify';
import { Types, IWalletService, IRouterWrapper } from '../types';

@injectable()
export class WalletRouter implements IRouterWrapper {
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
    }

    getRouter() {
        return this._router;
    }
}
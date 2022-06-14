import {Router} from 'express';
import { inject, injectable } from 'inversify';
import { Types, IWalletService } from '../types';

@injectable()
export class WalletRouter {
    @inject(Types.IWalletService) private _walletService: IWalletService;

    private _router: Router;

    constructor() {
        this._router = Router();

        this._router.post('/', async (req, res) => {
            const wallet = await this._walletService.saveWallet(req.body.address);
            res.send(wallet);
        })

        this._router.get('/:id', async (req, res) => {
            const wallet = await this._walletService.getWallet(Number(req.params.id));
            res.send(wallet);
        })

        this._router.put('/:id', async (req, res) => {
            const wallet = await this._walletService.updateWallet(Number(req.params.id), req.body.address);
            res.send(wallet);
        })

        this._router.delete('/:id', (req, res) => {
            this._walletService.deleteWallet(Number(req.params.id));
            res.end();
        })
    }

    getRouter() {
        return this._router;
    }
}
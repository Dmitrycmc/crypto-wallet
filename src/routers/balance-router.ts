import {Router} from 'express';
import { inject, injectable } from 'inversify';
import { Types, IBalanceService, IRouterWrapper } from '../types';

@injectable()
export class BalanceRouter implements IRouterWrapper {
    @inject(Types.IBalanceService) private _balanceService: IBalanceService;

    private _router: Router;

    constructor() {
        this._router = Router();

        this._router.get('/:address', (req, res, next) => {
            this._balanceService.getBalance(req.params.address)
                .then(data => res.send(data))
                .catch(err => next(err));
        });
    }

    getRouter() {
        return this._router;
    }
}
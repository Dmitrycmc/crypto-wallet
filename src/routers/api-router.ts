import {Router} from 'express';
import { inject, injectable } from 'inversify';
import { IError } from '../errors';
import { Types, IRouterWrapper } from '../types';

@injectable()
export class ApiRouter implements IRouterWrapper {
    private _router: Router;

    constructor(
        @inject(Types.WalletRouter) walletRouter: IRouterWrapper,
	    @inject(Types.BalanceRouter) balanceRouter: IRouterWrapper
    ) {
        this._router = Router();

        this._router.use('/wallet', walletRouter.getRouter());
        this._router.use('/balance', balanceRouter.getRouter());

        this._router.use('/', (err: IError | any, _req, res, _next) => {
            console.error(err);
            res.status(err.statusCode || 500).send(err.statusMessage || 'Something went wrong');
        });
    }

    getRouter() {
        return this._router;
    }
}
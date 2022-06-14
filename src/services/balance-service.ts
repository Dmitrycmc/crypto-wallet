import { inject, injectable } from 'inversify';
import { Balance } from '../entities';
import { InvalidAddress } from '../errors';
import { IEthereumProvider, Types } from '../types';
import { IBalanceService } from '../types/i-balance-service';

@injectable()
export class BalanceService implements IBalanceService {
    @inject(Types.IEthereumProvider) private _ethereumProvider: IEthereumProvider;

    async getBalance(address: string): Promise<{address: string, balance: Balance}> {
        const [eth, tether] = await Promise.all([
            this._ethereumProvider.getEthBalance(address),
            this._ethereumProvider.getUsdtBalance(address)
        ])
            .catch(err => {
                if (err.message.includes('the capitalization checksum test failed') || err.code === 'INVALID_ARGUMENT') {
                    throw new InvalidAddress(address);
                }
                throw err;
            });

        return {
            address,
            balance: {
                ethBalance: eth,
                tetherBalance: tether
            }
        };
    } 
}
import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { Balance, Wallet, WalletWithBalance } from '../entities';
import { NotFoundError } from '../errors';
import { IBalanceService, IWalletService, Types } from '../types';

@injectable()
export class WalletService implements IWalletService {
    @inject(Types.WalletRepositoryProvider) private _walletRepositoryProvider: () => Promise<Repository<Wallet>>;
    @inject(Types.IBalanceService) private _balanceService: IBalanceService;

    async saveWallet(address: string): Promise<WalletWithBalance> {
        const balance: Balance = (await this._balanceService.getBalance(address)).balance;

        const wallet = new Wallet();
        wallet.address = address;
        const savedWallet = await (await this._walletRepositoryProvider()).save(wallet);

        return new WalletWithBalance(savedWallet, balance);
    }

    async getWallet(id: number): Promise<WalletWithBalance> {
        const wallet = await (await this._walletRepositoryProvider()).findOneBy({id});

        if (wallet === null) {
            throw new NotFoundError(id);
        }

        const balance: Balance = (await this._balanceService.getBalance(wallet.address)).balance;

        return new WalletWithBalance(wallet, balance);
    }

    async updateWallet(id: number, address: string): Promise<WalletWithBalance> {
        const balance: Balance = (await this._balanceService.getBalance(address)).balance;

        const wallet = await (await this._walletRepositoryProvider()).findOneBy({id});

        if (wallet === null) {
            throw new NotFoundError(id);
        }

        wallet.address = address;
        const updatedWallet = await (await this._walletRepositoryProvider()).save(wallet);

        return new WalletWithBalance(updatedWallet, balance);
    }

    async deleteWallet(id: number): Promise<void> {
        await (await this._walletRepositoryProvider()).delete({id});
    }
}
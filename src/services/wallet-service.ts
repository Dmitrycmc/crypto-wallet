import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { Wallet, WalletWithBalance } from "../entities/wallet";
import { IEthereumProvider, IWalletService, Types } from "../types";

@injectable()
export class WalletService implements IWalletService {
    @inject(Types.WalletRepository) private _walletRepository: Repository<Wallet>;
    @inject(Types.IEthereumProvider) private _ethereumProvider: IEthereumProvider;

    private async enrichByBalance(wallet: Wallet): Promise<WalletWithBalance> {
        const [eth, tether] = await Promise.all([
            this._ethereumProvider.getEthBalance(wallet.address),
            this._ethereumProvider.getUsdtBalance(wallet.address)
        ]);

        const walletWithBalance = new WalletWithBalance();
        walletWithBalance.id = wallet.id;
        walletWithBalance.address = wallet.address;
        walletWithBalance.ethBalance = eth;
        walletWithBalance.tetherBalance = tether;

        return walletWithBalance;
    }

    async saveWallet(address: string): Promise<WalletWithBalance> {
        const wallet = new Wallet();
        wallet.address = address;
        const savedWallet = await this._walletRepository.save(wallet);

        return this.enrichByBalance(savedWallet);
    }

    async getWallet(id: number): Promise<WalletWithBalance> {
        const wallet = await this._walletRepository.findOneBy({id});

        return this.enrichByBalance(wallet);
    }

    async updateWallet(id: number, address: string): Promise<WalletWithBalance> {
        const wallet = await this._walletRepository.findOneBy({id});

        wallet.address = address;
        const updatedWallet = await this._walletRepository.save(wallet);

        return this.enrichByBalance(updatedWallet);
    }

    async deleteWallet(id: number): Promise<void> {
        await this._walletRepository.delete({id});
    }

}
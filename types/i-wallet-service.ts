import { WalletWithBalance } from "../entities/wallet";

export interface IWalletService {
    saveWallet(address: string): Promise<WalletWithBalance>,
    getWallet(id: number): Promise<WalletWithBalance>,
    updateWallet(id: number, address: string): Promise<WalletWithBalance>,
    deleteWallet(id: number): Promise<void>,
}
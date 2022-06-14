export interface IEthereumProvider {
    getEthBalance(wallet: string): Promise<string>;
    getUsdtBalance(wallet: string): Promise<string>;
}
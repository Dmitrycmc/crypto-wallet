export interface IBlockChainService {
    getEthBalance(wallet: string): Promise<string>;
    getUsdtBalance(wallet: string): Promise<string>;
}
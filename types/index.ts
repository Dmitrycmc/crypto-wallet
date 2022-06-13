export * from './i-blockchain-service';

const Types = {
    IBlockChainService: Symbol.for("IBlockChainService"),
    DataSource: Symbol("DataSource"),
    WalletRepository: Symbol("WalletRepository"),
};

export { Types };
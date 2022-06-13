export * from './i-ethereum-provider';

const Types = {
    IEthereumProvider: Symbol.for("IEthereumProvider"),
    DataSource: Symbol("DataSource"),
    WalletRepository: Symbol("WalletRepository"),
};

export { Types };
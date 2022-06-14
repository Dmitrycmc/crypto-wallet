export * from './i-ethereum-provider';
export * from './i-router-wrapper';
export * from './i-wallet-service';

const Types = {
    IRouterWrapper: Symbol.for('IRouterWrapper'),
    IWalletService: Symbol.for('IWalletService'),
    IEthereumProvider: Symbol.for('IEthereumProvider'),
    DataSource: Symbol('DataSource'),
    WalletRepository: Symbol('WalletRepository'),
};

export { Types };
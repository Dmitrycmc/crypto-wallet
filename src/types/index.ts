export * from './i-ethereum-provider';
export * from './i-router-wrapper';
export * from './i-wallet-service';

const Types = {
    IRouterWrapper: Symbol.for('IRouterWrapper'),
    IWalletService: Symbol.for('IWalletService'),
    IEthereumProvider: Symbol.for('IEthereumProvider'),
    DataSource: Symbol('DataSource'),
    WalletRepositoryProvider: Symbol('WalletRepositoryProvider'),
};

export { Types };
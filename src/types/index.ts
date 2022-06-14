export * from './i-ethereum-provider';
export * from './i-router-wrapper';
export * from './i-wallet-service';
export * from './i-balance-service';

const Types = {
    ApiRouter: Symbol('ApiRouter'),
    WalletRouter: Symbol.for('WalletRouter'),
    BalanceRouter: Symbol.for('BalanceRouter'),
    IBalanceService: Symbol.for('IBalanceService'),
    IWalletService: Symbol.for('IWalletService'),
    IEthereumProvider: Symbol.for('IEthereumProvider'),
    DataSource: Symbol.for('DataSource'),
    WalletRepositoryProvider: Symbol('WalletRepositoryProvider'),
};

export { Types };
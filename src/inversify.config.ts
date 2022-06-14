import { Container } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { Types, IEthereumProvider, IRouterWrapper, IWalletService, IBalanceService } from './types';
import { DataBaseUnavailable } from './errors';
import { Wallet } from './entities';
import { WalletRouter, BalanceRouter, ApiRouter } from './routers';
import { WalletService, BalanceService } from './services';

import { EthereumProvider } from './providers/ethereum-provider';
import { getPostresDataSource } from './providers/get-postgres-data-source';



const myContainer = new Container();
myContainer.bind<IRouterWrapper>(Types.ApiRouter).to(ApiRouter).inSingletonScope();
myContainer.bind<IRouterWrapper>(Types.WalletRouter).to(WalletRouter).inSingletonScope();
myContainer.bind<IRouterWrapper>(Types.BalanceRouter).to(BalanceRouter).inSingletonScope();

myContainer.bind<IWalletService>(Types.IWalletService).to(WalletService).inSingletonScope();
myContainer.bind<IBalanceService>(Types.IBalanceService).to(BalanceService).inSingletonScope();

myContainer.bind<IEthereumProvider>(Types.IEthereumProvider).to(EthereumProvider).inSingletonScope();

myContainer.bind<DataSource>(Types.DataSource).toDynamicValue(getPostresDataSource);

myContainer.bind<Promise<Repository<Wallet>>>(Types.WalletRepositoryProvider)
    .toProvider<Repository<Wallet>>((context) => {
        return () => {
            return new Promise<Repository<Wallet>>((resolve, reject) => {
                const dataSource = context.container.get<DataSource>(Types.DataSource);

                dataSource.initialize()
                    .then(() => {
                        resolve(dataSource.getRepository(Wallet));
                    })
                    .catch(() => {
                        reject(new DataBaseUnavailable());
                    });
            });
        };
    });

export { myContainer };
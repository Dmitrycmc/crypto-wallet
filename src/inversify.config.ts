import { Container } from 'inversify';
import { Types } from './types';
import { IEthereumProvider, IRouterWrapper, IWalletService } from './types';
import { EthereumProvider } from './providers/ethereum-provider';
import { DataSource, Repository } from 'typeorm';
import { Wallet } from './entities';
import { getPostresDataSource } from './providers/get-postgres-data-source';
import { WalletRouter } from './routers/wallet-router';
import { WalletService } from './services/wallet-service';
import { DataBaseUnavailable } from './errors';

const myContainer = new Container();
myContainer.bind<IRouterWrapper>(Types.IRouterWrapper).to(WalletRouter).inSingletonScope();

myContainer.bind<IWalletService>(Types.IWalletService).to(WalletService).inSingletonScope();

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
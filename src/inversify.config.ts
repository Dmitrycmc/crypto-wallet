import { Container } from "inversify";
import { Types } from "./types";
import { IEthereumProvider, IRouterWrapper, IWalletService } from "./types";
import { EthereumProvider } from "./providers/ethereum-provider";
import { DataSource, Repository } from "typeorm";
import { Wallet } from "./entities/wallet";
import { getPostresDataSource } from "./providers/get-postgres-data-source";
import { WalletRouter } from "./routers/wallet-router";
import { WalletService } from "./services/wallet-service";

const myContainer = new Container();
myContainer.bind<IRouterWrapper>(Types.IRouterWrapper).to(WalletRouter).inSingletonScope();

myContainer.bind<IWalletService>(Types.IWalletService).to(WalletService).inSingletonScope();

myContainer.bind<IEthereumProvider>(Types.IEthereumProvider).to(EthereumProvider).inSingletonScope();

myContainer.bind<DataSource>(Types.DataSource).toDynamicValue(getPostresDataSource).inSingletonScope();

myContainer.bind<Repository<Wallet>>(Types.WalletRepository).toDynamicValue(() => 
    myContainer.get<DataSource>(Types.DataSource).getRepository(Wallet)
).inSingletonScope();

export { myContainer };
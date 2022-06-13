import { Container } from "inversify";
import { Types } from "./types";
import { IEthereumProvider } from "./types";
import { EthereumProvider } from "./providers/ethereum-provider";
import { DataSource, Repository } from "typeorm";
import { Wallet } from "./entities/wallet";
import { getPostresDataSource } from "./providers/get-postgres-data-source";

const myContainer = new Container();
myContainer.bind<IEthereumProvider>(Types.IEthereumProvider).to(EthereumProvider).inSingletonScope();

myContainer.bind<DataSource>(Types.DataSource).toDynamicValue(getPostresDataSource).inSingletonScope();

myContainer.bind<Repository<Wallet>>(Types.WalletRepository).toDynamicValue(() => 
    myContainer.get<DataSource>(Types.DataSource).getRepository(Wallet)
).inSingletonScope();

export { myContainer };
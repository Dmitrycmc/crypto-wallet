import { Container } from "inversify";
import { Types } from "./types";
import { IBlockChainService } from "./types";
import { BlockChainService } from "./services/blockchain-service";
import { DataSource, Repository } from "typeorm";
import { Wallet } from "./entities/wallet";
import { getPostresConnection } from "./postgres/postgres-connection";

const myContainer = new Container();
myContainer.bind<IBlockChainService>(Types.IBlockChainService).to(BlockChainService).inSingletonScope();

myContainer.bind<DataSource>(Types.DataSource).toDynamicValue(getPostresConnection).inSingletonScope();

myContainer.bind<Repository<Wallet>>(Types.WalletRepository).toDynamicValue(() => 
    myContainer.get<DataSource>(Types.DataSource).getRepository(Wallet)
).inSingletonScope();

export { myContainer };
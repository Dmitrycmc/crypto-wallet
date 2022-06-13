import { Container } from "inversify";
import { Types } from "./types";
import { IBlockChainService } from "./types";
import { BlockChainService } from "./services/blockchain-service";

const myContainer = new Container();
myContainer.bind<IBlockChainService>(Types.IBlockChainService).to(BlockChainService).inSingletonScope();

export { myContainer };
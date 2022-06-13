import { IEthereumProvider } from '../types';
import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import { injectable } from 'inversify';

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${process.env.INFURA_TOKEN}`);
const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const usdtAbiJson: AbiItem[] = [
    // balanceOf
    {
        name: 'balanceOf',
        type: 'function',
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        outputs: [{ name: 'balance', type: 'uint256' }]
        
    },
    // decimals
    {
        name: 'decimals',
        type: 'function',
        constant: true,
        inputs: [],
        outputs: [{ name: '', type: 'uint8' }]
    }
];

const usdtContract = new web3.eth.Contract(usdtAbiJson, usdtContractAddress);

@injectable()
export class EthereumProvider implements IEthereumProvider {
    async getEthBalance(wallet: string): Promise<string> {
        const value = await web3.eth.getBalance(wallet);
        return Web3.utils.fromWei(value);
    }

    async getUsdtBalance(wallet: string): Promise<string> {
        const [balance, decimals] = await Promise.all<[number, number]>([
            usdtContract.methods.balanceOf(wallet).call(),
            usdtContract.methods.decimals().call()
        ]);
        return String(balance / (10 ** decimals));
    }
}
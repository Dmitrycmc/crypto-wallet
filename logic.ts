import Web3 from 'web3';
import {AbiItem} from 'web3-utils';

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${process.env.INFURA_TOKEN}`);

const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const usdtAbiJson: AbiItem[] = [
    // balanceOf
    {
        constant: true,
        inputs: [{ name:'_owner', type:'address' }],
        name: 'balanceOf',
        outputs: [{ name:'balance', type:'uint256' }],
        type: 'function'
    },
    // decimals
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name:'', type:'uint8' }],
        type: 'function'
    }
];

const usdtContract = new web3.eth.Contract(usdtAbiJson, usdtContractAddress);

const getEthBalance = (walletAddress: string) => web3.eth.getBalance(walletAddress).then(Web3.utils.fromWei);

const getUsdtBalance = (walletAddress: string) => Promise.all([
    usdtContract.methods.balanceOf(walletAddress).call(),
    usdtContract.methods.decimals().call()
]).then(([balance, decimals]) => balance / (10 ** decimals));

export const getBalance = (walletAddress: string) => Promise.all([
    getEthBalance(walletAddress),
    getUsdtBalance(walletAddress)
]).then(([ethBalance, usdtBalance]) => {
    return `${ethBalance} ETH; ${usdtBalance} USDT`;
});
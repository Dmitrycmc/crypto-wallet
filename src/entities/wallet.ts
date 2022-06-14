import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        length: 100,
    })
        address: string;
}

export interface Balance {
    ethBalance: string;
    tetherBalance: string;
}

export class WalletWithBalance extends Wallet {
    balance: Balance;

    constructor(wallet: Wallet, balance: Balance) {
        super();
        this.id = wallet.id;
        this.address = wallet.address;
        this.balance = balance;
    }
}
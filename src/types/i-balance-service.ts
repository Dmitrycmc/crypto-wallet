import { Balance } from '../entities';

export interface IBalanceService {
    getBalance(address: string): Promise<{address: string, balance: Balance}>,
}
import { IError } from './i-error';

export class InvalidAddress extends Error implements IError {
    statusCode = 400;
    statusMessage: string;

    constructor(address: string) {
        super();
        this.statusMessage = `Invalid address: ${address}`;
    }
}
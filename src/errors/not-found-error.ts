import { IError } from './i-error';

export class NotFoundError extends Error implements IError {
    statusCode = 404;
    statusMessage: string;

    constructor(id: number) {
        super();
        this.statusMessage = `Not found wallet with id: ${id}`;
    }
}
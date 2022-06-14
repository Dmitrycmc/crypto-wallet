import { IError } from './i-error';

export class DataBaseUnavailable extends Error implements IError {
    statusCode = 500;
    statusMessage = "DataBase unavailable";
}
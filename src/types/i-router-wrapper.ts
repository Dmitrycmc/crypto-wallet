import { Router } from 'express';

export interface IRouterWrapper {
    getRouter(): Router;
}
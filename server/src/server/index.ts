import express, { Express } from 'express';
import cors from 'cors';
import urlRoutes from '../routes';

export const server: Express = express();
server.use(express.json());
server.use(cors());
server.use(urlRoutes);

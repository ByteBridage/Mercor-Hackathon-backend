import express, { Application, Request, Response, NextFunction } from 'express';
import { SetupSystem } from './config/initialiser.setup';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import * as initialisers from "./initialisers"
import * as dotenv from "dotenv"
import cors from "cors"

dotenv.config();

// Create an instance of the Express application
const app: Application = express();

//Init Prisma Client
const prisma = new PrismaClient();

// Configuring Initialisers
let initialiserMethods = Object.values(initialisers);
for (let module of initialiserMethods) {
    SetupSystem.AddInitialiser(module);
}

// Middleware setup
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route Setup
app.use('/auth', authRoutes);

// Error Handline
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Load controllers


// Start the server
app.listen(3000, async () => {
    await SetupSystem.initialise()
    console.log('Server started on port 3000');
});
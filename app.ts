import express, { Application } from 'express';
import { SetupSystem } from './config/initialiser.setup';
import * as initialisers from "./initialisers"
import * as dotenv from "dotenv"
import cors from "cors"

dotenv.config();

// Create an instance of the Express application
const app: Application = express();

// Configuring Initialisers
let initialiserMethods = Object.values(initialisers);
for (let module of initialiserMethods) {
    SetupSystem.AddInitialiser(module);
}

// Middleware setup
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Load controllers


// Start the server
app.listen(3000, async () => {
    await SetupSystem.initialise()
    console.log('Server started on port 3000');
});
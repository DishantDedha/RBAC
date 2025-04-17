import express from "express";
import cors from "cors";
import connectToDatabase from "./config/connectToDatabase.js";

import routes from "./routes/routes.js";

const app=express();


app.use(cors());

app.use(express.json());

app.use('/api',routes);



connectToDatabase();



export default app;
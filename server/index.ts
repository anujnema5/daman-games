import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import router from "./router/router";
import { ApiError } from "./utils/api.error";

dotenv.config();

const app: Express = express();

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, HEAD, PUT, PATCH, DELETE',
    credentials: true
}))

const port = process.env.PORT || 8000;

app.use(router)

// ERROR MIDDLWARE
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    return res.status(err.statusCode || 500).json(new ApiError(err.statusCode, err.message))
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
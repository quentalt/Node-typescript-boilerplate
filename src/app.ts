import express from 'express';
import strongErrorHandler from 'strong-error-handler';
import {json} from 'body-parser';
import {userRouterFactory} from "./routes/userRoutes";
import cors from 'cors';


export const app = express();

app.use(json());

app.use(cors())

app.use(userRouterFactory());

app.use(strongErrorHandler({
    debug: true,
}));

import cors from 'cors';
import dotenv from 'dotenv';
import express, {json} from 'express';
import "express-async-errors";
import { handleErrorMiddleware } from './middlewares/handleErrorMiddleware.js';
import router from './routers/routes.js';

dotenv.config();

const app=express();

app.use(json());
app.use(cors());
app.use(router);
app.use(handleErrorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Running on ${port}`);
});
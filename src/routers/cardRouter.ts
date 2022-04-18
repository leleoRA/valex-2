import { Router } from "express";
import * as cardController from '../controllers/cardController.js';
import { validateAPImiddleware } from "../middlewares/validateAPImiddleware.js";

const cardRouter=Router();

cardRouter.post('/createcard',validateAPImiddleware,cardController.createCard);

export default cardRouter;
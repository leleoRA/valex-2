import { Request, Response } from "express";
import * as cardService from '../services/cardService.js';
import joi from "joi";

const cardSchema= joi.object({
      employeeId:joi.number().required(),
      cardholderName:joi.string().required(),     
      password:joi.string(),
      isVirtual:joi.boolean().required(),
      originalCardId:joi.number(),
      type:joi.string().valid('groceries','restaurants','transport','education').required(),
});

export async function createCard(req:Request, res:Response){
    const cardData=req.body;
    const validation = cardSchema.validate(cardData);
    if (validation.error) {
    return res.status(422).send(validation.error.message);
  }   
  await cardService.createCard(cardData);
  res.sendStatus(201);

}

export async function activateCard(req:Request, res:Response){
  const cardData=req.body;


}
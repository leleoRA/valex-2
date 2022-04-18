import { Request,Response,NextFunction } from "express";
import * as companyRepository from '../repositories/companyRepository.js';

export function validateAPImiddleware(req:Request,res:Response,next:NextFunction){
    const authorization = req.headers.authorization;

    const API = companyRepository.findByApiKey(authorization)
    
    if (!API) {
      return res.sendStatus(401);
    }
    next();  

}

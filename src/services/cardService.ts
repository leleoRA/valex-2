import * as cardRepository from '../repositories/cardRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import { TransactionTypes } from '../repositories/cardRepository.js';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

export async function createCard(cardData:cardRepository.CardInsertData){

    console.log("cardData",cardData);
    await checkSingleNumber(cardData.number,cardData.cardholderName,cardData.expirationDate);
    await searchForRegisteredEmployee(cardData.employeeId);
    await ensureOnlyOneTypeOfCard(cardData.type,cardData.employeeId);    
    
    const number = faker.finance.creditCardNumber('mastercard');
    const cardName = createCardName(cardData.cardholderName);
    const expirationDate = dayjs().add(5, 'years').format('MM/YY');
    const securityCode = faker.finance.creditCardCVV();

    const securityCodeHash:string = bcrypt.hashSync(securityCode, 10);
    const employeeId=cardData.employeeId

    

      
   await cardRepository.insert({ 
    employeeId,
    number: number,
    cardholderName: cardName,
    securityCode: securityCodeHash,
    expirationDate: expirationDate,
    password: cardData.password,
    isVirtual: cardData.isVirtual,
    originalCardId: cardData.originalCardId,
    isBlocked:false,
    type:cardData.type});
}
async function searchForRegisteredEmployee(employeeId:number){
    const existingEmployee = await employeeRepository.findById(employeeId);

    if(!existingEmployee)
    throw{type: "not found", message:"unregistered employee"}
}

async function checkSingleNumber(number:string,cardholderName:string,expirationDate:string){
    const existingCard = await cardRepository.findByCardDetails(number,cardholderName,expirationDate);

    if (existingCard)
    throw { type: "conflict", message: "card number already registered" };
}
async function ensureOnlyOneTypeOfCard(type:TransactionTypes,employeeId:number){
    const existingType = await cardRepository.findByTypeAndEmployeeId(type,employeeId);

    if(existingType)
    throw {type: "conflict", message: "user already registered for this type of card"}
    
}

function createCardName(cardholderName:string){
    const cardName = cardholderName.split(' ');
    const firstName = cardName.shift()+ ' ';
    const lastName= cardName.pop();

    const middleNames = cardName.filter((middleName)=>middleName.length>=3);

    let middleNameInitial = middleNames.map((initial)=>initial[0]).join(' ');

    if (middleNameInitial.length>0) middleNameInitial += ' ';

    const nameForCard = `${firstName}${middleNameInitial}${lastName}`;

    return nameForCard;

}



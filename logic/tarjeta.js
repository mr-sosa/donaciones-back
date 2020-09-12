const fetch = require('node-fetch');
const cors = require('cors');
const config = require('../config.json');
const ENDPOINT = config.test.endPoint;
const authorization = config.test.authorization;
const acountID = config.test.acountID;

ref = 0;

exports.createCard = function createCard(id, number, name, document, expMonth, expYear, type, addressline1, addressline2, addressline3, addresscity, addressstate, addresscountry, addresspostalCode, addressphone){
    console.log("Creating card");
    ++ref;
    
    let formBody = {
        "number": number,
        "name": name,
        "document": document,
        "expMonth": expMonth,
        "expYear": expYear,
        "type": type,
        "address": {
            "line1": addressline1,
            "line2": addressline2,
            "line3": addressline3,
            "city": addresscity,
            "state": addressstate,
            "country": addresscountry,
            "postalCode": addresspostalCode,
            "phone": addressphone
        }
    }

    let fetchData = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization
        },
        body : formBody
    }
    
    console.log("Sending request to PayU");
    let PayU = await fetch(ENDPOINT+"/rest/v4.9/customers/"+ id +"/creditCards", fetchData);
    
    if(PayU.errors !== undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }

    return PayU.body.token;
    
}

exports.updateCard = function updateCard(number, name, document, expMonth, expYear, type, addressline1, addressline2, addressline3, addresscity, addressstate, addresscountry, addresspostalCode, addressphone, token){
    console.log("Updating Card");
    let formBody = {
        "number": number,
        "name": name,
        "document": document,
        "expMonth": expMonth,
        "expYear": expYear,
        "type": type,
        "address": {
            "line1": addressline1,
            "line2": addressline2,
            "line3": addressline3,
            "city": addresscity,
            "state": addressstate,
            "country": addresscountry,
            "postalCode": addresspostalCode,
            "phone": addressphone
        }
    }
    let fetchData = {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization
        },
        body : formBody
    }
    
    console.log("Sending request to PayU");
    let PayU = await fetch(ENDPOINT+"/rest/v4.9/creditCards/"+token, fetchData);
    
    if(PayU.errors !== undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }

    return PayU.body.token;   
}

exports.getCard = function getCard(token){
    console.log("Consulting card");

    let fetchData = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization
        }
    }
    
    console.log("Sending request to PayU");
    let PayU = await fetch(ENDPOINT+"/rest/v4.9/creditCards/"+token, fetchData);

    if(PayU.errors !== undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }

}

exports.deleteCard = function deleteCard(id, token){
    console.log("Deleting card");

    let fetchData = {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization
        }
    }
    
    console.log("Sending request to PayU");
    let PayU = await fetch(ENDPOINT+"/rest/v4.9/customers/"+ id +"/creditCards/"+token, fetchData);

    if(PayU.errors !== undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }
}
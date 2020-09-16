const fetch = require('node-fetch');
const cors = require('cors');
const config = require('../config.json');
const ENDPOINT = config.production.endPoint;
const authorization = config.production.authorization;

ref = 0;

exports.createCard = async function createCard(clienteId, number, name, document, expMonth, expYear, type, addressline1, addressline2, addressline3, addresscity, addressstate, addresscountry, addresspostalCode, addressphone){
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
    };

    let fetchData = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization,
            "Accept": "application/json",
            "Accept-language": "es",
            "Host": "sandbox.api.payulatam.com"
        },
        body : JSON.stringify(formBody)

    };
    
    console.log("Sending request to PayU");
    let payU = await fetch(ENDPOINT+"rest/v4.9/customers/"+ clienteId +"/creditCards", fetchData);
    
    let status = payU.status;
    payU = await payU.json();

    if(status === 201) return payU.token;
    
    console.log('PAYU CREATE CARD STATUS: ', status );
    console.log("ERROR WHILE CREATING CARD: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
    
}

exports.updateCard = async function updateCard(token, number, name, document, expMonth, expYear, type, addressline1, addressline2, addressline3, addresscity, addressstate, addresscountry, addresspostalCode, addressphone){

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
    };
    
    let fetchData = {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
            "Authorization": authorization,
            "Accept": "application/json",
            "Accept-language": "es",
            "Host": "sandbox.api.payulatam.com"
        },
        body : JSON.stringify(formBody)
    };
    
    console.log("Sending request to PayU");
    let payU = await fetch(ENDPOINT+"rest/v4.9/creditCards/"+ token, fetchData);
    
    let status = payU.status;
    payU = await payU.json();

    if(status === 201) return payU;
    
    console.log('PAYU UPDATE CARD STATUS: ', status );
    console.log("ERROR WHILE UPDATE CARD: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
       
}

exports.getCard = async function getCard(token){
    console.log("Consulting card: " + token );

    let fetchData = {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": authorization,
            "Accept": "application/json",
            "Accept-language": "es",
            "Host": "sandbox.api.payulatam.com"
        }
    };
    
    console.log("Sending request to PayU");
    let payU = await fetch(ENDPOINT+"rest/v4.9/creditCards/"+token, fetchData);

    let status = payU.status;
    payU = await payU.json();

    if(status === 200) return payU;
    console.log('PAYU GET CARD STATUS: ', status );
    console.log("ERROR WHILE GETTING CARD: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
    
}

exports.deleteCard = async function deleteCard(clienteId, token){
    console.log("Deleting card: " + token);

    let fetchData = {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Authorization": authorization,
            "Accept": "application/json",
            "Accept-language": "es",
            "Host": "sandbox.api.payulatam.com"
        }
    };
    
    console.log("Sending request to PayU");
    let payU = await fetch(ENDPOINT+"rest/v4.9/customers/"+ clienteId +"/creditCards/"+token, fetchData);
    
    let status = payU.status;

    if(status === 200) return status;

    payU = await payU.json()
    console.log('PAYU DELETE CARD STATUS: ', status );
    console.log("ERROR WHILE DELETING CARD: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
}
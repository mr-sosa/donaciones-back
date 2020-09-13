const fetch = require('node-fetch');
const cors = require('cors');
const config = require('../config.json');
const ENDPOINT = config.test.endPoint;
const authorization = config.test.authorization;
const acountID = config.test.acountID;

let ref = 0;

exports.createSubscription = async function createSubscription(planCode, clienteId, cardToken){
    console.log("Creating subscription");
    ++ref;

    let formBody = {
        "quantity": 1,
        "installments": 1,
        "trialDays": 0,
        "customer": {
            "id": clienteId,
            "creditCards": [
                {
                "token": cardToken
                }
            ]
        },
        "plan": {
            "planCode": planCode
        }
    };

    let fetchData = {
        method: 'POST',
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
    let payU = await fetch(ENDPOINT+"rest/v4.9/subscriptions/", fetchData);
    
    let status = payU.status;
    payU = await payU.json();
    if(status === 201) return payU.id;
    
    console.log('PAYU CREATE SUBSCRIPTION STATUS: ', status );
    console.log("ERROR WHILE CREATING SUSCRIPTION: ", payU.description);
    return "ERROR_ " + payU.description;

}

exports.updateSubscription = async function updateSubscription(idSub, cardToken, line1, line2, line3, postalCode, city, state, country, phone){

    let formBody = {
        "creditCardToken": cardToken,
        "deliveryAddress": {
            "line1": line1,
            "line2": line2,
            "line3": line3,
            "postalCode": postalCode,
            "city": city,
            "state": state,
            "country": country,
            "phone": phone
        }
    };

    let fechData = {
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
    let payU = await fetch(ENDPOINT+"rest/v4.9/subscriptions/"+ idSub , fetchData);

    let status = payU.status;
    payU = await payU.json();

    if(status === 200) return payU;
    
    console.log('PAYU UPDATE SUBSCRIPTION STATUS: ', status );
    console.log("ERROR WHILE UPDATE SUBSCRIPTION: ", payU.description);
    return "ERROR_ " + payU.description; 
}

exports.getSubscription = async function getSubscription(idSub){
    console.log("Consulting subscription: " + idSub);

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
    let payU = await fetch(ENDPOINT+"rest/v4.9/subscriptions/"+idSub, fetchData);

    let status = payU.status;
    payU = await payU.json();
   
    if(status === 200) return payU;

    console.log('PAYU GET SUBSCRIPTION STATUS: ', status );
    console.log("ERROR WHILE GETTING SUBSCRIPTION: ", payU.description);
    return "ERROR_ " + payU.description; 
}

exports.deleteSubscription = async function deleteSubscription(idSub){
    console.log("Deleting Subscription: " + idSub);

    let fetchData = {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Authorization": authorization,
            "Accept": "application/json",
            "Accept-language": "es",
            "Host": "sandbox.api.payulatam.com"
        }
    }
    
    console.log("Sending request to PayU");
    let payU = await fetch(ENDPOINT+"rest/v4.9/subscriptions/"+idSub, fetchData);

    let status = payU.status;

    if(status === 200) return status;

    payU = await payU.json()
    console.log('PAYU DELETE SUBSCRIPTION STATUS: ', status );
    console.log("ERROR WHILE DELETING SUBSCRIPTION: ", payU.description);
    return "ERROR_ " + payU.description;

}
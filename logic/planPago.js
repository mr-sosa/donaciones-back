const fetch = require('node-fetch');
const cors = require('cors');
const config = require('../config.json');
const ENDPOINT = config.production.endPoint;
const authorization = config.production.authorization;
const acountID = config.production.acountID;

let ref = 0;

exports.createPlanPago = async function createPlanPago(amount, nMonth){
    console.log("Creating PlanPago");
    ++ref;
    let ran = parseInt(Math.random()*100000000);

    //          Para el PlanCode --->
    // <N> = número continuo de pago sin que se reinicie la app 
    // <E> = número aleatorio para que sea único la referencia del plan de pago sin importar si se reinicia la app
    let planCode = "Plan-Pago-N"+ref+"-E"+ ran; 
    let description = "Plan Pago N"+ref+" E"+ ran;

    let formBody = {
        "accountId": acountID,
        "planCode": planCode,
        "description": description,
        "interval": "MONTH",
        "intervalCount": "1",
        "maxPaymentsAllowed": nMonth,
        "maxPaymentAttempts": "3",
        "paymentAttemptsDelay": "1",
        "additionalValues": [
            {
                "name": "PLAN_VALUE",
                "value": amount,
                "currency": "COP"
            },
            {
               "name": "PLAN_TAX",
               "value": "0",
               "currency": "COP"
            },
            {
               "name": "PLAN_TAX_RETURN_BASE",
               "value": "0",
               "currency": "COP"
            }
        ]
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
    let payU = await fetch(ENDPOINT+"rest/v4.9/plans", fetchData);
    
    let status = payU.status;
    payU = await payU.json();

    if(status === 201) return payU.planCode;
    
    console.log('PAYU CREATE PLANPAGO STATUS: ', status );
    console.log("ERROR WHILE CREATING PLANPAGO: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;

}

exports.getPlanPago = async function getPlanPago(planCode){
    console.log("Getting PlanPago: " + planCode);
    let fetchData = {
        method: 'GET',
        mode: "cors",
        headers: {
            "Authorization": authorization,
            "Accept": "application/json",
            "Accept-language": "es",
            "Host": "sandbox.api.payulatam.com"
        }
    };
    console.log("Sending request to PayU");
    let payU = await fetch(ENDPOINT+"rest/v4.9/plans/" + planCode, fetchData);

    let status = payU.status;
    payU = await payU.json();

    if(status === 200) return payU;
    console.log('PAYU GET PLANPAGO STATUS: ', status );
    console.log("ERROR WHILE GETTING PLANPAGO: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
}

exports.updatePlanPago = async function updatePlanPago(planCode, description, nMonth, amount){
    let formBody = {
        "accountId": acountID,
        "planCode": planCode,
        "description": description,
        "interval": "MONTH",
        "intervalCount": "1",
        "maxPaymentsAllowed": nMonth,
        "maxPaymentAttempts": "3",
        "paymentAttemptsDelay": "1",
        "additionalValues": [
            {
                "name": "PLAN_VALUE",
                "value": amount,
                "currency": "COP"
            },
            {
               "name": "PLAN_TAX",
               "value": "0",
               "currency": "COP"
            },
            {
               "name": "PLAN_TAX_RETURN_BASE",
               "value": "0",
               "currency": "COP"
            }
        ]
    };

    let fetchData = {
        method: 'PUT',
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
    let payU = await fetch(ENDPOINT+"rest/v4.9/plans", fetchData);
    
    let status = payU.status;
    payU = await payU.json();

    if(status === 201) return payU.planCode;
    
    console.log('PAYU CREATE PLANPAGO STATUS: ', status );
    console.log("ERROR WHILE CREATING PLANPAGO: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
}

exports.deletePlanPago = async function deletePlanPago(planCode){
    console.log("Deleting PlanPago: " + planCode);
    let fetchData = {
        method: 'DELETE',
        mode: "cors",
        headers: {
            "Authorization": authorization,
            "Accept": "application/json",
            "Accept-language": "es",
            "Host": "sandbox.api.payulatam.com"
        }
    };
    console.log("Sending request to PayU");
    let payU = await fetch(ENDPOINT+"rest/v4.9/plans/" + planCode, fetchData);

    let status = payU.status;

    if(status === 200) return status;

    payU = await payU.json()
    console.log('PAYU DELETE PLANPAGO STATUS: ', status );
    console.log("ERROR WHILE DELETING PLANPAGO: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
}
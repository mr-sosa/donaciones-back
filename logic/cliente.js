const fetch = require('node-fetch');
const cors = require('cors');
const config = require('../config.json');
const ENDPOINT = config.production.endPoint;
const authorization = config.production.authorization;

let ref = 0;

exports.createClient = async function createClient(fullname, email){
    console.log("Creating client");
    ++ref;

    var crypto = require("crypto"); 
    var id = crypto.randomBytes(20).toString('hex');
    
    let formBody = {
        "fullName": fullname, 
        "email": email
    };

    let fetchData = {
        method: "POST",
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
    let payU = await fetch(ENDPOINT+"rest/v4.9/customers/", fetchData);
    
    let status = payU.status;
    payU = await payU.json();

    if(status === 201) return payU.id;
    
    console.log('PAYU CREATE CLIENT STATUS: ', status );
    console.log("ERROR WHILE CREATING CLIENT: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
}

exports.updateClient = async function updateClient(id, fullname, email){

    let formBody = {
        "fullName": fullname, 
        "email": email
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
    let payU = await fetch(ENDPOINT+"rest/v4.9/customers/"+id, fetchData);

    let status = payU.status;
    payU = await payU.json();

    if(status === 200) return payU;
    
    console.log('PAYU UPDATE CLIENT STATUS: ', status );
    console.log("ERROR WHILE UPDATE CLIENT: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
}

exports.getClient = async function getClient(id){
    console.log("Consulting client: " + id);

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
    let payU = await fetch(ENDPOINT+"rest/v4.9/customers/"+ id, fetchData);

    let status = payU.status;
    payU = await payU.json();
   
    if(status === 200) return payU;

    console.log('PAYU GET CLIENT STATUS: ', status );
    console.log("ERROR WHILE GETTING CLIENT: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
}

exports.deleteClient = async function deleteClient(id){
    console.log("Deleting client: " + id);

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
    let payU = await fetch(ENDPOINT+"rest/v4.9/customers/" + id, fetchData);

    let status = payU.status;

    if(status === 200) return status;

    payU = await payU.json()
    console.log('PAYU DELETE CLIENT STATUS: ', status );
    console.log("ERROR WHILE DELETING CLIENT: ", payU.description);
    return "ERROR_" + status + "_" + payU.description;
}
const fetch = require('node-fetch');
const cors = require('cors');
const config = require('../config.json');
const ENDPOINT = config.test.endPoint;
const authorization = config.test.authorization;
const acountID = config.test.acountID;

let ref = 0;

exports.createClient = function createClient(fullname, email){
    console.log("Creating client");
    ++ref;
    var crypto = require("crypto"); 
    var id = crypto.randomBytes(20).toString('hex');
    let formBody = {
        "fullname": fullname, 
        "email": email
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
    let PayU = await fetch(ENDPOINT+"/rest/v4.9/customers/", fetchData);
    
    if(PayU.errors !== undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }

    return PayU.body.id;
}

exports.updateClient = function updateClient(fullname, email, id){
    console.log("Updating client");
    let formBody = {
        "fullname": fullname, 
        "email": email
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
    let PayU = await fetch(ENDPOINT+"/rest/v4.9/customers/"+id, fetchData);

    if(PayU.errors !== undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }

    return PayU.body.id;
}

exports.getClient = function getClient(id){
    console.log("Consulting client");

    let fetchData = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization
        }
    }
    
    console.log("Sending request to PayU");
    let PayU = await fetch(ENDPOINT+"/rest/v4.9/customers/"+ id, fetchData);

    if(PayU.errors !== undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }
}

exports.deleteClient = function deleteClient(id){
    console.log("Deleting client");

    let fetchData = {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authorization
        }
    }
    
    console.log("Sending request to PayU");
    let PayU = await fetch(ENDPOINT+"/rest/v4.9/customers/" + id, fetchData);

    if(PayU.errors !== undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }
}
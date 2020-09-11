const fetch = require('node-fetch');
const donation = require('./src/donation');

app.post("/CreateDonationLink", async (req, res) => {
    console.log("");
    const ENDPOINT = "https://checkout.payulatam.com/ppp-web-gateway-payu";
    let formBody = donation.createFormBody(req);
    console.log("Creating Donation Link")
    let fetchData = {
        method: 'POST',
        mode: "cors",
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        body : formBody
    }
    console.log("Sending request to PayU")
    let payU= await fetch(ENDPOINT, fetchData);
    if(payU.errors !==  undefined){
        console.log('PAYU CREATE STATUS: ', payU.status )
        console.log('ERROR WHILE CREATING LINK: ', payU.errors )
    }
    res.status(200).send(JSON.stringify({respuesta:payU.url}));
})
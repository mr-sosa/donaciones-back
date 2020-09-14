const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const conf = require('./config.json');
const cliente = require('./logic/cliente');
const plan = require('./logic/planPago');
const suscripcion = require('./logic/suscripcion');
const tarjeta = require('./logic/tarjeta');
const podio = require('./podio/podioClient');
const confPodio = conf.podio.appID;

const port = process.env.PORT || 2000;

//  Inicialización de la app
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Metodos de lectura de la app
app.post('/CreateDonation', async (req, res) => {

    //Conexión con API PayU
    let dataReq = req.body;

    let planCode = await plan.createPlanPago(dataReq.AmountForm.amount, dataReq.AmountForm.duration);
    if(planCode.startsWith('ERROR_')) {
        planCode = planCode.replace('ERROR_ ', '');
        res.status(400).send(JSON.stringify({"error": planCode}));
    }

    let clienteId = await cliente.createClient(dataReq.DonatorForm.fullNameClient, dataReq.DonatorForm.emailClient);
    if (clienteId.startsWith('ERROR_')){
        clienteId = clienteId.replace('ERROR_ ', '');
        res.status(400).send(JSON.stringify({"error": clienteId}));
    }

    let cardToken = await tarjeta.createCard(clienteId, dataReq.CardForm.cardNumber, dataReq.CardForm.cardOwner, 
                                            dataReq.CardForm.idOwnerNumber, dataReq.CardForm.expMonth, dataReq.CardForm.expYear,
                                            dataReq.CardForm.cardType, dataReq.CardForm.address, '', '', dataReq.CardForm.city, '', 
                                            dataReq.CardForm.country, '', dataReq.CardForm.phoneNumber);
    if (cardToken.startsWith('ERROR_')){
        cardToken = cardToken.replace('ERROR_ ', '');
        res.status(400).send(JSON.stringify({"error": cardToken}));
    }

    let subscriptionId = await suscripcion.createSubscription(planCode,clienteId,cardToken);
    if (subscriptionId.startsWith('ERROR_')){
        subscriptionId = subscriptionId.replace('ERROR_ ', '');
        res.status(400).send(JSON.stringify({"error": suscriptionID}));
    }

    //Conexión con API Podio
    let today = new Date();
    let dataPodio = {
        "fechaDonacion": today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate(),
        "nombre": dataReq.DonatorForm.fullNameClient,
        "documento": dataReq.DonatorForm.idNumberClient,
        "email": dataReq.DonatorForm.emailClient,
        "telefono": dataReq.CardForm.phoneNumber,
        "amount": dataReq.AmountForm.amount,
        "nPagos": dataReq.AmountForm.duration,
        "tokenID": cardToken,
        "clienteID": clienteId,
        "planID": planCode,
        "suscriptionID": subscriptionId
    }

    let resPodio = await podio.createDonationPodio(confPodio, dataPodio);
    if (resPodio === 200) res.status(201).send(JSON.stringify({"planCode": planCode,"id": clienteId, "token": cardToken, "subscriptionId": subscriptionId}));
    else{
        res.status(400).send(JSON.stringify({"error": resPodio}));
    }
       
});

app.delete('/DeleteDonation', async (req, res) => {
    /* let subscription = await suscripcion.deleteSubscription("123456878");
    if (subscription != 200){
        let x = subscription.split("_");
        res.status(400).send(JSON.stringify({"ERROR": subscription, "description": x[1]}));
    } */
    
    /* let card = await tarjeta.deleteCard("112345652", "13454687");
    if (card != 200){
        let x = card.split("_");
        res.status(400).send(JSON.stringify({"ERROR": card, "description": x[1]}));
    } */
    
    /* let client = await cliente.deleteClient("123454879541");
    if (client != 200){
        let x = client.split("_");
        res.status(400).send(JSON.stringify({"ERROR": client, "description": x[1]}));
    } */
    
    /* let planP = await plan.deletePlanPago("12457865484644");
    if (planP != 200){
        let x = planP.split("_");
        res.status(400).send(JSON.stringify({"ERROR": planP, "description": x[1]}));
    } */
})


// Confirmación por consola que corre la app
app.listen(port, () => {
    console.log(`RUNNING IN PORT ${port}`);
});
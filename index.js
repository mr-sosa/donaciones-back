const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const cliente = require('./logic/cliente');
const plan = require('./logic/planPago');
const suscripcion = require('./logic/suscripcion');
const tarjeta = require('./logic/tarjeta');

const port = process.env.PORT || 2000;

//  Inicialización de la app
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Metodos de lectura de la app
app.get('/CreateDonation', async (req, res) => {
    let planCode = await plan.createPlanPago(11000, 3);
    let clienteId = await cliente.createClient("Andrea Gomez", "andre@aiesec.net");
    let cardToken = await tarjeta.createCard(clienteId, 5476254935288131, "Benito Taibo", "78945641", 8, 24, "MASTERCARD", "calle falsa 1", "Calle falsa 2", "Calle falsa 3", "Bogota", "Cundinamarca", "CO", "57", "2154");
    let subscriptionId = await suscripcion.createSubscription(planCode,clienteId,cardToken);
    res.status(200).send(JSON.stringify({"planCode": planCode,"id": clienteId, "token": cardToken, "subscriptionId": subscriptionId}));
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
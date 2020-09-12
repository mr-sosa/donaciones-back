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
    let planCode = await plan.createPlanPago(10000, 3);
    res.status(200).send(JSON.stringify(planCode));
});

// Confirmación por consola que corre la app
app.listen(port, () => {
    console.log(`RUNNING IN PORT ${port}`);
});
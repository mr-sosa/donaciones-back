const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const port = process.env.PORT || 2000;

//  Inicialización de la app
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Metodos de lectura de la app

// Confirmación por consola que corre la app
app.listen(port, () => {
    console.log(`RUNNING IN PORT ${port}`);
});
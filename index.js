const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnnection } = require('./db/config');

// crear el server express
const app = express();

// database
dbConnnection();

// CORS
app.use( cors() );

// Directorio publico
app.use( express.static('public') );

// Body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Running on port ${ process.env.PORT }`);
});
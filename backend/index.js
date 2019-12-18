const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const server = express();

const { pool } = require('./conexion');

//settings
server.set('port', process.env.PORT || 3000);

//middleware
server.use(morgan('dev'));
server.use(express.json());
server.use(cors({ origin: 'http://localhost:4200' }));

//routes
server.use('/api/estudiante/', require('./routes/estudiante.routes'));
server.use('/api/materia/', require('./routes/materia.routes'));
server.use('/api/grupo/', require('./routes/grupo.routes'));
server.use('/api/clase/', require('./routes/clase.routes'));

//start server
server.listen(server.get('port'), () => {
    console.log('Server running ...');
});
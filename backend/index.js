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
server.use('/api/profesor/', require('./routes/profesor.route'));
server.use('/api/materia/', require('./routes/materia.routes'));
server.use('/api/grupo/', require('./routes/grupo.routes'));
server.use('/api/detalleGrupo/', require('./routes/detalleGrupo.routes'));
server.use('/api/criterio/', require('./routes/criterio.routes'));
server.use('/api/email', require('./routes/email.routes'));
server.use('/api/asistencia', require('./routes/asistencia.routes'));

//start server
server.listen(server.get('port'), () => {
    console.log('Server running ...');
});
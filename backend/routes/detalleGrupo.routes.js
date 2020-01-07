const express = require('express');
const Router = express.Router();

const detalleGrupo = require('../controller/detalleGrupo.controller');

Router.get('/', detalleGrupo.getGrupos);
Router.get('/:id_grupo', detalleGrupo.getGrupo);
Router.get('/:clave_profesor/:num_control', detalleGrupo.getEstudiante);
Router.get('/:clave_profesor/:id_grupo/:clave_materia', detalleGrupo.getEstudiantes);
Router.post('/', detalleGrupo.addEstudiante)

module.exports = Router;
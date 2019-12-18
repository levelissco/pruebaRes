const express = require('express');
const Router = express.Router();

const clase = require('../controller/clase.controller');

Router.get('/', clase.getClases);
Router.get('/:clave_profesor/:num_control', clase.findEstudiante);
Router.get('/:clave_profesor/:clave_materia/:clave_grupo', clase.getClasesProfesorMateriaGrupo);
Router.post('/', clase.createClase);

module.exports = Router;
const express = require('express');
const Router = express.Router();

const materia = require('../controller/materia.controller');

Router.get('/:clave_materia', materia.getMateria);
Router.get('/', materia.getMaterias);

module.exports = Router;
const express = require('express');
const Router = express.Router();

const profesor = require('../controller/profesor.controller');

Router.get('/:clave_profesor', profesor.getProfesor);
Router.get('/', profesor.getProfesores);
Router.post('/', profesor.createProfesor);

module.exports = Router;
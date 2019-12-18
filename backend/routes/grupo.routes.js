const express = require('express');
const Router = express.Router();

const grupo = require('../controller/grupo.controller');

Router.get('/:clave_profesor', grupo.getMateriasProfe);
Router.get('/:clave_profesor', grupo.getMateriasProfeDistintas)
Router.get('/:clave_profesor/:clave_materia', grupo.getGrupos);
Router.get('/:clave_profesor/:clave_materia/:clave_grupo', grupo.getGrupo);
Router.post('/', grupo.createGrupo);

module.exports = Router;
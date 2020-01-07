const express = require('express');
const Router = express.Router();

const criterio = require('../controller/criterio.controller');

Router.get('/:id_grupo', criterio.getCriterios);
Router.get('/:id_grupo/:unidad', criterio.getCriteriosByUnidad);
Router.post('/', criterio.createCriterio);
Router.delete('/:id_criterio', criterio.deleteCriterio);

module.exports = Router;
const express = require('express');
const Router = express.Router();

const asistencia = require('../controller/asistencia.controller');

Router.get('/', asistencia.getAllAsistencias);
Router.get('/:id_grupo', asistencia.getByGrupo);
Router.get('/:id_grupo/asistieron', asistencia.getAllAsistieronByGrupo);
Router.get('/:id_grupo/faltaron', asistencia.getAllFaltaronByGrupo);
Router.get('/:id_grupo/asistieron/:num_unidad', asistencia.getAllAsistieronByGrupoByUnidad);
Router.get('/:id_grupo/faltaron/:num_unidad', asistencia.getAllFaltaronByGrupoByUnidad);
Router.get('/:id_grupo/:num_unidad', asistencia.getByGrupoAndUnidad);
Router.post('/', asistencia.createAsistencia);

module.exports = Router;
const conexion = require('../conexion');
const asistenciaCtrl = {};

asistenciaCtrl.getAllAsistencias = (req, res) => {
    const consulta = 'select num_control, nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getByGrupo = (req, res) => {
    const { id_grupo } = req.params;
    const params = [id_grupo];
    const consulta = 'select num_control, nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo =  ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Asistencia: linea:' + 22 + ' Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getByGrupoAndUnidad = (req, res) => {
    const { id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad];
    const consulta = 'select num_control, nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and num_unidad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllAsistieronByGrupo = (req, res) => {
    const { id_grupo } = req.params;
    const params = [id_grupo];
    const consulta = 'select num_control, nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and asistencia = true';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllAsistieronByGrupoByUnidad = (req, res) => {
    const { id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad];
    const consulta = 'select num_control, nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and asistencia = true and num_unidad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllFaltaronByGrupo = (req, res) => {
    const { id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad];
    const consulta = 'select num_control, nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and asistencia = false';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllFaltaronByGrupoByUnidad = (req, res) => {
    const { id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad];
    const consulta = 'select num_control, nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and asistencia = false and num_unidad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.createAsistencia = (req, res) => {
    const date = new Date();
    const fecha = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const { id_detalle, asistencia, num_unidad } = req.body;
    const params = [id_detalle, fecha, asistencia, num_unidad];
    const consulta = 'insert into lista  values (?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se registro asistencia' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = asistenciaCtrl;
const conexion = require('../conexion');
const estudianteCtrl = {};

estudianteCtrl.getEstudiante = (req, res) => {
    const num_control = req.params.num_control;
    const consulta = 'select * from estudiante where num_control = ?';
    conexion.query(consulta, [num_control], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

estudianteCtrl.getEstudiantes = (req, res) => {
    const consulta = 'select * from estudiante';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Estudiantes: Ocurrio un error: ' + err);
        }
    });
}

estudianteCtrl.createEstudiante = (req, res) => {
    const { num_control, nombre, password } = req.body;
    const params = [num_control, nombre, password];
    console.log(params);
    const consulta = 'insert into estudiante (num_control, nombre_est, password_est) values (?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se agrego nuevo estudiante' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = estudianteCtrl;
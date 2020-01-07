const conexion = require('../conexion');
const profesorCtrl = {};

profesorCtrl.getProfesor = (req, res) => {
    const clave_profesor = req.params.clave_profesor;
    const consulta = 'select * from profesor where clave_profesor = ?';
    conexion.query(consulta, [clave_profesor], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

profesorCtrl.getProfesores = (req, res) => {
    const consulta = 'select * from profesor';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

profesorCtrl.createProfesor = (req, res) => {
    const { clave_profesor, nombre, apellido, email, password } = req.body;
    const params = [clave_profesor, nombre, apellido, email, password];
    const consulta = 'insert into profesor values (?, ?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se agrego nuevo profesor' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = profesorCtrl;
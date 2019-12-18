const conexion = require('../conexion');
const materiaCtrl = {};

materiaCtrl.getMateria = async(req, res) => {
    const clave_materia = req.params.clave_materia;
    const consulta = 'select * from materia where clave_materia = ?';
    conexion.query(consulta, [clave_materia], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

materiaCtrl.getMaterias = async(req, res) => {
    const consulta = 'select * from materia';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = materiaCtrl;
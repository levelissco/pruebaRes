const conexion = require('../conexion');
const claseCtrl = {};

claseCtrl.getClases = (req, res) => {
    const consulta = 'select * from materia natural join grupo natural join clase';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
claseCtrl.findEstudiante = (req, res) => {
    const { clave_profesor, num_control } = req.params;
    const params = [clave_profesor, num_control];
    const consulta = 'select * from grupo natural join clase natural join estudiante where clave_profesor= ? and num_control= ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
claseCtrl.getClasesProfesorMateriaGrupo = (req, res) => {
    const { clave_profesor, clave_materia, clave_grupo } = req.params;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const consulta = 'select * from grupo natural join clase natural join estudiante where clave_profesor= ? and clave_materia = ? and clave_grupo = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
claseCtrl.createClase = (req, res) => {
    const { clave_materia, clave_grupo, num_control } = req.body;
    const params = [clave_materia, clave_grupo, num_control];
    const consulta = 'insert into clase values (?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se agrego nuevo estudiante a clase' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = claseCtrl;
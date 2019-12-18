const conexion = require('../conexion');
const grupoCtrl = {};

grupoCtrl.getMateriasProfe = (req, res) => {
    const clave_profesor = req.params.clave_profesor;
    const consulta = 'select * from materia natural join grupo where clave_profesor = ? order by nombre_materia';
    conexion.query(consulta, [clave_profesor], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
grupoCtrl.getMateriasProfeDistintas = (req, res) => {
    const clave_profesor = req.params.clave_profesor;
    const consulta = 'select distinct nombre_materia, clave_materia from materia natural join grupo where clave_profesor = ? order by nombre_materia';
    conexion.query(consulta, [clave_profesor], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

grupoCtrl.getGrupos = (req, res) => {
    const clave_profesor = req.params.clave_profesor;
    const clave_materia = req.params.clave_materia;
    const params = [clave_profesor, clave_materia];
    const consulta = 'select * from grupo natural join materia where clave_profesor = ? and clave_materia = ? order by nombre_materia';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

grupoCtrl.getGrupo = (req, res) => {
    const clave_profesor = req.params.clave_profesor;
    const clave_materia = req.params.clave_materia;
    const clave_grupo = req.params.clave_grupo;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const consulta = 'select * from grupo natural join materia where clave_profesor = ? and clave_materia = ? and clave_grupo = ? order by nombre_materia';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

grupoCtrl.createGrupo = (req, res) => {
    const { clave_materia, clave_grupo, clave_profesor, hora_inicio, hora_final } = req.body;
    const params = [clave_materia, clave_grupo, clave_profesor, hora_inicio, hora_final];
    const consulta = 'insert into grupo values (?, ?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se creo nuevo grupo' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = grupoCtrl;
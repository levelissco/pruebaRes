create table profesor(
    clave_profesor varchar(8) primary key,
    nombre varchar(30) not null,
    ap_paterno varchar(15) not null,
    ap_materno varchar(15)
);

create table estudiante(
    num_control int primary key,
    nombre varchar(30) not null,
    ap_paterno varchar(15) not null,
    ap_materno varchar(15)
);

create table materia(
    nombre_materia varchar(30) not null,
    num_unidades int not null,
    clave_materia varchar(7) not null primary key
);

create table grupo(
    id_grupo int not null primary key,
    clave_grupo varchar(3) not null,
    clave_materia varchar(10) not null references materia(clave_materia),
    clave_profesor int not null references profesor(clave_profesor),
	hora_inicio time,
	hora_final time
);

create table unidad(
    id_unidad int not null primary key,
    clave_materia varchar(10) not null references materia(clave_materia),
    num_unidad int not null,
    nombre_unidad varchar(40)
);

create table criterio(
    id_criterio int not null primary key,
	num_criterio int not null,
	nombre_criterio varchar(20) not null,
	porcentaje int,
    id_unidad int not null references unidad(id_unidad),
    id_grupo int not null references grupo(id_grupo)
);

create table actividad(
    id_actividad int not null primary key,
	nombre_subcriterio varchar(20),
    descripcion varchar(500),
    id_criterio int not null references criterio(id_criterio)
);

create table detalle_estudiante(
    num_control int not null references estudiante(num_control),
    id_grupo int not null references grupo(id_grupo),
    asistencia boolean,
    fecha date
);

create table detalle_calificaciones(
    num_control int not null references estudiante(num_control),
    id_actividad int not null references actividad(id_actividad),
    calificacion int
);
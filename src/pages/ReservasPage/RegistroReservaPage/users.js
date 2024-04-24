const users = [
  {
    id_usuario: 2,
    nombre_usuario: 'CARLA SALAZAR SERRUDO',
    contrasenia_usuario: '12345678',
    email_usuario: 'carlaserrudo@gmail.com',
    tipo_usuario: 'DOCENTE',
    codsiss: 202400001,
    disponible: true,
    materia_grupo: [
      {
        id_aux_grupo: 8,
        id_grupo: 1,
        nombre_grupo: 'G1',
        nombre_materia: 'METODOS TECNICAS Y TALLER DE PROGRAMACION',
        cantidad_est: 83,
      },
      {
        id_aux_grupo: 4,
        id_grupo: 2,
        nombre_grupo: 'G4',
        nombre_materia: 'CIRCUITOS ELECTRONICOS',
        cantidad_est: 113,
      },
      {
        id_aux_grupo: 6,
        id_grupo: 3,
        nombre_grupo: 'G4',
        nombre_materia: 'BASE DE DATOS I',
        cantidad_est: 62,
      },
      {
        id_aux_grupo: 10,
        id_grupo: 5,
        nombre_grupo: 'G3',
        nombre_materia: 'FISICA GENERAL',
        cantidad_est: 64,
      },
      {
        id_aux_grupo: 1,
        id_grupo: 7,
        nombre_grupo: 'G4',
        nombre_materia: 'MATEMATICA DISCRETA',
        cantidad_est: 54,
      },
    ],
  },
  {
    id_usuario: 1,
    nombre_usuario: 'ADMINISTRADOR',
    contrasenia_usuario: 'abc12345',
    email_usuario: 'admin@gmail.com',
    tipo_usuario: 'ADMINISTRADOR',
    codsiss: 202400000,
    disponible: true,
    materia_grupo: [
      {
        id_aux_grupo: 11,
        id_grupo: 11,
        nombre_grupo: 'OTROS',
        nombre_materia: 'OTROS',
        cantidad_est: 100,
      },
    ],
  },
];

export default users;
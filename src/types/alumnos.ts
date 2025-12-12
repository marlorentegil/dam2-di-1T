export type Alumnos = {

    id: number;
    nombre: string;
    apellidos: string;
    grupo: string;
    anioNacimiento: number;
    estado: 'Activado' | 'Desactivado';

}

export type AlumnoCrear = {
    id?: number;
    nombre: string;
    apellidos: string;
    grupo: string;
    anioNacimiento: number;
    estado: string;
};


import type {APIError, APIResult} from "@/types/util";
import type {Alumnos} from "@/types/alumnos.ts";

const baseURL: string = "http://localhost:3000";


export async function listarAlumnos(): Promise<APIResult<Alumnos[]>> {
    const response = await fetch(`${baseURL}/api/alumnos/`, {
        method: 'GET',
    });
    if (response.ok) {
        const alumno: Alumnos[] = await response.json();
        return {ok: true, data: alumno};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}

export async function eliminarAlumno(id: number): Promise<APIResult<void>> {
    const response = await fetch(`${baseURL}/api/alumnos/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        return {ok: true};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}



export async function crearAlumno(request: Alumnos): Promise<APIResult<Alumnos>> {
    const response = await fetch(`${baseURL}/api/alumnos`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        },
    });
    if (response.ok) {
        const alumno: Alumnos = await response.json();
        return {ok: true, data: alumno};
    }
    const error: APIError = await response.json();
    return {ok: false, error: error};
}
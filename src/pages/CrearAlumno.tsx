import { crearAlumno } from "@/services/alumnosService";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Alumnos, AlumnoCrear } from "@/types/alumnos";

type AlumnosForm = {
    id?: number;
    nombre: string;
    apellidos: string;
    grupo: string;
    anioNacimiento: number;
    estado: 'Activado' | 'Desactivado';
}

const defaultAlumnosForm: AlumnosForm = {
    nombre: "",
    apellidos: "",
    grupo: "",
    anioNacimiento: new Date().getFullYear(),
    estado: 'Activado'
}

export default function CrearAlumno() {
    const [formData, setFormData] = useState<AlumnosForm>(defaultAlumnosForm);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Componente CrearAlumno montado");
        setFormData(defaultAlumnosForm);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === "anioNacimiento" ? Number(value) : value
        }));
    }


    const handleChangeNombre = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setFormData(prev => ({
            ...prev,
            nombre: value
        }));
    }

    const handleChangeApellidos = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setFormData(prev => ({
            ...prev,
            apellidos: value
        }));
    }




    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const response = await crearAlumno(formData);
            if (response.ok) {
                const alumno: Alumnos = response.data;
                navigate("/")
            } else {
                alert(response.error ?? 'Error desconocido');
            }
        } catch (err: any) {
            console.log(err);
        }
    };


    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Crear alumno</h1>

            <form className="space-y-4" onSubmit={handleSubmitForm}>
                <input
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
                    className="w-full border p-2 rounded"
                    value={formData.nombre}
                    onChange={handleChangeNombre}
                />

                <input
                    name="apellidos"
                    type="text"
                    placeholder="Apellidos"
                    className="w-full border p-2 rounded"
                    value={formData.apellidos}
                    onChange={handleChangeApellidos}
                />

                <input
                    name="grupo"
                    type="text"
                    placeholder="Grupo"
                    className="w-full border p-2 rounded"
                    value={formData.grupo}
                    onChange={handleChange}
                />

                <input
                    name="anioNacimiento"
                    type="number"
                    placeholder="Año de nacimiento"
                    className="w-full border p-2 rounded"
                    value={formData.anioNacimiento}
                    onChange={handleChange}
                />

                <select
                    name="estado"
                    className="w-full border p-2 rounded"
                    value={formData.estado}
                    onChange={handleChange}
                >
                    <option value="Activado">Activado</option>
                    <option value="Desactivado">Desactivado</option>
                </select>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-sky-600 text-white w-full py-2 rounded hover:bg-sky-700"
                    >
                        Crear alumno
                    </button>
                    <button
                        type="button"
                        className="bg-gray-400 text-white w-full py-2 rounded hover:bg-gray-500"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}



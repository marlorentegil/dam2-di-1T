import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { eliminarAlumno, listarAlumnos } from "@/services/alumnosService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListadoAlumnos () {
    
    type AlumnosForm = {
        id: number;
        nombre: string;
        apellidos: string;
        grupo: string;
        anoNacimiento: number;
        estado: 'Activado' | 'Desactivado';
    }
    
    const [alumnos, setAlumnos] = useState<AlumnosForm[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    
    useEffect(() => {
        const loadAlumno = async () => {
            try{
                const response = await listarAlumnos();
                if(response.ok){
                    const result: AlumnosForm[] = response.data?.map(a => {
                        return {
                            ...a,
                        }
                    }) || [];
                    setAlumnos(result);
                    console.log(response.data);
                } else {
                    console.log(response.error);
                }
            }catch (err:any) {
                setError(err?.message ?? "Error desconocido");
            } finally {
                setLoading (false);
            }
        }
        loadAlumno();
    }, []);





    const handleEliminarAlumno = async (id: number) => {
        try {
            const response = await eliminarAlumno(id);
            if (response.ok) {
                setAlumnos(alumnos.filter(alumno => alumno.id !== id));
            } else {
                console.log(response.error);
            }
        } catch (error) {
            console.log("Error desconocido");
        }
    }


    const navigate = useNavigate();

    const handleCrearAlumno = () => {
        navigate(`/crearAlumno/`);
    }


    return <>
        
        <Header/>

        <main className="flex-1">
            <div className="max-w-5xl mx-auto px-4 py-8">

                <section className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Listado de alumnos
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Selecciona el criterio de ordenación en el desplegable superior.
                    </p>
                </section>


                <section
                        className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <h2 className="text-sm font-medium text-slate-700">
                            Ordenar resultados
                        </h2>
                        <p className="text-xs text-slate-500">
                            Campo y modo de ordenación en una sola lista.
                        </p>
                    </div>



                    <div className="w-full sm:w-72">
                        <label
                                htmlFor="order-select"
                                className="block text-xs font-medium text-slate-600 mb-1"
                        >
                            Ordenar por
                        </label>
                        <select
                                id="order-select"
                                name="order"
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                            <option value="alumno-asc">Apellido (A → Z)</option>
                            <option value="alumno-desc">Apellido (Z → A)</option>
                            <option value="grupo-asc">Grupo (A → Z)</option>
                            <option value="grupo-desc">Grupo (Z → A)</option>
                            <option value="edad-asc">Edad (menor → mayor)</option>
                            <option value="edad-desc">Edad (mayor → menor)</option>
                            <option value="estado-asc">Estado (Activado → Desactivado)</option>
                            <option value="estado-desc">Estado (Desactivado → Activado)</option>
                        </select>


                        <button
                            type="button"
                            className="inline-flex items-center rounded-lg border border-blue-200 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                            onClick={() => handleCrearAlumno()}
                        >
                            Crear nuevo alumno
                        </button>

                    </div>
                </section>


                <section className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div
                            className="border-b border-slate-200 px-4 py-3 flex items-center justify-between"
                    >
                        <h2 className="text-sm font-semibold text-slate-800">
                            Alumnos matriculados
                        </h2>
                        <span className="text-xs text-slate-500">
                            Total: <span id="total-alumnos">{alumnos.length}</span>
                        </span>
                    </div>

                    {/* <!-- BLOQUE DE ERROR (mostrar solo cuando falle la carga en React) --> */}
                    <div
                            id="error-panel"
                            className="hidden px-4 pt-3"
                    >
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700 flex gap-2">
                            <span className="mt-0.5">⚠️</span>
                            <div>
                                <p className="font-semibold">No se han podido cargar los alumnos.</p>
                                <p className="mt-0.5 text-red-700/90">
                                    Inténtalo de nuevo más tarde o revisa la conexión con el servidor.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- FIN BLOQUE DE ERROR --> */}

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50">
                            <tr>
                                <th
                                        scope="col"
                                        className="px-4 py-2 text-left font-semibold text-slate-600"
                                >
                                    Alumno
                                </th>
                                <th
                                        scope="col"
                                        className="px-4 py-2 text-left font-semibold text-slate-600"
                                >
                                    Grupo
                                </th>
                                <th
                                        scope="col"
                                        className="px-4 py-2 text-left font-semibold text-slate-600"
                                >
                                    Año nacimiento
                                </th>
                                <th
                                        scope="col"
                                        className="px-4 py-2 text-left font-semibold text-slate-600"
                                >
                                    Estado
                                </th>
                                <th
                                        scope="col"
                                        className="px-4 py-2 text-left font-semibold text-slate-600"
                                >
                                    Acciones
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">

                            {/* <!-- Fila de ejemplo 1 --> */}
                            
                            {/* Hacer un map de los alumnos aquí */}
                            {alumnos.map((alumno) =>

                                <tr className="hover:bg-slate-50">
                                    <td className="px-4 py-2 whitespace-nowrap">
                                         
                                        {alumno.nombre} {alumno.apellidos}
                                        

                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">{alumno.grupo}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{alumno.anoNacimiento}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <span className= {alumno.estado === 'Activado' ? "bg-green-200" : "bg-red-200"}>
                                            {alumno.estado}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <button
                                                type="button"
                                                className="inline-flex items-center rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                                                onClick= {() => handleEliminarAlumno(alumno.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>

        <Footer/>
    
    </>
}



import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { detalleAlumno, listarAlumnos } from "@/services/alumnosService";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function DetalleAlumno() {

    type AlumnosForm = {
        id: number;
        nombre: string;
        apellidos: string;
        grupo: string;
        anoNacimiento: number;
        estado: 'Activado' | 'Desactivado';
    }
    
    const { id } = useParams();
    const [loading, setLoading] =  useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [alumno, setAlumno] = useState<AlumnosForm | undefined>();

    useEffect(() => {
        setLoading(true);
        const loadAlumno = async () => {
            const result = await detalleAlumno(Number(id!));
            if(!result.ok){
                setError(result.error?.message ?? "Error al cargar el alumno");
                setLoading(false);
                return;
            }
            setAlumno(result.data);
            setLoading(false);
        }
        loadAlumno();
    }, [id]);

    return(
        <>

            <Header/>

            <main className="flex-1">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                Detalle del alumno
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">
                                Información detallada del alumno seleccionado en el listado.
                            </p>
                        </div>

                        <div className="flex justify-start sm:justify-end">
                            <Link to="/"
                                    className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
                            >
                                ← Volver al listado
                            </Link>
                        </div>
                    </section>


                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                        <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {alumno?.nombre} {alumno?.apellidos}
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Alumna de Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma.
                                </p>
                            </div>
                            <span
                                    id="estado-badge"
                                    className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100"
                            >
                                {alumno?.estado}
                            </span>
                        </div>

                        {/* <!-- BLOQUE DE ERROR (mostrar solo si falla la carga en React) --> */}
                        <div id="error-panel-detalle" className="hidden px-4 pt-3">
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700 flex gap-2">
                                <span className="mt-0.5">⚠️</span>
                                <div>
                                    <p className="font-semibold">No se ha podido cargar la información del alumno.</p>
                                    <p className="mt-0.5 text-red-700/90">
                                        Inténtalo de nuevo más tarde o vuelve al listado para seleccionar otro alumno.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- FIN BLOQUE DE ERROR --> */}


                        <div className="px-4 py-4 space-y-6">

                            <div>
                                <h3 className="text-sm font-semibold text-slate-800 mb-2">
                                    Datos académicos
                                </h3>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                        <div>
                                            <dt className="text-xs uppercase tracking-wide text-slate-500">
                                                Nombre completo
                                            </dt>
                                            <dd className="mt-0.5 text-slate-800">
                                                {alumno?.nombre} {alumno?.apellidos}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs uppercase tracking-wide text-slate-500">
                                                Grupo
                                            </dt>
                                            <dd className="mt-0.5 text-slate-800">
                                                {alumno?.grupo}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs uppercase tracking-wide text-slate-500">
                                                Año de nacimiento
                                            </dt>
                                            <dd className="mt-0.5 text-slate-800">
                                                {alumno?.anoNacimiento}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-xs uppercase tracking-wide text-slate-500">
                                                Estado
                                            </dt>
                                            <dd className="mt-0.5 text-slate-800">
                                                <span id="estado-texto">{alumno?.estado}</span>
                                            </dd>
                                        </div>
                                    </dl>
                            </div>


                            <div>
                                <h3 className="text-sm font-semibold text-slate-800 mb-2">
                                    Información de contacto
                                </h3>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-slate-500">
                                            Correo electrónico
                                        </dt>
                                        <dd className="mt-0.5 text-slate-800">
                                            lucia.garcia@example.com
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-slate-500">
                                            Teléfono
                                        </dt>
                                        <dd className="mt-0.5 text-slate-800">
                                            600 123 456
                                        </dd>
                                    </div>
                                </dl>
                            </div>


                            <div className="pt-2 border-t border-slate-100">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                                    Cambiar estado
                                </h3>
                                <button
                                        type="button"
                                        id="toggle-estado-btn"
                                        // onclick=""
                                        className="inline-flex justify-center items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
                                >
                                    Desactivar
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>
        </>
    )

}

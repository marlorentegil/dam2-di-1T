import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { detalleAlumno } from "@/services/alumnosService";
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

    const { id } = useParams<{ id: string }>();

    // Estado para un solo alumno
    const [alumno, setAlumno] = useState<AlumnosForm | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const loadAlumno = async () => {
            try {
                setLoading(true);
                const result = await detalleAlumno(Number(id));

                if (!result.ok) {
                    setError(result.error?.message ?? "Error al cargar el alumno");
                    return;
                }

                // Aquí asignamos solo el alumno que devuelve el service
                setAlumno(result.data ?? null);

            } catch (err: any) {
                setError(err?.message ?? "Error desconocido");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadAlumno();
        }
    }, [id]);

    // Manejo de loading y error antes de renderizar
    if (loading) {
        return (
            <>
                <Header />
                <main className="flex-1">
                    <div className="max-w-5xl mx-auto px-4 py-8">
                        <p>Cargando alumno...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (error || !alumno) {
        return (
            <>
                <Header />
                <main className="flex-1">
                    <div className="max-w-5xl mx-auto px-4 py-8">
                        <p className="text-red-600">{error ?? "No se encontró el alumno"}</p>
                        <Link to="/" className="text-sky-600 hover:underline mt-4 inline-block">
                            ← Volver al listado
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Render principal cuando ya tenemos el alumno
    return (
        <>
            <Header />
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
                            <Link to="/" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1">
                                ← Volver al listado
                            </Link>
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {alumno.nombre} {alumno.apellidos}
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Alumna de Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma.
                                </p>
                            </div>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${alumno.estado === 'Activado' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                {alumno.estado}
                            </span>
                        </div>

                        <div className="px-4 py-4 space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800 mb-2">Datos académicos</h3>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-slate-500">Nombre completo</dt>
                                        <dd className="mt-0.5 text-slate-800">{alumno.nombre} {alumno.apellidos}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-slate-500">Grupo</dt>
                                        <dd className="mt-0.5 text-slate-800">{alumno.grupo}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-slate-500">Año de nacimiento</dt>
                                        <dd className="mt-0.5 text-slate-800">{alumno.anoNacimiento}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-slate-500">Estado</dt>
                                        <dd className="mt-0.5 text-slate-800">{alumno.estado}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-slate-800 mb-2">Información de contacto</h3>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-slate-500">Correo electrónico</dt>
                                        <dd className="mt-0.5 text-slate-800">lucia.garcia@example.com</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-slate-500">Teléfono</dt>
                                        <dd className="mt-0.5 text-slate-800">600 123 456</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="pt-2 border-t border-slate-100">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Cambiar estado</h3>
                                <button type="button" className="inline-flex justify-center items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1">
                                    {alumno.estado === 'Activado' ? 'Desactivar' : 'Activar'}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

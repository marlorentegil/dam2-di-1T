
export default function Header() {
    return (
        <header className="bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div
                            className="h-8 w-8 rounded-lg bg-sky-500 flex items-center justify-center text-white text-sm font-semibold"
                    >
                        DI
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            Panel de alumnado
                        </p>
                        <p className="text-xs text-slate-500">
                            Ciclos Formativos · Informática
                        </p>
                    </div>
                </div>
                <p className="text-xs text-slate-500">
                    Módulo: Desarrollo de Interfaces
                </p>
            </div>
        </header>
    )
}
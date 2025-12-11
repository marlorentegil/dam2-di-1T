
import CrearAlumno from "@/pages/CrearAlumno";
import ListadoAlumnos from "@/pages/ListadoAlumnos";
import PageNotFound from "@/pages/PageNotFound";
import {createBrowserRouter} from "react-router-dom";



export const router = createBrowserRouter([
    {path: "/", element:<ListadoAlumnos/>},
    {path: "/crearAlumno", element:<CrearAlumno/>},
    {path: "*", element:<PageNotFound/>},
]);
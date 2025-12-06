import DetalleAlumno from "@/pages/DetalleAlumno";
import ListadoAlumnos from "@/pages/ListadoAlumnos";
import PageNotFound from "@/pages/PageNotFound";
import {createBrowserRouter} from "react-router-dom";



export const router = createBrowserRouter([
    {path: "/", element:<ListadoAlumnos/>},
    {path: "/detalleAlumno/:id", element:<DetalleAlumno/>},
    {path: "*", element:<PageNotFound/>},
]);
// routes/alumnoRoutes.js
import { Router } from "express";
import {
  listarAlumnos,
  obtenerAlumno,
  crearAlumno,
  actualizarAlumno,
  actualizarEstadoAlumno,
  eliminarAlumno,
} from "../controllers/alumnoController.js";

const router = Router();

// Listado de alumnos (con filtros y ordenación por query params)
router.get("/alumnos", listarAlumnos);

// Detalle de un alumno por id
router.get("/alumnos/:id", obtenerAlumno);

// Crear alumno
router.post("/alumnos", crearAlumno);

// Actualizar alumno completo
router.put("/alumnos/:id", actualizarAlumno);

// Cambiar solo el estado (activar/desactivar) SIN PATCH
router.put("/alumnos/:id/estado", actualizarEstadoAlumno);

// Eliminar alumno
router.delete("/alumnos/:id", eliminarAlumno);

export default router;
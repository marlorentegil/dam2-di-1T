// controllers/alumnoController.js
import { Op } from "sequelize";
import { Alumno } from "../models/Alumno.js";

/**
 * GET /api/alumnos
 * Listado de alumnos con filtros y ordenación
 * Query params opcionales:
 *  - grupo      (ej: DAM1, DAM2, SMR1, SMR2)
 *  - estado     ("Activado" | "Desactivado")
 *  - nombre     (busca en nombre y apellidos, contiene)
 *  - orden      ("alumno-asc", "alumno-desc", "grupo-asc", "grupo-desc",
 *                "edad-asc", "edad-desc", "estado-asc", "estado-desc")
 */
export const listarAlumnos = async (req, res) => {
  try {
    const { grupo, estado, nombre, orden } = req.query;

    const where = {};

    if (grupo) {
      where.grupo = grupo;
    }

    if (estado !== undefined) {
      if (estado !== "Activado" && estado !== "Desactivado") {
        return res.status(400).json({ error: "Parámetro 'estado' no válido" });
      }
      where.estado = estado === "Activado";
    }

    if (nombre) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${nombre}%` } },
        { apellidos: { [Op.like]: `%${nombre}%` } },
      ];
    }

    // Orden por defecto
    let order = [["id", "ASC"]];

    if (orden) {
      switch (orden) {
        case "alumno-asc":
          // Orden alfabético por apellidos + nombre
          order = [
            ["apellidos", "ASC"],
            ["nombre", "ASC"],
          ];
          break;
        case "alumno-desc":
          order = [
            ["apellidos", "DESC"],
            ["nombre", "DESC"],
          ];
          break;
        case "grupo-asc":
          order = [
            ["grupo", "ASC"],
            ["apellidos", "ASC"],
          ];
          break;
        case "grupo-desc":
          order = [
            ["grupo", "DESC"],
            ["apellidos", "DESC"],
          ];
          break;
        case "edad-asc":
          // Menor -> mayor → año de nacimiento más reciente primero
          order = [["anioNacimiento", "DESC"]];
          break;
        case "edad-desc":
          // Mayor -> menor → año de nacimiento más antiguo primero
          order = [["anioNacimiento", "ASC"]];
          break;
        case "estado-asc":
          // Inactiva (false) -> Activa (true)
          order = [["estado", "ASC"]];
          break;
        case "estado-desc":
          // Activa (true) -> Inactiva (false)
          order = [["estado", "DESC"]];
          break;
        default:
          return res.status(400).json({ error: "Parámetro 'orden' no válido" });
      }
    }

    const alumnos = await Alumno.findAll({
      where,
      attributes: [
        "id",
        "nombre",
        "apellidos",
        "grupo",
        "anioNacimiento",
        "estado",
      ],
      order,
    });

    res.json(alumnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo alumnos" });
  }
};

/**
 * GET /api/alumnos/:id
 * Detalle de un alumno
 */
export const obtenerAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const alumno = await Alumno.findByPk(idNum, {
      attributes: [
        "id",
        "nombre",
        "apellidos",
        "grupo",
        "anioNacimiento",
        "estado",
        "email",
        "telefono",
      ],
    });

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo alumno" });
  }
};

/**
 * POST /api/alumnos
 * Crear alumno
 * Body JSON:
 *  { nombre, apellidos, grupo, anioNacimiento, estado?, email?, telefono? }
 */
export const crearAlumno = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      grupo,
      anioNacimiento,
      estado,
      email,
      telefono,
    } = req.body;

    if (!nombre || !apellidos || !grupo || anioNacimiento === undefined) {
      return res.status(400).json({
        error: "nombre, apellidos, grupo y anioNacimiento son obligatorios",
      });
    }

    const anioNum = Number(anioNacimiento);
    if (Number.isNaN(anioNum)) {
      return res
          .status(400)
          .json({ error: "anioNacimiento debe ser un número válido" });
    }

    const nuevoAlumno = await Alumno.create({
      nombre,
      apellidos,
      grupo,
      anioNacimiento: anioNum,
      estado: estado ?? 'Activado',
      email: email ?? null,
      telefono: telefono ?? null,
    });

    res.status(201).json(nuevoAlumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando alumno" });
  }
};

/**
 * PUT /api/alumnos/:id
 * Actualizar alumno (reemplazo "completo")
 * Body JSON:
 *  { nombre, apellidos, grupo, anioNacimiento, estado?, email?, telefono? }
 */
export const actualizarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const alumno = await Alumno.findByPk(idNum);

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    const {
      nombre,
      apellidos,
      grupo,
      anioNacimiento,
      estado,
      email,
      telefono,
    } = req.body;

    if (!nombre || !apellidos || !grupo || anioNacimiento === undefined) {
      return res.status(400).json({
        error: "nombre, apellidos, grupo y anioNacimiento son obligatorios",
      });
    }

    const anioNum = Number(anioNacimiento);
    if (Number.isNaN(anioNum)) {
      return res
          .status(400)
          .json({ error: "anioNacimiento debe ser un número válido" });
    }

    await alumno.update({
      nombre,
      apellidos,
      grupo,
      anioNacimiento: anioNum,
      estado: estado ?? alumno.estado,
      email: email ?? alumno.email,
      telefono: telefono ?? alumno.telefono,
    });

    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando alumno" });
  }
};

/**
 * PUT /api/alumnos/:id/estado
 * Cambiar solo el campo "estado" (activar/desactivar)
 * Body JSON:
 *  { valor: 'Activado' | 'Desactivado' }
 */
export const actualizarEstadoAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const alumno = await Alumno.findByPk(idNum);

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    const { valor } = req.body;

    if (typeof valor !== "string") {
      return res
          .status(400)
          .json({ error: "El campo 'valor' debe ser string" });
    }

    alumno.estado = valor;
    await alumno.save();


    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando estado del alumno" });
  }
};

/**
 * DELETE /api/alumnos/:id
 * Eliminar un alumno
 */
export const eliminarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const alumno = await Alumno.findByPk(idNum);

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    await alumno.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando alumno" });
  }
};
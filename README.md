# Comandos
* Para arrancar la API ejecutar los siguientes comandos
    ```bash
    cd api
    npm install
    npm start
    ```

* Para arrancar el frontend (nuestra aplicación de React)
    ```bash
    npm run dev
    ```
# 🆘 Ayuda
**Eventos**:
* El evento **onChange** es de tipo  `(evt:React.ChangeEvent<HTMLSelectElement>)` (o HTMLInputElement si fuera un campo input en lugar de select)
* El evento **onClick** es de tipo `(evt:React.MouseEvent<HTMLButtonElement>)`

**Cambios al pasar de html a react**
* class ⇒ className
* for ⇒ htmlFor
* a (href) ⇒ Link (to)
---

# API de Alumnos

## Formato de errores

Cuando algo va mal, la API devuelve:

```json
{
  "error": "Mensaje descriptivo del error"
}
```

Con el código HTTP correspondiente (400, 404, 500, etc.)

---

## **Endpoints**

### 1. Listar alumnos `GET /api/alumnos`

Devuelve el listado de alumnos.

Solo admite **un parámetro opcional de ordenación**.

**Query param: orden (opcional)**

Valores posibles:

- alumno-asc → apellidos + nombre A → Z
- alumno-desc → apellidos + nombre Z → A
- grupo-asc → grupo A → Z
- grupo-desc → grupo Z → A
- edad-asc → de más joven a más mayor (año de nacimiento más reciente primero)
- edad-desc → de más mayor a más joven (año de nacimiento más antiguo primero)
- estado-asc → inactiva → activa
- estado-desc → activa → inactiva

Si no se indica orden, se usa un orden por defecto (id ASC).

**Ejemplos de URL**

- Todos los alumnos:

  `GET /api/alumnos`

- Ordenados por apellido (A → Z):

  `GET /api/alumnos?orden=alumno-asc`

- Ordenados por estado (Activados primero):

  `GET /api/alumnos?orden=estado-desc`


**Respuesta 200 (OK)**

Lista de alumnos con los campos necesarios para el listado:

```json
[
  {
    "id": 1,
    "nombre": "Lucía",
    "apellidos": "García López",
    "grupo": "DAM1",
    "anioNacimiento": 2006,
    "estado": "Activado"
  },
  {
    "id": 2,
    "nombre": "Mario",
    "apellidos": "Santos Pérez",
    "grupo": "DAM1",
    "anioNacimiento": 2005,
    "estado": "Desactivado"
  }
]
```

**Errores**

- 400 Bad Request - orden no válido:

```json
{ "error": "Parámetro 'orden' no válido" }
```

- 500 Internal Server Error - Error inesperado al obtener alumnos:

```json
{ "error": "Error obteniendo alumnos" }
```

---

### 2. Obtener detalle de un alumno `GET /api/alumnos/:id`

Devuelve toda la información de un alumno concreto.

**Parámetros de ruta**

- id — ID numérico del alumno.

**Ejemplo**

GET /api/alumnos/1

**Respuesta 200 (OK)**

```json
{
  "id": 1,
  "nombre": "Lucía",
  "apellidos": "García López",
  "grupo": "DAM1",
  "anioNacimiento": 2006,
  "estado": "Activado",
  "email": "lucia.garcia@example.com",
  "telefono": "600123456"
}
```

### **Errores**

- 400 Bad Request — id no numérico:

```json
{ "error": "ID no válido" }
```

- 404 Not Found — no existe un alumno con ese id:

```json
{ "error": "Alumno no encontrado" }
```

- 500 Internal Server Error:

```json
{ "error": "Error obteniendo alumno" }
```

## 3. Cambiar el estado (activar / desactivar) `PUT /api/alumnos/:id/estado`

**Parámetros de ruta**

- id — ID numérico del alumno.

**Body (JSON)**

- valor: “Activado” o “Desactivado”

**Ejemplo (marcar como inactiva)**

```bash
PUT /api/alumnos/1/estado
Content-Type: application/json
```

```json
{
  "valor": "Activado"
}
```

**Respuesta 200 (OK)**

```json
{
  "id": 1,
  "nombre": "Lucía",
  "apellidos": "García López",
  "grupo": "DAM1",
  "anioNacimiento": 2006,
  "estado": "Activado",
  "email": "lucia.garcia@example.com",
  "telefono": "600123456"
}
```

**Errores**

- 400 Bad Request — id no numérico:

```json
{ "error": "ID no válido" }
```

- 400 Bad Request — valor mal enviado (no string):

```json
{ "error": "El campo 'valor' debe ser string" }
```

- 404 Not Found — alumno no existe:

```json
{ "error": "Alumno no encontrado" }
```

- 500 Internal Server Error:

```json
{ "error": "Error actualizando estado del alumno" }
```

---

### 4. Eliminar alumno `DELETE /api/alumnos/:id`

### **Parámetros de ruta**

- id — ID numérico del alumno.

**Ejemplo**

```
DELETE /api/alumnos/1
```

**Respuesta 204 (No Content)**

Sin cuerpo de respuesta.

**Errores**

- 400 Bad Request — id no numérico:

```json
{ "error": "ID no válido" }
```

- 404 Not Found — alumno no encontrado:

```json
{ "error": "Alumno no encontrado" }
```

- 500 Internal Server Error:

```json
{ "error": "Error eliminando alumno" }
```
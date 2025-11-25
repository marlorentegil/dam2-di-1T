// index.js
import express from "express";
import cors from "cors";
import { sequelize } from "./db.js";
import seed from "./seed.js";
import alumnoRoutes from "./routes/alumnoRoutes.js";

const app = express();
const PUERTO = 3000;

// Then pass these options to cors:
app.use(cors( {
  origin: '*',
}));
app.use(express.json());


async function iniciarBD() {
  try {
    await sequelize.authenticate();
    console.log("Conexión con SQLite OK ✅");
    await sequelize.sync();
    console.log("Modelos sincronizados ✅");
  } catch (error) {
    console.error("Error conectando con la BD:", error);
  }
}

app.get("/", (req, res) => {
  res.send("API para gestión de vehículos");
});

// Prefijo común para la API
app.use("/api", alumnoRoutes);



app.listen(PUERTO, async () => {
  await iniciarBD();
  await seed();
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});





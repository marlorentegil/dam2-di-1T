// Mascotas
import {sequelize} from "./db.js";
import {Alumno} from "./models/Alumno.js";

const alumnos = [
    {
        nombre: "Lucía",
        apellidos: "García López",
        grupo: "DAM1",
        anioNacimiento: 2006,
        estado: "Activado",
        email: "lucia.garcia@example.com",
        telefono: "600000001",
    },
    {
        nombre: "Mario",
        apellidos: "Santos Pérez",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "mario.santos@example.com",
        telefono: "600000002",
    },
    {
        nombre: "Ana",
        apellidos: "Ruiz Martín",
        grupo: "DAM2",
        anioNacimiento: 2004,
        estado: "Activado",

        email: "ana.ruiz@example.com",
        telefono: "600000003",
    },
    {
        nombre: "Javier",
        apellidos: "López Díaz",
        grupo: "DAM2",
        anioNacimiento: 2003,
        estado: "Desactivado",

        email: "javier.lopez@example.com",
        telefono: "600000004",
    },
    {
        nombre: "Noa",
        apellidos: "Molina Torres",
        grupo: "SMR1",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "noa.molina@example.com",
        telefono: "600000005",
    },
    {
        nombre: "Leo",
        apellidos: "Navarro Gil",
        grupo: "SMR1",
        anioNacimiento: 2007,
        estado: "Desactivado",

        email: "leo.navarro@example.com",
        telefono: "600000006",
    },
    {
        nombre: "Paula",
        apellidos: "Hernández Soto",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "paula.hernandez@example.com",
        telefono: "600000007",
    },
    {
        nombre: "Sergio",
        apellidos: "Iglesias Rubio",
        grupo: "DAM1",
        anioNacimiento: 2004,
        estado: "Activado",

        email: "sergio.iglesias@example.com",
        telefono: "600000008",
    },
    {
        nombre: "Marta",
        apellidos: "Romero Cano",
        grupo: "DAM2",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "marta.romero@example.com",
        telefono: "600000009",
    },
    {
        nombre: "Álvaro",
        apellidos: "Vega Campos",
        grupo: "DAM2",
        anioNacimiento: 2004,
        estado: "Desactivado",

        email: "alvaro.vega@example.com",
        telefono: "600000010",
    },
    {
        nombre: "Elena",
        apellidos: "Ortiz Fuentes",
        grupo: "SMR1",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "elena.ortiz@example.com",
        telefono: "600000011",
    },
    {
        nombre: "Hugo",
        apellidos: "Cano Delgado",
        grupo: "SMR1",
        anioNacimiento: 2006,
        estado: "Activado",

        email: "hugo.cano@example.com",
        telefono: "600000012",
    },
    {
        nombre: "Carmen",
        apellidos: "Ramos Núñez",
        grupo: "SMR2",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "carmen.ramos@example.com",
        telefono: "600000013",
    },
    {
        nombre: "Diego",
        apellidos: "Marín Crespo",
        grupo: "SMR2",
        anioNacimiento: 2006,
        estado: "Desactivado",

        email: "diego.marin@example.com",
        telefono: "600000014",
    },
    {
        nombre: "Laura",
        apellidos: "Serrano León",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "laura.serrano@example.com",
        telefono: "600000015",
    },
    {
        nombre: "Pablo",
        apellidos: "Rey Domínguez",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "pablo.rey@example.com",
        telefono: "600000016",
    },
    {
        nombre: "Irene",
        apellidos: "Gallardo Bravo",
        grupo: "DAM2",
        anioNacimiento: 2004,
        estado: "Activado",

        email: "irene.gallardo@example.com",
        telefono: "600000017",
    },
    {
        nombre: "Carlos",
        apellidos: "Vidal Herrera",
        grupo: "DAM2",
        anioNacimiento: 2003,
        estado: "Desactivado",

        email: "carlos.vidal@example.com",
        telefono: "600000018",
    },
    {
        nombre: "Raquel",
        apellidos: "Castillo Arroyo",
        grupo: "SMR1",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "raquel.castillo@example.com",
        telefono: "600000019",
    },
    {
        nombre: "Adrián",
        apellidos: "Pascual Lozano",
        grupo: "SMR1",
        anioNacimiento: 2006,
        estado: "Activado",

        email: "adrian.pascual@example.com",
        telefono: "600000020",
    },
    {
        nombre: "Julia",
        apellidos: "Campos Rivas",
        grupo: "SMR2",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "julia.campos@example.com",
        telefono: "600000021",
    },
    {
        nombre: "Rubén",
        apellidos: "Benítez Cuesta",
        grupo: "SMR2",
        anioNacimiento: 2006,
        estado: "Desactivado",

        email: "ruben.benitez@example.com",
        telefono: "600000022",
    },
    {
        nombre: "Nerea",
        apellidos: "Carrasco Montes",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "nerea.carrasco@example.com",
        telefono: "600000023",
    },
    {
        nombre: "Víctor",
        apellidos: "Arias Palma",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "victor.arias@example.com",
        telefono: "600000024",
    },
    {
        nombre: "Sara",
        apellidos: "Méndez Lucas",
        grupo: "DAM2",
        anioNacimiento: 2004,
        estado: "Activado",

        email: "sara.mendez@example.com",
        telefono: "600000025",
    },
    {
        nombre: "Iván",
        apellidos: "Aguilar Ponce",
        grupo: "DAM2",
        anioNacimiento: 2003,
        estado: "Desactivado",

        email: "ivan.aguilar@example.com",
        telefono: "600000026",
    },
    {
        nombre: "Claudia",
        apellidos: "Peña Rico",
        grupo: "SMR1",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "claudia.pena@example.com",
        telefono: "600000027",
    },
    {
        nombre: "Óscar",
        apellidos: "Crespo Rubio",
        grupo: "SMR1",
        anioNacimiento: 2006,
        estado: "Activado",

        email: "oscar.crespo@example.com",
        telefono: "600000028",
    },
    {
        nombre: "Patricia",
        apellidos: "Domingo Sáez",
        grupo: "SMR2",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "patricia.domingo@example.com",
        telefono: "600000029",
    },
    {
        nombre: "Tomás",
        apellidos: "Rojas Parra",
        grupo: "SMR2",
        anioNacimiento: 2006,
        estado: "Desactivado",

        email: "tomas.rojas@example.com",
        telefono: "600000030",
    },
    {
        nombre: "Alicia",
        apellidos: "Montes Guerra",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "alicia.montes@example.com",
        telefono: "600000031",
    },
    {
        nombre: "Gonzalo",
        apellidos: "Valero Peña",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "gonzalo.valero@example.com",
        telefono: "600000032",
    },
    {
        nombre: "Rocío",
        apellidos: "Calvo Vidal",
        grupo: "DAM2",
        anioNacimiento: 2004,
        estado: "Activado",

        email: "rocio.calvo@example.com",
        telefono: "600000033",
    },
    {
        nombre: "Fernando",
        apellidos: "Nieto Soler",
        grupo: "DAM2",
        anioNacimiento: 2003,
        estado: "Desactivado",

        email: "fernando.nieto@example.com",
        telefono: "600000034",
    },
    {
        nombre: "Lidia",
        apellidos: "Osorio Campos",
        grupo: "SMR1",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "lidia.osorio@example.com",
        telefono: "600000035",
    },
    {
        nombre: "Jorge",
        apellidos: "Santos Alba",
        grupo: "SMR1",
        anioNacimiento: 2006,
        estado: "Activado",

        email: "jorge.santos@example.com",
        telefono: "600000036",
    },
    {
        nombre: "Belén",
        apellidos: "Camacho Roldán",
        grupo: "SMR2",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "belen.camacho@example.com",
        telefono: "600000037",
    },
    {
        nombre: "Alejandro",
        apellidos: "Cabrera Luna",
        grupo: "SMR2",
        anioNacimiento: 2006,
        estado: "Desactivado",

        email: "alejandro.cabrera@example.com",
        telefono: "600000038",
    },
    {
        nombre: "Esther",
        apellidos: "Durán Paredes",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "esther.duran@example.com",
        telefono: "600000039",
    },
    {
        nombre: "Raúl",
        apellidos: "Benito Mora",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "raul.benito@example.com",
        telefono: "600000040",
    },
    {
        nombre: "Natalia",
        apellidos: "Lara Pozo",
        grupo: "DAM2",
        anioNacimiento: 2004,
        estado: "Activado",

        email: "natalia.lara@example.com",
        telefono: "600000041",
    },
    {
        nombre: "Samuel",
        apellidos: "Herrero Campos",
        grupo: "DAM2",
        anioNacimiento: 2003,
        estado: "Desactivado",

        email: "samuel.herrero@example.com",
        telefono: "600000042",
    },
    {
        nombre: "Inés",
        apellidos: "Luque Peña",
        grupo: "SMR1",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "ines.luque@example.com",
        telefono: "600000043",
    },
    {
        nombre: "David",
        apellidos: "Reina Pastor",
        grupo: "SMR1",
        anioNacimiento: 2006,
        estado: "Activado",

        email: "david.reina@example.com",
        telefono: "600000044",
    },
    {
        nombre: "Miriam",
        apellidos: "Arenas Muñoz",
        grupo: "SMR2",
        anioNacimiento: 2007,
        estado: "Activado",

        email: "miriam.arenas@example.com",
        telefono: "600000045",
    },
    {
        nombre: "Luis",
        apellidos: "Cuenca Jurado",
        grupo: "SMR2",
        anioNacimiento: 2006,
        estado: "Desactivado",

        email: "luis.cuenca@example.com",
        telefono: "600000046",
    },
    {
        nombre: "Silvia",
        apellidos: "Bravo Lozano",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "silvia.bravo@example.com",
        telefono: "600000047",
    },
    {
        nombre: "Arnau",
        apellidos: "Pérez Vidal",
        grupo: "DAM1",
        anioNacimiento: 2005,
        estado: "Activado",

        email: "arnau.perez@example.com",
        telefono: "600000048",
    },
    {
        nombre: "Yaiza",
        apellidos: "Roldán Cruz",
        grupo: "DAM2",
        anioNacimiento: 2004,
        estado: "Activado",

        email: "yaiza.roldan@example.com",
        telefono: "600000049",
    },
    {
        nombre: "Marcos",
        apellidos: "Sierra Navarro",
        grupo: "DAM2",
        anioNacimiento: 2003,
        estado: "Desactivado",

        email: "marcos.sierra@example.com",
        telefono: "600000050",
    },
];

export default async function seed() {
    try {
        console.log("Conectando con la base de datos...");
        await sequelize.authenticate();

        await sequelize.sync({force: true});
        console.log("Tablas sincronizadas (force: true) ✅");
        console.log("Insertando alumnos...");
        await Alumno.bulkCreate(alumnos);
        console.log("Alumnos insertados ✅");

        console.log("Seed completado correctamente 🎉");
    } catch (error) {
        console.error("Error ejecutando el seed:", error);
        process.exit(1);
    }
}
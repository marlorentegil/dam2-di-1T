// models/Vehiculo.js
import {DataTypes} from "sequelize";
import {sequelize} from "../db.js";

// models/alumno.js
export const Alumno = sequelize.define(
    'Alumno',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        apellidos: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        grupo: {
            type: DataTypes.STRING(10), // DAM1, DAM2, SMR1...
            allowNull: false,
        },

        anioNacimiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1900,
                max: new Date().getFullYear(),
            },
        },
        estado: {
            type: DataTypes.ENUM('Activado','Desactivado'),
            allowNull: false,
            defaultValue: 'Activado',
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },

        telefono: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    },
    {
        tableName: 'alumnos',
        timestamps: false,   // createdAt / updatedAt
        underscored: false,  // created_at, updated_at, anio_nacimiento...
    }
);

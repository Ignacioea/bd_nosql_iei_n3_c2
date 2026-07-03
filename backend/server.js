//importar dependencias del backend
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//iniciar la aplicación
const aplicacion = express();
const PORT = 3000;

//instanciar las dependencias de la apliación
aplicacion.use(cors());
aplicacion.use(express.json());

//conexión a mongoDB
mongoose.connect('mongodb://localhost:27017/IEI_N3_C2')
    .then(()=> console.log("conexión existosa"))
    .catch((error) =>console.log("Error de conexión: ", error))

aplicacion.listen(PORT, ()=> {
    console.log("Servidor corriendo en el puerto: ", PORT);
});
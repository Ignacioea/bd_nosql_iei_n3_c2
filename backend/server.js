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

const pais = new mongoose.Schema({
    nombre: String,
    iso2: String,
    iso3: String,
    codigoPais: String,
    nacionalidad: String
});

const Pais = mongoose.model("Pais", pais, "paises")

aplicacion.get("/obtenerPaises", async(request, response) => {
    try{
        const paises = await Pais.find();
        response.json(paises)
    }catch(error){
        response.status(500).json({
            message: "no fue posible obtener los paises"
        });
    }
});

const comuna = new mongoose.Schema({
    codigo: String,
    nombre: String,
    region: String
});

const Comuna = mongoose.model("Comuna", comuna, "comunas")

aplicacion.get("/obtenerComunas", async(request, response) => {
    try{
        const comunas = await Comuna.find();
        response.json(comunas)
    }catch(error){
        response.status(500).json({
            message: "no fue posible obtener las comunas"
        });
    }
});
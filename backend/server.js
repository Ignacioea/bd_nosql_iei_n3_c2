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

//MODELOS
//Modelo pais
const pais = new mongoose.Schema({
    nombre: String,
    iso2: String,
    iso3: String,
    codigoPais: String,
    nacionalidad: String
});

const Pais = mongoose.model("Pais", pais, "paises")

//Modelo comuna
const comuna = new mongoose.Schema({
    codigo: String,
    nombre: String,
    region: String
});

const Comuna = mongoose.model("Comuna", comuna, "comunas")

//Modelo dirección
const direccion = new mongoose.Schema({
    comuna: String,
    calle: String,
    numero: String,
    departamento: String,
    codigo_postal: String
})

//Modelo usuario
const usuario = new mongoose.Schema({
    nombre: String,
    correo: String,
    contrasena: String,
    genero: String,
    fechaNacimiento: String,
    Nacionalidad: String,
    direccion: [direccion]
})

const Usuario = mongoose.model("Usuario", usuario, "usuarios")
//MÉTODOS

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

aplicacion.get('/obtenerUsuarios', async (request, response) => {
    try {
        // Usamos agregaciones para obtener info desde otras colecciones e incorporarlas a nuestra colección
        const usuarios = await Usuario.aggregate([{
            $lookup: {
                from: 'paises', // Colección desde la que queremos traer datos
                localField: 'nacionalidad', // Campo de la colección con la info a buscar
                foreignField: 'iso2', // Campo de la colección referenciada que quiero mostrar
                as: 'gentilicio' // Nuevo nombre del campo con la info
            }
        }]);

        // En la RESPONSE (res) formateamos los usuarios como JSON y los enviamos
        response.json(usuarios);
    } catch (excepcion) {
        response.status(500).json({
            message: 'No ha sido posible obtener los datos. ', excepcion 
        });
    }
});

//agregar usuario
aplicacion.post("/guardarUsuario", async(request, response) => {
    try{
        
        const{
            nombre,
            correo,
            contrasena,
            genero,
            fechaNacimiento,
            nacionalidad,
            direccion
        } = request.body;
        console.log(request.body);
        const salt = bcrypt.genSaltSync(10);
        const contrasenaHash =bcrypt.hashSync(contrasena, salt);
        const objetoDireccion = JSON.parse(direccion);

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contrasena: contrasenaHash,
            genero,
            fechaNacimiento,
            nacionalidad,
            direccion: objetoDireccion
        });

        await nuevoUsuario.save()
        response.status(200).json({
            message: "Usuario creado correctamente"
        });


    }catch(exception){
    console.log("ERROR:", exception);

    response.status(500).json({
        message: "No ha sido posible guardar los datos",
        error: exception.message
    });
}
});
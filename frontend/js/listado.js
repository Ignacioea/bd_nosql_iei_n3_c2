window.onload = function () {
    obtenerUsuarios();
}

async function obtenerUsuarios(){
    try{
        const respuesta = await fetch('http://localhost:3000/obtenerUsuarios');
        const usuarios = await respuesta.json();

        new DataTable("#tablaUsuarios", {
            data: usuarios,
            columns:[
                {data: "nombre"},
                {data: "correo"},
                {
                    data: "genero",
                    "render": function(data, type, row){
                        let respuesta = "";
                        switch (data){
                            case "masc":
                                respuesta = "Masculino";
                                break;
                            case "fem":
                                respuesta = "Femenino";
                                break;
                            case "otro":
                                respuesta = "Otro";
                                break;
                        }
                        return respuesta;
                    }
                },
                {data: "fechaNacimiento"},
                {
                    data: "gentilicio",
                    render: function(data){
                        return data && data.length > 0 ? data[0].nombre: "";
                    }
                }
            ]
        });
    }catch (error){
        console.log("Error al obtener los datos: ", error)

    }
}

window.onload = function () {
    obtenerEventos();
}

async function obtenerEventos() {
    try{
        const respuesta = await fetch("http://localhost:3000/obtenerEventos")
        const eventos = await respuesta.json();

        new DataTable("#tablaEventos", {
            data: eventos,
            columns: [
                {
                    data: "usuario",
                    render:function(data){
                        return data && data.length > 0
                        ? data[0].nombre
                        :"";
                    }
                },
                {
                    data: "nombre"
                },
                {
                    data:"categoria",
                    render: function(data){
                        let respuesta = "";
                        switch(data){
                            case "dep":
                                respuesta = "Deportivo";
                                break;
                            case "mus":
                                respuesta = "Musical";
                                break;
                            case "cul":
                                respuesta = "Cultural";
                                break;
                            case "tec":
                                respuesta = "Tecnología";
                                break;
                            case "edu":
                                respuesta = "Educación";
                                break;
                        }
                        return respuesta;
                    }
                },
                {
                    data: "lugar"
                },
                {
                    data: "fecha"
                },
                {
                    data:"hora"
                },
                {
                    data: "costo"
                },
                {
                    data:"estado",
                    render:function(data){
                        let respuesta = "";
                        switch(data){
                            case "act":
                                respuesta = "Activo"
                                break;
                            case "sus":
                                respuesta = "Suspendido"
                                break;
                            case "fin":
                                respuesta = "Finalizado"
                                break;
                        }
                        return respuesta;
                    }
                }
            ]


        })
    }catch(error){
        console.log("error al obtener eventos: ", error)
    }
    
}
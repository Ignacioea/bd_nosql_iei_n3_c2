$(document).ready(function(){
    cargarUsuarios();
});

function guardarEvento(){
    const formulario = $("#formularioEvento")[0];
    const dataForm = new FormData(formulario);
    const datos = Object.fromEntries(dataForm.entries());

    const enviarEvento = async() =>{
        try{
            const respuesta = await fetch("http://localhost:3000/guardarEvento", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await respuesta.json();
            if (respuesta.ok){
                window.location.href = "./listadoevento.html";
            }
        }catch(error){
            console.log("Error al ingresar el usuario: ", error);
        }
    }
    enviarEvento();
}


async function cargarUsuarios() {
    try{
        const respuesta = await fetch('http://localhost:3000/obtenerUsuarios')
        const usuarios = await respuesta.json();

        const select = $("#selectUsuario");

        $.each(usuarios, function(index, usuario){
            select.append($('<option>', {
                value: usuario._id,
                text: usuario.nombre
            }));
        });
    }catch(error){
        console.log("Error al obtener el usuario: ", error);
    }
    
}

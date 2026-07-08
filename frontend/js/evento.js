$(document).ready(function(){
    cargarUsuarios();
});

function validarEvento(){
    let formularioValido = true;

    $("#listaErrores").empty();
    $("#errorFormulario").hide();

    if (!ValidarInput($("#selectUsuario"))){
    agregarError("<li>Debe seleccionar un usuario.</li>");
    formularioValido = false;
    }

    if (!ValidarInput($("#inputNombre"))){
        agregarError("<li>Debe ingresar el nombre del evento.</li>");
        formularioValido = false;
    }

    if (!ValidarInput($("#selectCategoria"))){
        agregarError("<li>Debe seleccionar una categoría.</li>");
        formularioValido = false;
    }

    if (!ValidarInput($("#inputLugar"))){
        agregarError("<li>Debe ingresar el lugar del evento.</li>");
        formularioValido = false;
    }

    if (!ValidarInput($("#inputFecha"))){
        agregarError("<li>Debe seleccionar una fecha.</li>");
        formularioValido = false;
    }

    if (!ValidarInput($("#inputHora"))){
        agregarError("<li>Debe ingresar una hora.</li>");
        formularioValido = false;
    }

    if (!validarCosto($("#inputCosto"))){
        agregarError("<li>Debe ingresar un costo válido (solo números).</li>");
        formularioValido = false;
    }

    if (!ValidarInput($("#inputOrganizador"))){
        agregarError("<li>Debe ingresar el organizador.</li>");
        formularioValido = false;
    }

    if (!ValidarInput($("#inputDescripcion"))){
        agregarError("<li>Debe ingresar una descripción.</li>");
        formularioValido = false;
    }

    if (!ValidarInput($("#selectEstado"))){
        agregarError("<li>Debe seleccionar un estado.</li>");
        formularioValido = false;
    }
    

    if(formularioValido){
        const formulario = $("#formularioEvento")[0];
        const dataForm = new FormData(formulario);
        const datos = Object.fromEntries(dataForm.entries());

        const guardarEvento = async() =>{
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
        guardarEvento();
    }else{
        $("#errorFormulario").show();

    }

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

//VALIDACIONES DE ENTRADA 
function ValidarInput(elemento){
    console.log("campo: ",
        elemento.attr("id"),
        "valor: ",
        elemento.val()
    )
    if ($(elemento).val() === ""){
        return false;
    }
    return true;
}

function agregarError(mensaje) {
    let mensajeError = "";
    let listaErrores = $("#listaErrores");
    mensajeError += mensaje;
    listaErrores.append(mensajeError);
}

function validarCosto(elemento){
    if(!ValidarInput(elemento)){
        return false;
    }
    const costo = $(elemento).val();
    if(isNaN(costo)){
        return false;
    }
    return true;
}
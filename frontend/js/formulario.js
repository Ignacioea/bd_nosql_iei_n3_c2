$(document).ready(function(){
    cargarInfoPaises();
    cargarInfoComunas();
});

function validarFormulario(){
    let formularioValido = true;

    $("#listaErrores").empty();
    $("#errorFormulario").hide();

    //validar entradas
    if (!ValidarInput($("#inputNombre"))){
        agregarError("<li>Debe ingresar el nombre completo.</li>");
        formularioValido = false;
    }
    if (!ValidarInput($("#inputRut"))){
        agregarError("<li>Debe ingresar su RUT.</li>");
        formularioValido = false;
    }
    if (!validarCorreo($("#inputCorreo"))){
        agregarError("<li>Debe ingresar su correo electrónico.</li>");
        formularioValido = false;
    }
    if (!ValidarInput($("#inputTelefono"))){
        agregarError("<li>Debe ingresar su número de teléfono.</li>");
        formularioValido = false;
    }
    if (!ValidarInput($("#inputNacimiento"))){
        agregarError("<li>Debe ingresar su fecha de nacimiento.</li>");
        formularioValido = false;
    }
    if (!ValidarInput($("#selectNacionalidad"))){
        agregarError("<li>Debe seleccionar su nacionalidad.</li>");
        formularioValido = false;
    }
    if (!ValidarInput($("#selectGenero"))){
        agregarError("<li>Debe seleccionar su género.</li>");
        formularioValido = false;
    }
    if (!ValidarInput($("#inputCalle"))){
        agregarError("<li>Debe ingresar la calle de su domicilio.</li>");
        formularioValido = false;
    }
    if (!ValidarInput($("#inputNumeroCalle"))){
        agregarError("<li>Debe ingresar el número de la calle de su domicilio.</li>");
        formularioValido = false;
    }
    if (!validarContrasena($("#inputContrasena"))){
        agregarError("<li>Debe ingresar su contraseña.</li>");
        formularioValido = false;
    }
    if (!validarRepetirContrasena($("#inputRepetirContrasena"))){
        agregarError("<li>Debe volver a ingresar su contraseña.</li>");
        formularioValido = false;
    }
    if (!ValidarInput($("#selectComuna"))){
        agregarError("<li>Debe seleccionar su comuna.</li>");
        formularioValido = false;
    }
    console.log("RESULTADO FINAL:", formularioValido);
    if (formularioValido){
        alert("formulario válido, enviando datos...");

        const formulario = $("#formularioRegistro")[0];
        const dataForm = new FormData(formulario);

        const direccion = {
            comuna: dataForm.get("comuna"),
            calle: dataForm.get("calle"),
            numero: dataForm.get("numero"),
            departamento: dataForm.get("departamento"),
            codigo_postal: dataForm.get("codigo_postal")
        }

        dataForm.set("direccion", JSON.stringify(direccion));

        const datos = Object.fromEntries(dataForm.entries());
        datos.fechaRegistro = new Date().toISOString();
        datos.activo = "true";

        const enviarFormulario = async () => {
            try{
                const respuesta = await fetch("http://localhost:3000/guardarUsuario", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });
                const data = await respuesta.json();
                console.log(data);

                if(respuesta.ok){
                    window.location.href = "./listado.html";
                }
            }catch(error){
                console.log("Error al ingresar el usuario: ", error);
            }
        }
        enviarFormulario();
    }else{
        $("#errorFormulario").show();
    }
};

// CARGAR INFO
async function cargarInfoPaises() {
    try{
        const respuesta = await fetch('http://localhost:3000/obtenerPaises')
        const paises = await respuesta.json();

        const select = $('#selectNacionalidad');

        $.each(paises, function(index, pais){
            select.append($('<option>', {
                value: pais.iso2,
                text: pais.nacionalidad
            }));
        });
    }catch(error){
        console.log("Error al obtener paises: ", error);
    }
    
}

async function cargarInfoComunas() {
    try{
        const respuesta = await fetch('http://localhost:3000/obtenerComunas')
        const comunas = await respuesta.json();

        const select = $('#selectComuna');

        $.each(comunas, function(index, comuna){
            select.append($('<option>', {
                value: comuna.codigo,
                text: comuna.nombre
            }));
        });
    }catch(error){
        console.log("Error al obtener comunas: ", error);
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

//VALIDACIONES DE LÓGICA
function validarCorreo(elemento) {
    if (ValidarInput(elemento)) {
        const campo = $(elemento);
        const correo = $(elemento).val();
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexCorreo.test(correo)) {
            campo.removeClass("is-invalid");
            campo.addClass("is-valid");
            return true
        } else {
            $("#errorEmailRequerido").remove();
            agregarError("<li>El EMAIL es inválido.</li>");
            campo.addClass("is-invalid");
            campo.removeClass("is-valid");
            return false
        }
    } else {

    }
};

function validarContrasena(elemento) {
    if (!ValidarInput(elemento)) {
        return false;
    }
    const campo = $(elemento);
        const password = $(elemento).val();
        const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        if (regexContrasena.test(password)) {
            campo.removeClass('is-invalid');
            campo.addClass('is-valid');
            return true
        } else {
            $("#errorContrasenaRequerido").remove();
            agregarError("<li>Su contraseña NO es segura, recuerde incluir al menos:<ul><li>1 Letra mayúscula.</li><li>1 Letra minúscula.</li><li>1 dígito.</li><li>1 caracter especial.</li><li>8 caracteres como mínimo.</li></ul></li>");
            campo.addClass("is-invalid");
            campo.removeClass("is-valid");
            return false
        }
};

function validarRepetirContrasena(elemento) {
    if (ValidarInput(elemento)) {
        const campo = $(elemento);
        if ($(elemento).val() === $("#inputContrasena").val()) {
            campo.removeClass("is-invalid");
            campo.addClass("is-valid");
            return true
        } else {
            $('#errorRepetirContrasenaRequerido').remove();
            agregarError("<li>Sus contraseñas no son iguales.</li>");
            campo.addClass("is-invalid");
            campo.removeClass("is-valid");
            return false
        }
    }
};
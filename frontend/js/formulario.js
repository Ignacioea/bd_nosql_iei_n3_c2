$(document).ready(function(){
    cargarInfoPaises();
    cargarInfoComunas();
});



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

function validarFormulario(){
    let formularioValido = true;
    
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
        alert("se produjo un error")
    }
};
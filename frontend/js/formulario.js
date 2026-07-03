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

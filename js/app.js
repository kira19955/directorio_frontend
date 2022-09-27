const web =  document.querySelector('.table-bordered')

/* 
PRIMERO SE ESPERA A QUE SE CARGUE TODO EL CONTENIDO
PARA QUE EMPIEZE A FUNCIONAR EL JS, Y CARGUE LA FUNCION
cargarInfo() 
 */
document.addEventListener('DOMContentLoaded', ()=>{
    cargarInfo();
});


/* 
FUNCION QUE PIDE MEDIANTE FETCH UNA URL,
Y PROCEDE A PARCEARLA A JSON Y LLAMA A LA FUNCION 
mostrarReseltado(), PASANDOLE EL ARREGLO;
 */
function cargarInfo(){
    fetch('https://sistemas.xalapa.gob.mx/directorio_municipal/')
    .then(datos => datos.json())
    .then(respuesta => mostrarResultado(respuesta.data))
}


function mostrarResultado(respuestas){

    console.log(respuestas);
    
    let html = "";

    const tr  = document.createElement('tbody');
    

    respuestas.forEach(respuesta => {
        const {nivel, nombre_area, prefijo_titular, nombre_titular, ubicacion_oficina, telefono_area, correo_area, depende_superior, latitud, longitud, siglas, busqueda} = respuesta;

        html +=
         `
         <tr>
            <td class="articulo">${nombre_area }</td>
            <td class="articulo">${prefijo_titular} ${nombre_titular }</td>
            <td class="articulo">${ubicacion_oficina }</td>
            <td class="articulo">${telefono_area }</td>
            <td class="articulo">${correo_area }</td>
        </tr> 
        `;
        tr.innerHTML = html;

    });

    web.appendChild(tr);
}

document.addEventListener("keyup", e=>{

    if (e.target.matches("#datatable-search-input")){
        
        if (e.key ==="Escape")e.target.value = ""
  
        document.querySelectorAll(".articulo").forEach(area =>{
  
            area.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?area.classList.remove("filtro")
              :area.classList.add("filtro")
        })
  
    }
  
  
  })


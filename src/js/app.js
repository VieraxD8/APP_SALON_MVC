
let paso = 1;
let pasoInicial = 1;
let pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    inicarApp();
});



function inicarApp() {
    mostrarSeccion(); // muestra y oculta la secciones
    tabs(); // cambia la sesion cuando se presione el tabs
    botonesPaginador(); // Agregar o quita los botones de paginador
    paginasAnterior();
    paginasSiguiente();


    consultarApi(); //Consulta la Api en el backed de php

    idCliente();
    nombreCliente(); //Añade el nombre del cliente al objeto de citas
    seleccionarFecha(); // Añade la fecha de la cita al objeto
    seleccionarHora();  //Añade la hora de la cita al objeto

    mostrarResumen(); // Muestra el resumen de la cita 
}

function mostrarSeccion() {

    //ocultar la seccion que tenga la clase de mostrar

    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
            // Seleccionar la seccion con el paso...
        const pasoSelector = `#paso-${paso}`
        const seccion = document.querySelector(pasoSelector);
        seccion.classList.add('mostrar');

        // Quita la clase de actual al tab anterior

        const tabAnterior = document.querySelector('.actual');
        if(tabAnterior){
            tabAnterior.classList.remove('actual');

        }


    //Resalta el tab actual

    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');


}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach( boton => {
        boton.addEventListener('click', function(e) {
            
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();

           
        });
    });
}

function botonesPaginador() {
    const paginasAnterior = document.querySelector('#anterior');
    const paginasSiguiente = document.querySelector('#siguiente');

    if(paso === 1){
        paginasAnterior.classList.add('ocultar');
        paginasSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginasAnterior.classList.remove('ocultar');
        paginasSiguiente.classList.add('ocultar');
        mostrarResumen();
    }else {
        paginasAnterior.classList.remove('ocultar');
        paginasSiguiente.classList.remove('ocultar');
    }
    

    mostrarSeccion();
}

function paginasSiguiente(){
    const paginasAnterior = document.querySelector('#anterior');
    paginasAnterior.addEventListener('click', function() {

        if(paso <= pasoInicial)return;
        paso--;

        botonesPaginador();

    });
}
function paginasAnterior() {

    const paginasAnterior = document.querySelector('#siguiente');
    paginasAnterior.addEventListener('click', function() {

        if(paso >= pasoFinal)return;
        paso++;

        botonesPaginador();

    });

}

async function consultarApi() {

    try {
        const url = `${location.origin}/api/servicios`;
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
        
    } catch (error) {
        console.log(error);
    }

}

function mostrarServicios(servicios) {
   servicios.forEach( servicio => {
        const { id, nombre, precio } = servicio;

        const nombreServicios = document.createElement('p');
        nombreServicios.classList.add('nombre-servicio');
        nombreServicios.textContent = nombre;

        const precioServicios = document.createElement('p');
        precioServicios.classList.add('precio-servicio');
        precioServicios.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        } 


        servicioDiv.appendChild(nombreServicios);
        servicioDiv.appendChild(precioServicios);

        document.querySelector('#servicios').appendChild(servicioDiv);
   });
}

function seleccionarServicio(servicio) {
    const { id } = servicio; 
    const { servicios } = cita;
    
    // Idenficar el elemento al que se le da click

    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //Comprobar si un servicio ya fue agregado o quitarlo
    if( servicios.some( agregado => agregado.id === servicio.id ) ) {
        // Eliminarlo
        cita.servicios = servicios.filter( agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');

    } else {
        // Agregarlo 
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }

}

function idCliente() {
    cita.id = document.querySelector('#id').value;
}

function nombreCliente(){

    cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');

    inputFecha.addEventListener('input', function(e) {

        const dia = new Date(e.target.value).getUTCDay();
        
        if( [6,0].includes(dia)){
            e.target.value = '';
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
           
        }else {
            cita.fecha = e.target.value;
        }

        
    });
}

function seleccionarHora(){

 const inputHora = document.querySelector('#hora');
 
    inputHora.addEventListener('input', function(e) {

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora > 18){
            e.target.value = '';
            mostrarAlerta('Hora No valida' , 'error', '.formulario');
        }else {
            cita.hora = e.target.value;
        }
    });

}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    
    //Previene que se generen mas de una alerta
    const alertaPrevia = document.querySelector('.alerta');
    
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    // Scripting para crear la alerta

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta'); 
    alerta.classList.add(tipo);


    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if(desaparece){
         //Eliminar la alerta

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }


   

}




function mostrarResumen(){

    const resumen = document.querySelector('.contenido-resumen');

    //limpiar el contenido de Resumen

    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }

     

    if(Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlerta('Faltan datos de servicios, Fechas u Horas', 'error', '.contenido-resumen', false)

        return;
    }

    // Formaterar el div de resumen

    const { nombre, fecha, hora, servicios } = cita;


    //Heading para servicios y resumen

    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    // Iterando y mostrando los servicios

    servicios.forEach(servicio => {

        const { id, precio, nombre } = servicio;


        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('p');
        textoServicio.textContent = nombre;


        const precioServicio = document.createElement('p');
        precioServicio.innerHTML = `<span> Precio </span>: $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);

    });

    
    //Heading para Cita y resumen

    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('p');
    nombreCliente.innerHTML = `<span> Nombre: </span> ${nombre} `;

    //Formater la fecha en español

    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes ,dia));

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX',opciones);


    const fechaCliente = document.createElement('p');
    fechaCliente.innerHTML = `<span> Fecha: </span> ${fechaFormateada} `;

    const horaCliente = document.createElement('p');
    horaCliente.innerHTML = `<span> Hora: </span> ${hora} Horas `;


    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;


    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCliente);
    resumen.appendChild(horaCliente);

    resumen.appendChild(botonReservar);

}

async function reservarCita() {

    const { nombre, fecha, hora, servicios, id } = cita;

    const idServicios = servicios.map( servicio => servicio.id);

    const datos = new FormData();
    
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);

    try {
                // Peticion hacia la api

        const url = `${location.origin}/api/citas`;

        const respuesta = await fetch(url, {

            method : 'POST',
            body : datos
        });

        const resultado = await respuesta.json();

        if(resultado.resultado){
                Swal.fire({
                    icon: "success",
                    title: "Cita Creada",
                    text: "¡Tu cita fue creada Correctamente!",
                    button: "Ok"
                }).then( () => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    
                });
        }

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "!Error a generar una Cita¡",
            
          });
    }



}
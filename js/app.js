const formulario = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos, #tbody'),
    inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners(){
    // Cuando el formulario de crear o editar se ejecuta
    formulario.addEventListener('submit', leerFormulario)

    //Listener para eliminar un boton
    if(listadoContactos){
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    //Buscar

    inputBuscador.addEventListener('input', buscarContactos);

    numeroContactos();
    
}

function leerFormulario(e){
    e.preventDefault();


    //Leer los datos de los inputs

    const nombre = document.querySelector("#nombre").value,
        empresa = document.querySelector("#empresa").value,
        telefono = document.querySelector("#telefono").value,
        accion = document.querySelector("#accion").value;

    if(nombre === '' || empresa === '' || telefono === ''){
        //2 parametros: texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
        
    }else{
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        //console.log(...infoContacto);

        if(accion === 'crear'){
            //Crearemos nuevo contacto
            insertarDB(infoContacto);
        }else{
            //Editar el contacto
            //Leer id
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
        }
    }

}

/** Inserta en la base de datos via Ajax **/

function insertarDB(datos){
    //llamado a jax

    //crear el objeto

    const xhr = new XMLHttpRequest();

    //abrir la conexion

    xhr.open("POST", 'inc/models/modelo-contactos.php', true);


    //pasar los datos
    xhr.onload = function() {
        if(this.status === 200){
            console.log(JSON.parse(xhr.responseText));
            //Leemos la respuesta de php

            const respuesta = JSON.parse(xhr.responseText);
            // console.log(respuesta.empresa);

            //Inserta un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');
            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //Crear botones

            const contenedorAcciones = document.createElement('td');

            //Crear el icono editar

            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //Crear el enlace

            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            //Agregar al padre

            contenedorAcciones.appendChild(btnEditar);

            //Crear el icono de eliminar

            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            //Crear el boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            //Agregarlo al padre

            contenedorAcciones.appendChild(btnEliminar);

            //Agregarlo al trow

            nuevoContacto.appendChild(contenedorAcciones);

            //Agregarlo con los contactos
            listadoContactos.appendChild(nuevoContacto);
            

            //Resetear el formulario
            document.querySelector('form').reset();

            //Msotrar la notificacion
            mostrarNotificacion('Contacto creado correctamente', 'correcto');

            //Actualizar el numero de contactos
            numeroContactos();


        }
    }

    //enviar los datos
    xhr.send(datos);


}

function actualizarRegistro(datos){
    
    // crear el objeto
    const xhr = new XMLHttpRequest();
    
    // abrir la conexión
    xhr.open('POST', 'inc/models/modelo-contactos.php', true);

    // leer la respuesta
    xhr.onload = function() {
        alert('Hola sirvo');
        
         if(this.status === 200) {
            
              const respuesta = JSON.parse(xhr.responseText);

              if(respuesta.respuesta === 'correcto'){
                   // mostrar notificación de Correcto
                   mostrarNotificacion('Contacto Editado Correctamente', 'correcto');
              } else {
                   // hubo un error
                   mostrarNotificacion('Hubo un error...', 'error');
              }
              // Después de 3 segundos redireccionar
              setTimeout(() => {
                   window.location.href = 'index.php';
              }, 4000);
         }

        
    }

    xhr.send(datos);
}

//Eliminar el contacto

function eliminarContacto(e){
    if(e.target.parentElement.classList.contains('btn-borrar')){
        const id = e.target.parentElement.getAttribute('data-id');

        const respuesta = confirm('¿Estas seguro?');

        if(respuesta) {
            // llamado a ajax
            // crear el objeto
            const xhr = new XMLHttpRequest();

            // abrir la conexión
            xhr.open('GET', `inc/models/modelo-contactos.php?id=${id}&accion=borrar`, true);

            // leer la respuesta
            xhr.onload = function() {
                 if(this.status === 200) {
                      const resultado = JSON.parse(xhr.responseText);
                   
                      if(resultado.respuesta == 'correcto') {
                           // Eliminar el registro del DOM
                           console.log(e.target.parentElement.parentElement.parentElement);
                           e.target.parentElement.parentElement.parentElement.remove();

                           // mostrar Notificación
                           mostrarNotificacion('Contacto eliminado', 'correcto');

                           //Actualizar el numero de contactos
                           numeroContactos();

                        //    // Actualizar el número
                        //    numeroContactos();
                      } else {
                           // Mostramos una notificacion
                           mostrarNotificacion('Hubo un error...', 'error' );
                      }

                 }
            }

            // enviar la petición
            xhr.send();
       }
    }
}

//Notificacion en pantalla


function mostrarNotificacion(mensaje, clase){
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion' , 'sombra');
    notificacion.textContent = mensaje;

    //formulario

    formulario.insertBefore(notificacion, document.querySelector('form legend'));

    //Ocultar y Mostrar la notificacion

    setTimeout(() =>{
        notificacion.classList.add('visible');
        setTimeout(()=> {
            notificacion.classList.remove('visible');
            setTimeout(()=> {
                notificacion.remove();
            }, 500);         
        },3000);
    },100);
}

//Buscar contactos

function buscarContactos(e){
    const expresion  =  new RegExp(e.target.value,"i" ),
        registros = document.querySelectorAll('tbody tr');

        registros.forEach(registro => {
            registro.style.display = 'none';

            if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){
                registro.style.display = 'table-row';
            }
            numeroContactos();
        })
}

//Actualizar numero contactos


function numeroContactos(){
    const totalContactos = document.querySelectorAll('tbody tr'),
        contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto => {
        if(contacto.style.display === '' || contacto.style.display === 'table-row'){
            total++;
        }
    });
    contenedorNumero.textContent = total;
}
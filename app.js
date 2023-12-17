let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    apellido: '',
    celular: '',
    correo: ''
}

let editar = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const celularInput = document.querySelector('#celular');
const correoInput = document.querySelector('#correo');
const btnEnviar = document.querySelector('#btnEnviar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(nombreInput.value === '' || apellidoInput.value === '' || celularInput.value === '' || correoInput.value === ''){
        alert('Por favor ingrese todos los datos');
        return;
    }

    if (editar){
        editarPersona();
        editar = false;
       
    }else{
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.apellido = apellidoInput.value;
        objEmpleado.celular = celularInput.value;
        objEmpleado.correo = correoInput.value;
        agregandoPersona();
       

    }


}

function agregandoPersona(){
    //PUSH - agregar valores
    listaEmpleados.push({...objEmpleado});
    //mostrar
    mostrarPersona();
    formulario.reseat();
    limpiarObjetos();
  

}

function limpiarObjetos(){
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.apellido = '';
    objEmpleado.celular = '';
    objEmpleado.correo = '';
}

function limpiarHtml(){
    const divEmpleado = document.querySelector('.div-empleados');
    while (divEmpleado.firstChild){
        divEmpleado.removeChild(divEmpleado.firstChild);
    }
}

function mostrarPersona(){

    limpiarHtml();
    const divEmpleado = document.querySelector('.div-empleados');

    listaEmpleados.forEach(persona => {
        const {id, nombre, apellido, celular, correo} = persona;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id}  ${nombre}  ${apellido} - ${celular} - ${correo}`
        parrafo.dataset.id = id;

        
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(persona);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);
        
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleado.appendChild(parrafo);
        divEmpleado.appendChild(hr);
    })
}

function cargarEmpleado(persona){
    const {id, nombre, apellido, celular, correo} = persona;
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    celularInput.value = celular;
    correoInput.value = correo;
    objEmpleado.id = id;

    formulario.querySelector('button[type ="submit"]').textContent = 'Actualizar';
    editar = true;

    
    
}

function eliminarEmpleado(id){
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
        
    mostrarPersona();
}

function editarPersona(){
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.apellido = apellidoInput.value;
    objEmpleado.celular = celularInput.value;
    objEmpleado.correo = correoInput.value;

    listaEmpleados.map(persona => {
        if (persona.id === objEmpleado.id) {
            //persona.id = objEmpleado.id; actualiza la edición pero inserta otro
            persona.nombre = objEmpleado.nombre;
            persona.apellido = objEmpleado.apellido;
            persona.celular = objEmpleado.celular;
            persona.correo = objEmpleado.correo;
        }

        mostrarPersona();
    });

    limpiarHtml();
}

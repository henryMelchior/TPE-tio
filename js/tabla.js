"use strict"

const url = "https://62c458ff7d83a75e39f78aa6.mockapi.io/api/recitales";

let tablarest = document.querySelector("#tabla");
document.querySelector("#btn_agregar").addEventListener("click", enviarDatos);
let cuando = document.querySelector("#input_cuando");
let quien = document.querySelector("#input_quien");
let donde = document.querySelector("#input_donde");
let id = 0;
let btnConfirmarEdicion = document.querySelector("#btn_confirmar_edicion");
let btnAgregar = document.querySelector("#btn_agregar");
let btnBuscar = document.querySelector("#btn_buscar").addEventListener("click", function () {
    inputBusqueda.classList.remove("esconder");
});
let inputBusqueda = document.querySelector("#input_buscar");
inputBusqueda.addEventListener("keyup", filtrado);
let arregloDatos = [];


async function obtenerDatos() {
    try {
        let res = await fetch(url);
        let json = await res.json();
        console.log(json);
        arregloDatos = json;
        mostrarTabla(json);
    } catch (error) {
        console.log(error)
    }
}

function mostrarTabla(json) {
    tablarest.innerHTML = "";
    for (const tabla of json) {
        let cuando = tabla.cuando;
        let quien = tabla.quien;
        let donde = tabla.donde;
        id = tabla.id;





        let fila = document.createElement('tr');
            
        let td = document.createElement('td');
        td.innerHTML = cuando;
        fila.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = quien;
        fila.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = donde;
        fila.appendChild(td);
        td = document.createElement('td')
        let btn = document.createElement('button')
        btn.innerHTML= "borrar"
        btn.name = id;
        btn.dataButtonname = id;
        td.appendChild(btn);
        fila.appendChild(td);
        btn.addEventListener("click", ()=>{
            eliminar(id);
        });
        td = document.createElement('td')
        let btnModificar = document.createElement('button')
        btnModificar.innerHTML= "modificar";
        btnModificar.name = id;
        btnModificar.dataButtonname = id;
        td.appendChild(btnModificar);
        fila.appendChild(td);
        btnModificar.addEventListener("click", ()=>{
            enviarModificacion(id);
        });

        



        
        tablarest.appendChild(fila)
    }
    let btnEliminar = document.querySelectorAll(".btn_eliminar");
    let btnEditar = document.querySelectorAll(".btnEditar");

    for (const boton of btnEliminar) {
        boton.addEventListener("click", () => eliminar(boton.id));
    }

    for (const btnEditar of btnEditar) {
        btnEditar.addEventListener("click", () => mostrarBtnEditar(btnEditar.id));
    }
}
obtenerDatos();


async function enviarDatos() {

    let valores = {
        "cuando": cuando.value,
        "quien": quien.value,
        "donde": donde.value
    };
    try {
        let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            body: JSON.stringify(valores)
        });
        if (res.ok) {
            console.log("Enviado Correctamente");
        } else {
            console.log("Hubo un error al enviar");
        }
    } catch (error) {
        console.log(error);

    }
    resetInputs();
    obtenerDatos();
}

async function eliminar(id) {
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "DELETE"
        });
        if (res.ok) {
            console.log("Eliminado con exito");
        }
        else {
            console.log("Hubo un problema al eliminar");
        }

    } catch (error) {

    }
    obtenerDatos();
}


function mostrarBtnEditar(id) {

    btnConfirmarEdicion.classList.remove("esconder");
    btnAgregar.classList.add("esconder");
    btnConfirmarEdicion.addEventListener("click", () => enviarModificacion(id));
}


async function enviarModificacion(id) {
    btnConfirmarEdicion.classList.add("esconder");
    btnAgregar.classList.remove("esconder");

    let valores = {
        "cuando": cuando.value,
        "quien": quien.value,
        "donde": donde.value
    };

    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(valores)
        });
        if (res.ok) {
            console.log("Eliminado con exito");
        }
        else {
            console.log("Hubo un problema al eliminar");
        }

    } catch (error) {
        console.log(error);
    }
    resetInputs();
    obtenerDatos();

}


function filtrado() {
    let arregloAux = [];

    for (let e = 0; e < arregloDatos.length; e++) {
        if (arregloDatos[e].quien.includes(inputBusqueda.value)) {
            arreglo_aux.push(arregloDatos[e]);
        }
    }
    mostrarTabla(arreglo_aux)

}

function resetInputs() {
    cuando.value = "";
    quien.value = "";
    donde.value = "";
}

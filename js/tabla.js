"use strict"

const url = "https://62c458ff7d83a75e39f78aa6.mockapi.io/api/recitales";

let tablarest = document.querySelector("#tabla");
document.querySelector("#btn_agregar").addEventListener("click", enviarDatos);
let cuando = document.querySelector("#input_cuando");
let quien = document.querySelector("#input_quien");
let donde = document.querySelector("#input_donde");
let id = 0;
let btn_confirmar_edicion = document.querySelector("#btn_confirmar_edicion");
let btn_agregar = document.querySelector("#btn_agregar");
let btn_buscar = document.querySelector("#btn_buscar").addEventListener("click", function () {
    input_busqueda.classList.remove("esconder");
});
let input_busqueda = document.querySelector("#input_buscar");
input_busqueda.addEventListener("keyup", filtrado);
let arreglo_datos = [];


async function obtenerDatos() {
    try {
        let res = await fetch(url);
        let json = await res.json();
        console.log(json);
        arreglo_datos = json;
        mostrar_tabla(json);
    } catch (error) {
        console.log(error)
    }
}

function mostrar_tabla(json) {
    tablarest.innerHTML = "";
    for (const tabla of json) {
        let cuando = tabla.cuando;
        let quien = tabla.quien;
        let donde = tabla.donde;
        id = tabla.id;
<<<<<<< HEAD





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
            enviar_modificacion(id);
        });

        



        
        tablarest.appendChild(fila)
=======
        tablarest.innerHTML +=
            `<tr>
        <td>${cuando}</td>
        <td>${quien}</td>
        <td>${donde}</td>
        <td><button id=${tabla.id} class="btn_eliminar">Eliminar</button>
        <td><button id=${tabla.id} class="btn_editar">Editar</button>
        </tr>`
>>>>>>> cb200e581c574d4ce2939209de7f39044ab218c2
    }
    let botones_eliminar = document.querySelectorAll(".btn_eliminar");
    let botones_editar = document.querySelectorAll(".btn_editar");

    for (const boton of botones_eliminar) {
        boton.addEventListener("click", () => eliminar(boton.id));
    }

    for (const btn_editar of botones_editar) {
        btn_editar.addEventListener("click", () => mostrar_btn_editar(btn_editar.id));
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
    reset_inputs();
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


function mostrar_btn_editar(id) {

    btn_confirmar_edicion.classList.remove("esconder");
    btn_agregar.classList.add("esconder");
    btn_confirmar_edicion.addEventListener("click", () => enviar_modificacion(id));
}


async function enviar_modificacion(id) {
    btn_confirmar_edicion.classList.add("esconder");
    btn_agregar.classList.remove("esconder");

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
    reset_inputs();
    obtenerDatos();

}


function filtrado() {
    let arreglo_aux = [];

    for (let e = 0; e < arreglo_datos.length; e++) {
        if (arreglo_datos[e].quien.includes(input_busqueda.value)) {
            arreglo_aux.push(arreglo_datos[e]);
        }
    }
    mostrar_tabla(arreglo_aux)

}

function reset_inputs() {
    cuando.value = "";
    quien.value = "";
    donde.value = "";
}

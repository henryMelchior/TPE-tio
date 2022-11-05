let artista = document.querySelector("#artista");
let btn = document.querySelector("#btn-mostrarArtista");

let elementosLi = document.getElementsByClassName("artistaRank");
let artistaRandom = Math.floor(Math.random()*(elementosLi.length));


btn.addEventListener("click",recomendarArtista);

function recomendarArtista(){ 
    artista.innerHTML = elementosLi[artistaRandom].innerHTML;
}
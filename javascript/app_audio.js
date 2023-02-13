const button = document.querySelectorAll(".album");
let a = new Array();
var repro_canciones;
var caja_canciones;
let div_caja1 = document.querySelector(".caja1 ");
var tema = document.querySelector("#cancion");
// tema.volume = 0.5;
Array.from(document.querySelectorAll(".album")).forEach((element) => {
  element.firstElementChild.addEventListener("click", function () {
    let comparativa = element.lastElementChild.innerText;
    // let clase_lista = document.querySelector(".lista");
    fetch("./Json/albunes.json")
      .then((data) => data.json())
      .then((data) => {
        alert("Creando Reproductor de : " + comparativa);
        for (let index = 0; index < data.albunes.length; index++) {
          if (comparativa == data.albunes[index].album) {
            // let repro_canciones = document.querySelector(".reproductor");
            if (document.querySelector(".lista")) {
              var d_nested = document.querySelector(".lista");
              div_caja1.removeChild(d_nested);
              var d_nested_2 = document.querySelector(".cromo");
              while (d_nested_2.firstChild) {
                d_nested_2.removeChild(d_nested_2.firstChild);
              }
              let as = document.querySelector(".reproductor");
              var banner = document.querySelector(".crearbanner");
              as.removeChild(banner);
              /*Creacion reproductor cancion*/
              crearReproductor(data, comparativa);
              crearLista(
                data.albunes[index].canciones.length,
                index,
                data,
                div_caja1
              );

              crearbannerRepro(data, comparativa);
              // eventos_lista(comparativa, data);
              eventos_lista(data, comparativa);
            } else {
              /*Creacion reproductor cancion*/
              crearReproductor(data, comparativa);
              crearLista(
                data.albunes[index].canciones.length,
                index,
                data,
                div_caja1
              );

              crearbannerRepro(data, comparativa);
              // eventos_lista(comparativa, data);
              eventos_lista(data, comparativa);
            }
          }
        }
      });
  });
});

function crearLista(numero_array, index, data, div_caja1) {
  caja_canciones = document.createElement("div");
  caja_canciones.classList.add("lista");

  let titulo = document.createElement("h1");
  titulo.setAttribute("style", "color:red;");
  let ul_lista = document.createElement("ul");

  a = numero_array;

  for (let i = 0; i < a; i++) {
    let li_lista = document.createElement("li");
    li_lista.setAttribute("style", "color:white");
    li_lista.classList.add("btn_cancion");
    li_lista.append(data.albunes[index].canciones[i].titulo);
    ul_lista.appendChild(li_lista);
  }
  titulo.append(data.albunes[index].album);
  caja_canciones.appendChild(titulo);
  caja_canciones.appendChild(ul_lista);

  div_caja1.appendChild(caja_canciones);
}

function crearReproductor(data, comparativa) {
  comparativa = comparativa + ".jpg";

  for (let index = 0; index < data.albunes.length; index++) {
    if (comparativa == data.albunes[index].portada) {
      let contenedor_cromo = document.querySelector(".cromo");
      let cromo_img = document.createElement("img");
      let cromo_p = document.createElement("h3");
      cromo_img.src = "./images/" + data.albunes[index].portada;
      cromo_p.append(data.albunes[index].album);
      contenedor_cromo.appendChild(cromo_img);
      contenedor_cromo.appendChild(cromo_p);
    }
  }
}
function crearbannerRepro() {
  let cuerpo = document.querySelector("body");
  let pie = document.querySelector("footer");

  // let seccion = document.createElement("section");
  // seccion.classList.add("crearbanner");
  let contenido = document.createElement("div");
  contenido.classList.add("crearbanner");

  contenido.innerHTML = ` 
  <div id="contenedor_barra">
    <h2 id="seleccionada"></h2>
    <input id="barra" type="range" name="" min="" value="0" />
  </div>
  <div class="flex controles">
    <div>
      <img id="anterior" src="./images/cancion_anterior.svg" alt=" " />
      <img id="play" src="./images/play.svg" alt=" " />
      <img id="stop" src="./images/stop.svg" alt="" />
      <img id="siguiente" src="./images/cancion_siguiente.svg" alt="" />
      <img id="loop" src="./images/repetir.svg" alt="" />
      <img id="random" src="./images/random.svg" alt="" />
    </div>
    <div class="flex">
      <img id="mute" src="./images/volumen_menos.svg" alt=" " />
      <input
        id="volumen"
        type="range"
        name=""
        min="0"
        max="1"
        step="any"
      />
      <img id="volum_max" src="./images/volumen_mas.svg" alt="" />
    </div>
  </div>

  `;

  let a = document.querySelector(".reproductor");
  a.appendChild(contenido);
}
function eventos_lista(data, comparativa) {
  // comparativa, data
  let lista_accion = document.querySelectorAll(".btn_cancion");
  for (let index = 0; index < lista_accion.length; index++) {
    lista_accion[index].addEventListener("click", function () {
      añadir_audio(data, comparativa);
    });
  }

  // let li_lista = document.querySelectorAll("li");
  // console.log(li_lista.length);

  // for (let index = 0; index < li_lista.length; index++) {
  //   console.log(li_lista);
  //   li_lista.addEventListener("click", function () {
  //     console.log("hola");
  //     añadir_audio(data, comparativa);
  //   });
  // }
}
function añadir_audio(data, comparativa) {
  console.log("HOLA");
  for (let index = 0; index < data.albunes.length; index++) {
    if (comparativa == data.albunes[index])
      for (let x = 0; x < data.albunes[index].canciones.length; x++) {
        // let el_audio = document.createElement("audio");
        let el_audio;
        el_audio.innerHTML = ` <audio id="cancion" autoplay src="./audio/${data.albunes[index].album}/${data.albunes[index].canciones[x].ruta}">
        Texto para navegadores que no soportan la etiqueta audio...
      </audio>`;
        let cancion = data.albunes[index].canciones[x].ruta;
        console.log(cancion);
      }
  }
}

// function reproducir() {
//   console.log("reproduccion cancion");
//   // tema.play();
// }
// function parar() {
//   tema.pause();
//   tema.currentTime = 0;
//   boton_play.src = "./images/play.svg";
// }

// function controles() {
//   let boton_play = document.querySelector("#play");
//   boton_play.addEventListener("click", reproducir);

//   document.querySelector("#stop").addEventListener("click", parar);
// }

const button = document.querySelectorAll(".album");
let a = new Array();
var repro_canciones;
var caja_canciones;

Array.from(document.querySelectorAll(".album")).forEach((element) => {
  element.firstElementChild.addEventListener("click", function () {
    alert("Hello!");
    let comparativa = element.lastElementChild.innerText;
    let clase_lista = document.querySelector(".lista");
    fetch("./Json/albunes.json")
      .then((data) => data.json())
      .then((data) => {
        for (let index = 0; index < data.albunes.length; index++) {
          if (comparativa == data.albunes[index].album) {
            let repro_canciones = document.querySelector(".reproductor");
            if (document.querySelector(".lista")) {
              var d_nested = document.querySelector(".lista");
              repro_canciones.removeChild(d_nested);
              var d_nested_2 = document.querySelector(".cromo");
              while (d_nested_2.firstChild) {
                d_nested_2.removeChild(d_nested_2.firstChild);
              }
              let as = document.querySelector("body");
              var banner = document.querySelector(".crearbanner");
              as.removeChild(banner);

              // repro_canciones.removeChild(d_nested_2);
              crearLista(
                data.albunes[index].canciones.length,
                index,
                data,
                repro_canciones
              );
              crearReproductor(data, comparativa);
              crearbannerRepro();

              /*Creacion reproductor cancion*/
            } else {
              crearLista(
                data.albunes[index].canciones.length,
                index,
                data,
                repro_canciones
              );
              /*Creacion reproductor cancion*/
              crearReproductor(data, comparativa);
              crearbannerRepro();
            }
          }
        }
      });
  });
});

function crearLista(numero_array, index, data, repro_canciones) {
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
    li_lista.addEventListener("click", () => {
      console.log("hola");
    });
    ul_lista.appendChild(li_lista);
  }
  titulo.append(data.albunes[index].album);
  caja_canciones.appendChild(titulo);
  caja_canciones.appendChild(ul_lista);

  repro_canciones.appendChild(caja_canciones);
}

function crearReproductor(data, comparativa) {
  comparativa = comparativa + ".jpg";

  for (let index = 0; index < data.albunes.length; index++) {
    // console.log(data.albunes[index].portada);
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
  console.log("crearbannerRepro");
  let cuerpo = document.querySelector("body");
  let pie = document.querySelector("footer");

  let seccion = document.createElement("section");
  seccion.classList.add("crearbanner");
  let contenido = document.createElement("div");

  contenido.innerHTML = ` <div>
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
  // console.log(contenido);

  seccion.append(contenido);
  console.log(seccion);
  cuerpo.insertBefore(seccion, pie);
}

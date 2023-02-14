const button = document.querySelectorAll(".album");
// let a = new Array();
let Album_numero;
var caja_canciones;
let div_caja1 = document.querySelector(".caja1 ");

/*Recorrido de json  para albunes*/
Array.from(document.querySelectorAll(".album")).forEach((element) => {
  /* Eventos a Fotos  Album*/
  element.firstElementChild.addEventListener("click", function () {
    /*     Obtencion de valor de texto p     */

    let comparativa = element.lastElementChild.innerText;
    /*Apertura de Fetch 1 , le pasamos el valor de p dentro de la caja de Album*/
    Recorrido_1(comparativa);

    /*Cierre del fetch 1*/
  });
  /*Cierre Array de Albunes en html*/
});

function Recorrido_1(valor_p) {
  /*Apertura de Fetch 1 */
  fetch("./Json/albunes.json")
    .then((data) => data.json())
    .then((data) => {
      /* Aviso de craecion de reproductor */
      alert("Creando Reproductor de : " + valor_p);
      /*Recorremos nombres de los albunes en el JSON */
      for (let index = 0; index < data.albunes.length; index++) {
        /*   Comparamos el valor_p con la informacion del nombre del Album */
        if (valor_p == data.albunes[index].album) {
          /* Guardo posicion del album para mi evento de lista */
          Album_numero = data.albunes[index].album;
          /*  Comprobamos si existe la clase lista den el HTML */
          if (document.querySelector(".lista")) {
            /* Eliminamos tanto la caratural del album como la respectiva lista y su banner */

            /* Eliminacion de lista */
            var d_nested = document.querySelector(".lista");
            div_caja1.removeChild(d_nested);
            /* Eliminacion de cromo/Caratula */
            var d_nested_2 = document.querySelector(".cromo");
            while (d_nested_2.firstChild) {
              d_nested_2.removeChild(d_nested_2.firstChild);
            }
            /*Eliminacion de Banner */
            let as = document.querySelector(".reproductor");
            var banner = document.querySelector(".crearbanner");
            as.removeChild(banner);
            /*Creacion reproductor cancion*/
            crearReproductor(data, valor_p);
            /*Creacion de Lista */
            crearLista(
              data.albunes[index].canciones.length,
              index,
              data,
              div_caja1
            );
            /* Creacion de Banner reproductor */
            crearbannerRepro(data, valor_p);
          } else {
            //En caso de que no exista la clase lista simplemente creamos todo

            /*Creacion reproductor cancion*/
            crearReproductor(data, valor_p);
            /*Creacion de Lista */
            crearLista(
              data.albunes[index].canciones.length,
              index,
              data,
              div_caja1
            );
            /* Creacion de Banner reproductor */
            crearbannerRepro(data, valor_p);

            eventos_lista();
          }
        }
      }
    });
}

/* 
Funcion que recibe los parametros del numero de canciones segun que album,
posicion(index) del album seleccionado, pasaremos tambine el fetch (data)
y de ultimo le pasaremos el contenedor donde va integrado el codigo de las lista */

function crearLista(numero_array, index, data, div_caja1) {
  /*Creamos div class="lista" y un titulo de album con h1  */
  caja_canciones = document.createElement("div");
  caja_canciones.classList.add("lista");

  let titulo = document.createElement("h1");
  titulo.setAttribute("style", "color:red;");
  /* Creamos UL  */
  let ul_lista = document.createElement("ul");
  /* pasaremos el valor de la posicion de album para otra variable dentro de esta funcion */
  contenedor_array = numero_array;
  /* Bucle para crear tantas li como canciones existan */
  for (let i = 0; i < contenedor_array; i++) {
    let li_lista = document.createElement("li");
    li_lista.setAttribute("style", "color:white");
    li_lista.classList.add("btn_cancion");
    li_lista.append(data.albunes[index].canciones[i].titulo);
    ul_lista.appendChild(li_lista);
  }
  titulo.append(data.albunes[index].album);
  /* Insertamos titulo y lista en la caja_canciones */
  caja_canciones.appendChild(titulo);
  caja_canciones.appendChild(ul_lista);
  /* Y a su vez agregamos en el contenedor de div_caja1 el div  caja_canciones */
  div_caja1.appendChild(caja_canciones);
}

/* Funcion que recibe los parametros fetch (data), y el p de dentro de los Albunes
 (en el codigo HTML) */

function crearReproductor(data, campo_p) {
  /* Concatenamos el valor de los p que tiene la Lista de ALBUM (parte de arriba) con la extension.jpg */
  campo_p = campo_p + ".jpg";
  /* Realizamos un bucle al json de las portadas para ver si su nombre es igual al nuestro  */
  for (let index = 0; index < data.albunes.length; index++) {
    if (campo_p == data.albunes[index].portada) {
      /* Una vez comprobado buscamos la clase "cromo" y le agregamos la imagen
       con su respectivo titulos debajo  */
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

/* Funcion que se encargara de crear nuestro div de reproduccion de musica (player)*/
function crearbannerRepro() {
  /* Creamos div  class="crearbanner" */
  let contenido = document.createElement("div");
  contenido.classList.add("crearbanner");
  /* Insertamos el codigo Html dentro de nuestro div->contenido */
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
  /* Seleccionamos la el div donde insertaremos el reproductor y agregamos nuestro contenido 
    que previamente habremos escrito con innerHTML*/
  let caja_reproductor_principal = document.querySelector(".reproductor");
  caja_reproductor_principal.appendChild(contenido);
}

/* Creacion de "solo" evento li */
function eventos_lista() {
  /* let  que recoje todos los li con la clase "btn_cancion" dentro del HTML  */
  let lista_accion = document.querySelectorAll(".btn_cancion");
  /* Bucle para recorrerlo todos los li y añadirles un evento "click" */
  for (let index = 0; index < lista_accion.length; index++) {
    lista_accion[index].addEventListener("click", function () {
      console.log("agregando audio");
    });
  }
}

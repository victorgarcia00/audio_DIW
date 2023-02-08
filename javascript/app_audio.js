// let nombre_album = document.getElementsByClassName("album");
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
              crearLista(
                data.albunes[index].canciones.length,
                index,
                data,
                repro_canciones
              );
              // caja_canciones = document.createElement("div");
              // caja_canciones.classList.add("lista");
              // // for (let index = 0; index < nombre_album.length; index++) {
              // let titulo = document.createElement("h1");
              // titulo.setAttribute("style", "color:red;");
              // let ul_lista = document.createElement("ul");

              // a = data.albunes[index].canciones.length;

              // for (let i = 0; i < a; i++) {
              //   let li_lista = document.createElement("li");
              //   li_lista.setAttribute("style", "color:white");

              //   li_lista.append(data.albunes[index].canciones[i].titulo);
              //   ul_lista.appendChild(li_lista);
              // }
              // titulo.append(data.albunes[index].album);
              // caja_canciones.appendChild(titulo);
              // caja_canciones.appendChild(ul_lista);
              // // }
              // repro_canciones.appendChild(caja_canciones);
            } else {
              crearLista(
                data.albunes[index].canciones.length,
                index,
                data,
                repro_canciones
              );
              // caja_canciones = document.createElement("div");
              // caja_canciones.classList.add("lista");
              // // for (let index = 0; index < nombre_album.length; index++) {
              // let titulo = document.createElement("h1");
              // titulo.setAttribute("style", "color:red;");
              // let ul_lista = document.createElement("ul");

              // a = data.albunes[index].canciones.length;

              // for (let i = 0; i < a; i++) {
              //   let li_lista = document.createElement("li");
              //   li_lista.setAttribute("style", "color:white");

              //   li_lista.append(data.albunes[index].canciones[i].titulo);
              //   ul_lista.appendChild(li_lista);
              // }
              // titulo.append(data.albunes[index].album);
              // caja_canciones.appendChild(titulo);
              // caja_canciones.appendChild(ul_lista);
              // // }
              // repro_canciones.appendChild(caja_canciones);
            }
          }
        }
      });
  });
});

function crearLista(numero_array, index, data, repro_canciones) {
  caja_canciones = document.createElement("div");
  caja_canciones.classList.add("lista");
  // for (let index = 0; index < nombre_album.length; index++) {
  let titulo = document.createElement("h1");
  titulo.setAttribute("style", "color:red;");
  let ul_lista = document.createElement("ul");

  a = numero_array;

  for (let i = 0; i < a; i++) {
    let li_lista = document.createElement("li");
    li_lista.setAttribute("style", "color:white");

    li_lista.append(data.albunes[index].canciones[i].titulo);
    ul_lista.appendChild(li_lista);
  }
  titulo.append(data.albunes[index].album);
  caja_canciones.appendChild(titulo);
  caja_canciones.appendChild(ul_lista);
  // }
  repro_canciones.appendChild(caja_canciones);
}

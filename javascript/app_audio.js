let nombre_album = document.getElementsByClassName("album");
let a = new Array();

// console.log(nombre_album[0].innerText);
fetch("./Json/albunes.json")
  .then((data) => data.json())
  .then((data) => {
    for (let a = 0; a < nombre_album.length; a++) {
      console.log(data.albunes[a].album);
    }

    let cuerpo = document.querySelector("body");
    let pie = document.querySelector("footer");
    let seccion = document.createElement("section");
    seccion.classList.add("seccion_musica");

    let caja_canciones = document.createElement("div");
    caja_canciones.classList.add("lista");
    for (let index = 0; index < nombre_album.length; index++) {
      let titulo = document.createElement("h1");
      titulo.setAttribute("style", "color:red;");
      let ul_lista = document.createElement("ul");

      a = data.albunes[index].canciones.length;
      // console.log(a);
      console.log("entrada a li ");

      for (let i = 0; i < a; i++) {
        console.log("dentro ");
        console.log(data.albunes[index].canciones[i].titulo);
        //  console.log(i);
        let li_lista = document.createElement("li");
        li_lista.setAttribute("style", "color:white");
        // li_lista.innerHTML = `${data.albunes[index].canciones[i].titulo}`;
        li_lista.append(data.albunes[index].canciones[i].titulo);
        ul_lista.appendChild(li_lista);
        // console(a[index]);
      }
      titulo.append(data.albunes[index].album)
      caja_canciones.appendChild(titulo);
      caja_canciones.appendChild(ul_lista);
    }
    seccion.appendChild(caja_canciones);
    cuerpo.insertBefore(seccion, pie);
  });

fetch("./albunes.json")
  .then((data) => data.json())
  .then((data) => {
    // console.log(data);

    //     let pie = document.querySelector("footer");
    //     let seccion = document.createElement("seccion");
    //     let div_cartas = document.createElement("div");
    //     div_cartas.classList.add("caja_cartas");
    //     let carta_album = document.createElement("div");
    //     carta_album.classList.add("carta");

    //     carta_album.innerHTML = `<img src="${Album.album.images[0].url}" alt="${Album.album.name}" />`;
    //     div_cartas.appendChild(carta_album);
    //     seccion.appendChild(div_cartas);
    //     insertBefore(pie, seccion);
    //     let Album = data;
    console.log(data);
    // console.log(Album.artista);
    // console.log(Album.canciones.titulo);
    // console.log(Album.canciones.duracion);
    // console.log(Album.canciones.ruta);
    // console.log(personaje.name);
    // console.log(personaje.location.name);
  });

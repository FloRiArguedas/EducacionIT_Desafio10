import "./css/style.css";

//* Floricela Arguedas - Desafío #10

//? Ejercicio 1: Obtener un chiste aleatorio

// API: Utiliza la API gratuita de chistes de https://icanhazdadjoke.com/
// Tarea:
// Realiza una petición GET a la API.
// Extrae el texto del chiste de la respuesta JSON.
// Muestra el chiste en un elemento HTML (por ejemplo, un <div> con el id "chiste").

console.warn("Ejercicio #1");

console.log( "Es posible que el resultado de este ejercicio, se muestre de último en la consola, sin embargo se puede visualizar en el HTML")

const urlchiste = "https://icanhazdadjoke.com/";

//Peticion GET

function getAllPost1() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", urlchiste);

  xhr.setRequestHeader("Accept", "application/json");

  xhr.send();

  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      //Convierto la respuesta JSON a un objeto
      const respuesta = JSON.parse(xhr.responseText);
      //Muestro el chiste que está dentro del objeto en consola
      console.log(respuesta["joke"]);
      //Selecciono el DIV donde voy a mostrar el chiste por medio del ID
      const htmldiv = document.getElementById("chiste");
      //Muestro en el div el chiste que viene en el objeto respuesta
      htmldiv.textContent = respuesta["joke"];
    } else {
      console.log("Algo no salio bien!");
    }
  });
}
//Llamado a la función
getAllPost1();

//!----------------------------SIGUIENTE EJERCICIO ------------------------------
//? Ejercicio 2: Listar publicaciones de un blog

// API: Utiliza la API JSONPlaceholder (https://jsonplaceholder.typicode.com/posts)
// Tarea:
// Realiza una petición GET a la API para obtener una lista de publicaciones.
// Opcional: Muestra el título y un extracto de cada publicación en una lista HTML.
// Opcional: Agrega un enlace a cada publicación que lleve a una página con los detalles completos (puedes usar un id ficticio para la URL).

const urlJPH = "https://jsonplaceholder.typicode.com/posts";

console.warn("Ejercicio #2");
console.log("Ejercicio 2 - Ver resultados en el HTML");

//Peticion GET
function getAllPost2() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", urlJPH);

  //xhr.setRequestHeader('Accept', 'application/json');

  xhr.send();

  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      //console.log(xhr.response)

      //Convierto la respuesta.
      const respuesta = JSON.parse(xhr.response);
      //Creo variables para extraer lo necesario.
      let title;
      let body;
      //Selecciono la lista del HTML
      const htmllist = document.getElementById("lista");

      //Recorro la respuesta, extraigo la información de los objetos y creo un elemento lista para cada uno.
      respuesta.forEach((element) => {
        title = element["title"];
        body = element["body"];
        const lista = document.createElement("li");
        lista.textContent = "TITULO: " + title + " EXTRACTO: " + body;
        htmllist.append(lista);
      });
    } else {
      console.log("Algo no salio bien!");
    }
  });
}
//Llamado a la función
getAllPost2();

//!----------------------------SIGUIENTE EJERCICIO ------------------------------

//? Ejercicio 3: Buscador de películas
// API: OMDb API (http://www.omdbapi.com/) (necesitarás una clave API gratuita)
// Tarea:
// Crea un formulario con un campo de búsqueda para que el usuario ingrese el título de una película.
// Al enviar el formulario, realiza una petición a la API OMDb con el título ingresado.
// Opcional: Muestra los resultados (título, póster, año, etc.) en una lista o cuadrícula.

console.warn("Ejercicio #3");

console.log(
  "Para este ejercicio, llene el formulario y de click en el botón Buscar Película"
);

const form3 = document.querySelector("#form-E3");

const urlomd = "http://www.omdbapi.com/?t=";

//Obtengo la información del form
form3.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputpeli = form3.querySelector("#peli").value;
  console.log("La película a buscar es: ", inputpeli);
  let infoobtenida;
  //Función para realizar la petición
  async function solicitarpelicula() {
    try {
      const Urlarmada =
        urlomd + `${inputpeli}&apikey=${import.meta.env.VITE_API_KEY} `;
      const respuesta = await fetch(Urlarmada);

      if (!respuesta.ok) {
        throw new Error("No se pudo hacer la peticion", respuesta.status);
      }

      infoobtenida = await respuesta.json();

      console.log(infoobtenida);

      //Se envía la respuesta al HTML

      //Variables para extraer información

      let titulo = infoobtenida.Title;
      let year = infoobtenida.Year;
      let runtime = infoobtenida.Runtime;
      let genre = infoobtenida.Genre;
      let poster = infoobtenida.Poster;

      //Selecciono la lista del HTML
      const listaE3 = document.getElementById("pelibuscada");

      //Creo los elementos lista con la información obtenida
      const tituloPeli = document.createElement("li");
      tituloPeli.textContent = "Titulo: " + titulo;
      listaE3.append(tituloPeli);

      const anioPeli = document.createElement("li");
      anioPeli.textContent = "Año: " + year;
      listaE3.append(anioPeli);

      const duracionPeli = document.createElement("li");
      duracionPeli.textContent = "Duración: " + runtime;
      listaE3.append(duracionPeli);

      const generoPeli = document.createElement("li");
      generoPeli.textContent = "Genero: " + genre;
      listaE3.append(generoPeli);

      const posterPeli = document.createElement("li");
      posterPeli.innerHTML =
        "Poster: " + '<img src="' + poster + '" alt="Poster">'; //Lo inserto como imagen al HTML
      listaE3.append(posterPeli);
    } catch (error) {
      console.error("[solicitarpelicula]", error);
    }
  }
  solicitarpelicula(); //Se hace la petición
});

//Ejemplos de la URL
//http://www.omdbapi.com/?apikey=[yourkey]&
//http://www.omdbapi.com/?i=tt3896198&apikey=d19babaf

//APY KEY: d19babaf

//!----------------------------SIGUIENTE EJERCICIO ------------------------------

//? Ejercicio 4: Buscador de imágenes aleatorias
// API: Unsplash API (https://unsplash.com/developers) (necesitarás una clave API gratuita)
// Tarea:
// Crea un formulario con un campo de búsqueda para que el usuario ingrese la palabra a buscar.
// Al enviar el formulario, realiza una petición a la unsplash con el título ingresado.
// Opcional: Mostrar en formato galeria las imagenes recibidas por la API.

console.warn("Ejercicio #4");
console.log(
  "Para este ejercicio, llene el formulario y de click en el botón Buscar Imagen"
);

const form4 = document.querySelector("#form-E4");

const urlunplash = "https://api.unsplash.com/search/photos/?query=";

//Obtengo la información del form
form4.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputimg = form4.querySelector("#imagen").value;
  console.log("La imagen a buscar es: ", inputimg);

  let repuesta;

  //Función para realizar la petición
  async function solicitarimagen() {
    try {
      const Urlarmada = urlunplash + `${inputimg}&client_id=${import.meta.env.VITE_API_KEY_UNP} `;
      const respuesta = await fetch(Urlarmada);

      if (!respuesta.ok) {
        throw new Error("No se pudo hacer la peticion", respuesta.status);
      }

      let respuestajson = await respuesta.json();
      console.log(respuestajson);

      //MOSTRAR EN EL HTML las imágenes

      //Selecciono el div del HTML
      const divE4 = document.getElementById("imagenbuscada");

      let array = respuestajson["results"]


      //Recorro la respuesta, extraigo la información de los objetos y creo un elemento lista para cada uno.
      array.forEach((element) => {
        let img = element["links"]["download"];
        const imagenmostrar = document.createElement("img");
        imagenmostrar.src = img 
        divE4.appendChild(imagenmostrar)
        
      });
    } catch (error) {
      console.error("[solicitarimagen]", error);
    }
  }

  solicitarimagen();
});

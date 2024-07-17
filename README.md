# Pasos a seguir

1. Descomprimo
2. Abrirlo en Visual Studio Code
3. Abro la consola
4. Recupero las depedencias (Los paquetes, las librerías)

```sh
npm i # npm install
```

5. Levanto el servidor de desarrollo

```sh
npm run dev
```  

<script src="">

      const btn = document.querySelector("button")

      btn.addEventListener('submit', function(e) {

        e.preventDefault()

        

        const valorBuscado = inputBusqueda.value

        getPeliculas(valorBuscado)

      })

      const getPeliculas = (valorBuscado) => {

        const urlBuscado = `http://url.com/?query=${valorBuscado}&client_id=${}`

        try {

          const respuesta = fetch(urlBuscado)

        } catch (error) {

          

        }

      }

    </script>
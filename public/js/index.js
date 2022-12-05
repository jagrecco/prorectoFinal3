async function abrirModal(idProd){

  /* console.log(idProd) */
  const prod={}

  axios.get(`/api/productos/prod/${idProd}`)
    .then(function (response) {
    // manejar respuesta exitosa
    /* console.log(response.data[0]); */
    prod.nombre=response.data[0].title
    prod.descripcion=response.data[0].description
    prod.codigo=response.data[0]._id
    prod.foto=response.data[0].thumbnail
    prod.precio=response.data[0].price
    prod.stock=response.data[0].stock
    
    console.log(prod);
    enviarCarrito(prod);
    })
    .catch(function (error) {
    // manejar error
    console.log(error);
    })
    .then(function () {
    // siempre sera executado
    });

/* enviarCarrito(prod); */
  /* fetch(`/api/productos/prod/${idProd}`)
    .then((resp) => resp.json())
    .then((data) => {
  
      prod=data[0]
      console.log(prod)
    })
    .catch((error) => {
      console.log(error);
    }); */

}

function enviarCarrito(producto){
  
  const ui=document.getElementById("abrirModal").value
  
  console.log(`/api/carrito/${ui}`);
  
  axios.post(`/api/carrito/${ui}`, producto) //enviar id del comprador
    .then(function (response) {
      console.log(`Post de ${producto} al carro de usr: ${ui} hecho`);
      /* console.log(response.data); */
    })
    .catch(function (error) {
      /* console.log(error); */
    });
}

function cambio(file){
  
  const $seleccionArchivos = document.querySelector("#imgRuta")
  const $imagenPrevisualizacion = document.querySelector("#imgProfile")
  const archivos = $seleccionArchivos.files
  const primerArchivo = archivos[0];
  const objectURL = URL.createObjectURL(primerArchivo);
  
  $imagenPrevisualizacion.src = objectURL;

}

function changeImg(imagen){
  document.getElementById("imgProfile").src=imagen;
}

function doSubmit(){
  const formulario=document.getElementById("formProfileImage")
  formulario.submit()
}

function doClick() {
  const el = document.getElementById("imgRuta");
  if (el) {
    el.click();
  }
}
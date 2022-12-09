async function abrirModal(idProd){

  const prod={}

  axios.get(`/api/productos/prod/${idProd}`)
    .then(function (response) {

      prod.nombre=response.data[0].title
      prod.descripcion=response.data[0].description
      prod.codigo=response.data[0]._id
      prod.foto=response.data[0].thumbnail
      prod.precio=response.data[0].price
      prod.stock=response.data[0].stock
    
      console.log(prod);
      enviarCarrito(prod);
      animarCarro();
    })
    .catch(function (error) {
      console.log(error);
    })

}

function enviarCarrito(producto){
  
  const ui=document.getElementById("abrirModal").value
  
  console.log(`/api/carrito/${ui}`);
  
  axios.post(`/api/carrito/${ui}`, producto) //enviar id del comprador
    .then(function (response) {
      console.log(`Post de ${producto} al carro de usr: ${ui} hecho`);
      
    })
    .catch(function (error) {
      console.log(error);
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
//crear función para el click del botón carrito
function pedirCarrito(usrID){
  /* document.getElementById("carrito") */
}

function animarCarro(){
  document.getElementById("btnCarro").classList.add("animate__animated", "animate__bounce")
  setTimeout(() => {
    document.getElementById("btnCarro").classList.remove("animate__animated", "animate__bounce")
  }, 1000);
}
function cambio(file){
  
  const $seleccionArchivos = document.querySelector("#imgRuta")
  const $imagenPrevisualizacion = document.querySelector("#imgProfile")
  const archivos = $seleccionArchivos.files
  const primerArchivo = archivos[0];
  const objectURL = URL.createObjectURL(primerArchivo);
  
  $imagenPrevisualizacion.src = objectURL;
  /* alert(objectURL) */
}

function changeImg(imagen){
  /* const imagenProfile=document.getElementById("imgProfile") */
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
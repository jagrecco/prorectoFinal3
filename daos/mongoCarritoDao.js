
import ContenedorMongo from "../contenedores/mongoDbContenedor.js"
import CarrModel from "../models/carritoSchema.js"

class CarritoMongoDao extends ContenedorMongo {
    constructor(){
        super (CarrModel)
    }

    async agregarProducto(idCarrito, producto){

        try {

            const data = await super.listarUno(idCarrito)
            const arrProd = data[0].productos
            arrProd.push(producto)
            data[0].productos=arrProd
            const carroModificado=this.col(data[0])
            await carroModificado.save()            
            return data[0]

        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }

    async eliminarProducto(idCarrito, idProducto){

        try {

            const data = await super.listarUno(idCarrito)
            if (!data) return ({error: "Carrito no encontrado"})
            const nuevoArr =  data[0].productos.filter(el => el._id != idProducto)
            
            data[0].productos =  nuevoArr //arrProd.splice(indexProduct, 1)  //arrModific
            const carroModificado=this.col(data[0])
            await carroModificado.save()            
            return data[0]

        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }
}

export default CarritoMongoDao
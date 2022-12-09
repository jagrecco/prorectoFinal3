import ContenedorMongo from "../contenedores/mongoDbContenedor.js"
import CarrModel from "../models/carritoSchema.js"

class CarritoMongoDao extends ContenedorMongo {
    constructor(){
        super (CarrModel)
    }

    async agregarProducto(idCarrito, producto){

        const nuevoCarro={}

        try {
            
            const carro = await this.buscarCarro(idCarrito)
                try {
                    
                    if (carro.length==0) {
                       
                        nuevoCarro.idUsuario=idCarrito;
                        nuevoCarro.productos=[];
                        nuevoCarro.productos.push(JSON.parse(producto))
                        console.log(nuevoCarro);
                        const nuevoCarrito=this.col(nuevoCarro)
                        await nuevoCarrito.save()

                    } else {

                        const arrayProductos=carro[0].productos
                        
                        arrayProductos.push(JSON.parse(producto))
                        /* console.log(arrayProductos); */

                        await this.col.updateOne({idUsuario: idCarrito}, {$set: {productos: arrayProductos} })
                            try {
                                console.log(`Producto agregado al carrito ${idCarrito}`);
                            } catch (error) {
                                console.log(`Error al actualizar carrito ${idCarrito}: ${error}`);
                            }
                    

                    }
                    /* const nuevoCarrito=this.col(nuevoCarro)
                    await nuevoCarrito.save() */
                    
                } catch (error) {
                    console.log("Error al conectar a la fuente de datos: " + error);
                }

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

    async buscarCarro(idCarrito) {
        try {
            return await this.col.find({idUsuario: idCarrito});
        } catch (error) {
            console.log("Error al conectar a la fuente de datos: " + error)
        }
    }
}

export default CarritoMongoDao
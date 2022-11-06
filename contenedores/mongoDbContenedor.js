import mongoose from "mongoose";
import ProdModel from "../models/productoSchema.js"
import conexion from "../config/config.js"

/* import "../db/conectMongo.js" */
/* mongoose.connect(conexion.mongoDbCon.dbURI, {dbName: 'prods'}).then(
    () => { console.log("Conexión exitosa a Mongo")},
    err => { console.log(err)}
);
 */

class ContenedorMongo{
    constructor(col, esquema){

        this.col=col
        
    }

    async listarTodos(){
        try {
            return await this.col.find();
        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }
    }

    async listarUno(idProducto){

        try {
            return await this.col.find({_id: idProducto});
        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }

    async guardarUno(objeto) {

        try {
            const productoNuevo=this.col(objeto)
            await productoNuevo.save()
            return objeto;
        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }

    async borrarUno(idProducto){

        try {
            const productos = await this.col.deleteOne({_id: idProducto});
            return productos;
        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }

    async editaUno(idProducto, objeto) {

        try {
            return this.col.findOneAndUpdate(idProducto, objeto, {new: true});
        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }

    }

    async terminaConexion(){

        try {
            await mongoose.connection.close();
        }
        catch (error){
            console.log("Error al conectar a la fuente de datos: " + error)
        }
    }
}

export default ContenedorMongo
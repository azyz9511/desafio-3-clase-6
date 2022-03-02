const fs = require('fs');

class Contenedor{
    
    constructor(path){
        this.path = `./${path}.txt`;
    }

    save(item){

        fs.promises.readFile(this.path,'utf-8')
        .then(contenido => {
            
            if(contenido == '[]' || contenido == ''){

                // Esto se ejecuta cuando el array esta vacio

                item.id = 1; 
                let arr = [];
                arr.push(item);
                let arrStr = JSON.stringify(arr,null,2);
                
                fs.promises.writeFile(this.path,arrStr)
                .then( () => {
                    console.log('Guardado con exito') ;
                    console.log(`El id asignado al producto es: ${item.id}`);
                })
                .catch( e => 
                    console.log(`Ha ocurrido el siguiente error: ${e}`)
                    );

            }else{

                // Esto se ejecuta cuando el array ya tiene datos

                //codigo para obtener el ultimo Id
                let contenidoObj = JSON.parse(contenido);
                let len = contenidoObj.length - 1;
                let ultimoId = contenidoObj[len].id;

                item.id = ultimoId + 1;
                contenidoObj.push(item);
                contenidoObj = JSON.stringify(contenidoObj,null,2);

                fs.promises.writeFile(this.path,contenidoObj)
                .then( () => {
                    console.log('Guardado con exito') ;
                    console.log(`El id asignado al producto es: ${item.id}`);
                })
                .catch( e => 
                    console.log(`Ha ocurrido el siguiente error: ${e}`)
                );
            }
            
        })
        .catch(e => {

            //Esto se ejecuta cuando el archivo no esta creado o hay un problema con la ruta
            
            item.id = 1; 
            let arr = [];
            arr.push(item);
            let arrStr = JSON.stringify(arr,null,2);
            
            fs.promises.writeFile(this.path,arrStr)
            .then( () => {
                console.log('Guardado con exito') ;
                console.log(`El id asignado al producto es: ${item.id}`);
            })
            .catch( e => 
                console.log(`Ha ocurrido el siguiente error: ${e}`)
                );
        });

    }

    getById(id){

        const getby_id = fs.promises.readFile(this.path,'utf-8')
        .then(contenido => {

            let contenidoObj = JSON.parse(contenido); 
            let validacion = false;

            for (let i = 0; i < contenidoObj.length; i++) {
                if(contenidoObj[i].id == id){
                    const contenidoId = contenidoObj[i];
                    console.log(contenidoId);
                    validacion = true;
                    return contenidoId;
                }
            }
            
            if(validacion == false){
                console.log('El id ingresado no existe');
            }
        })
        .catch(e => 
            console.log('El archivo o ruta no existe')
        );
        return getby_id;
    }

    getAll(){

        const get_all = fs.promises.readFile(this.path,'utf-8')
            .then(contenido => {
                if(contenido == '[]' || contenido == ''){
                    console.log('No existen productos para mostrar');
                }else{
                    let contenidoObj = JSON.parse(contenido);
                    console.log(contenidoObj);
                    return contenidoObj;
                }
            })
            .catch(e => 
                console.log('El archivo o ruta no existe')
            );

        return get_all;
    }

    deleteById(id){

        fs.promises.readFile(this.path,'utf-8')
        .then(contenido => {

            let contenidoObj = JSON.parse(contenido); 
            let validacion = false;

            for (let i = 0; i < contenidoObj.length; i++) {
                if(contenidoObj[i].id == id){
                    contenidoObj.splice(i,1);
                    console.log('Producto eliminado correctamente');
                    validacion = true;
                }
            }
            
            if(validacion == false){
                console.log('El id ingresado no existe');
            }

            contenidoObj = JSON.stringify(contenidoObj,null,2); 
            
            fs.promises.writeFile(this.path,contenidoObj)
            .then()
            .catch( e => 
                console.log(`Ha ocurrido el siguiente error: ${e}`)
            );

            })
        .catch(e => 
            console.log('El archivo o ruta no existe')
        );

    }

    deleteAll(){

        fs.promises.readFile(this.path,'utf-8')
        .then(contenido => {
            if(contenido == '[]' || contenido == ''){
                console.log('No hay productos para eliminar');
            }else{
                fs.promises.writeFile(this.path,'[]')
                .then(() => console.log('Todos los productos han sido eliminados correctamente'))
                .catch( e => 
                    console.log(`Ha ocurrido el siguiente error: ${e}`)
                );
            }
        })
        .catch(e => 
            console.log('El archivo o ruta no existe')
        );
    }
    
}

module.exports = Contenedor;
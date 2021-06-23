const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
           const tarea = this._listado[key];
           listado.push(tarea);
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = ''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){

        this.listadoArr.forEach( (tarea, i)=>{
            console.log(`${(i + 1).toString().green+'.'.green} ${tarea.desc} :: ${(tarea.completadoEn == null)? 'Pendiente'.red : 'Completado'.green}`);
        });

        

    }

    listarPendientesCompletadas ( completada = true) {

        let contador = 0
        this.listadoArr.forEach( tarea => {

            const {desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            if(completadoEn){
                if(completada){
                    contador += 1
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.toString().green}`);
                }
            }else {
                if(!completada){
                    contador += 1
                    console.log(`${(contador+'.').green} ${desc} :: ${estado}`);
                }
            }

        })
    }

    toggleCompletada ( ids = []){

        ids.forEach( id =>{
           const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }


}

module.exports = Tareas;
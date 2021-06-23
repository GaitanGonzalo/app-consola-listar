require('colors');
//const{ mostrarMenu, pausa } = require('./helpers/mensajes')
const{ inquireMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheck } = require('./helpers/inquire');
const { guardarDb, leerDB } = require('./helpers/grabararchivo');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear();

const main = async() => {
   
    let opt = '';
    const tareas = new Tareas();

    const tareasDb = leerDB();
    if(tareasDb){
        //establecer las tareas
        tareas.cargarTareasFromArray(tareasDb);
    }
    //await pausa();

    do {
       opt = await inquireMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;
        
            case '2':
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids = await mostrarListadoCheck(tareas.listadoArr);
                tareas.toggleCompletada(ids);
                //console.log(ids);
            break;

            case '6': // borrar tareas
               const id = await listadoTareasBorrar(tareas.listadoArr);
               if(id !== '0'){
                   //preguntar si esta seguro
                   const ok = await confirmar('Estas seguro de Eliminar la tarea?');
                   if(ok){
                       tareas.borrarTarea(id);
                       console.log('tarea borrada');
                   }
               }
            break;
        }

       guardarDb(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');


}

main();
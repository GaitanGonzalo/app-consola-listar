const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name:'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tarea comletadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tarea pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]
const p = [
    {
        type:'input',
        name:'opcion',
        message: `Presione ${ 'ENTER'.green} para continuar`
    }
]

const inquireMenu = async() =>{

    console.clear();
    console.log('============================='.green);
    console.log('     Seleccione una opción   '.white);
    console.log('=============================\n'.green);

   const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    return await inquirer.prompt(p);
}

const leerInput = async( message ) =>{
    const question = {
        type: 'input',
        name: 'desc',
        message, //si parametro que recibo es igual a la propiedad puedo simplificar
        validate( value ){
            if(value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas  = []) => {

    const choices = tareas.map( (tarea, i) => {
         const idx = i +1;
        return {
            value: tarea.id,
            name: `${idx.toString().green} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async(message)=>{

    const question = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];

    const {ok } = await inquirer.prompt(question);
    return ok;

}

const mostrarListadoCheck = async (tareas  = []) => {

    const choices = tareas.map( (tarea, i) => {
         const idx = i +1;
        return {
            value: tarea.id,
            name: `${idx.toString().green} ${tarea.desc}`,
            checked: (tarea.completadoEn)? true : false
        }
    });

    // choices.unshift({
    //     value: '0',
    //     name: '0.'.green + ' Cancelar'
    // });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    
    const {ids} = await inquirer.prompt(preguntas);
    return ids;

}

module.exports = {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheck
}
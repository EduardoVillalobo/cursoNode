import Swal from 'sweetalert2'

export const actualizarAvance = () => {
    //Tareas existentes
    const tareas = document.querySelectorAll('li.tarea')

    if (tareas.length) {
        //Tareas completadas
        const tareasCompletas = document.querySelectorAll('i.completo')

        //Calcular avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100)

        //mostrar avance
        const porcentaje = document.querySelector('#porcentaje')
        porcentaje.style.width = avance + '%'

        if (avance === 100) {
            Swal.fire({
                type: 'success',
                title: 'Completaste el proyecto',
                text: 'Todas las tareas estan completadas'
            })
        }
    }

}
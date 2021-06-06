import axios from 'axios'
import Swal from 'sweetalert2'
import { actualizarAvance } from '../funciones/avance'
const tareas = document.querySelector('.listado-pendientes')


if (tareas) {

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target
            const idTarea = icono.parentElement.parentElement.dataset.tarea

            const url = `${location.origin}/tareas/${idTarea}`

            axios.patch(url, { idTarea })
                .then(function(respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo')
                        actualizarAvance()
                    }
                })
                .catch()

        }
        if (e.target.classList.contains('fa-trash')) {
            const tareaHtml = e.target.parentElement.parentElement
            const idTarea = tareaHtml.dataset.tarea

            Swal.fire({
                title: 'Deseas borrar este tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/tareas/${idTarea}`
                    axios.delete(url, { params: { idTarea } })
                        .then(function(respuesta) {
                            if (respuesta.status === 200) {
                                tareaHtml.parentElement.removeChild(tareaHtml)
                                Swal.fire({
                                    type: 'success',
                                    title: 'Tarea Eliminada',
                                    text: respuesta.data
                                })
                                actualizarAvance()
                            }
                        })
                        .catch()
                }
            })
        }
    })
}

export default tareas
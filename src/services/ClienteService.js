import api from '../lib/axios.js'

export default {
    obtenerClientes() {
        return api.get('/clientes')
    },
    nuevoCliente(data) {
        return api.post('/clientes', data)
    },
    cambiarEstado(id, data) {
        return api.patch(`/clientes/${id}`, data)
    }
}

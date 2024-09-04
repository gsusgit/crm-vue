import api from '../lib/axios.js'

export default {
    obtenerClientes() {
        return api.get('/clientes')
    },
    obtenerCliente(id) {
        return api.get(`/clientes/${id}`)
    },
    nuevoCliente(data) {
        return api.post('/clientes', data)
    },
    cambiarEstado(id, data) {
        return api.patch(`/clientes/${id}`, data)
    },
    editarCliente(id, data) {
        return api.patch(`/clientes/${id}`, data)
    },
    borrarCliente(id) {
        return api.delete(`/clientes/${id}`)
    }
}

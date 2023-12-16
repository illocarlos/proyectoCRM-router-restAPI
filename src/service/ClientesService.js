import api from "@/api/axios";

const obtenerClientes = () => {
    return api.get('/clientes')
}
const crearCliente = (data) => {
    return api.post('/clientes', data)
}
const obtenerunCliente = (id) => {
    return api.get('/clientes/' + id)
}
const editarCliente = (id, data) => {
    return api.patch('/clientes/' + id, data)
}
const cambiarEstado = (id, data) => {
    console.log(data)
    return api.patch('/clientes/' + id, data)
}
const eliminarCliente = (id) => {
    return api.delete('/clientes/' + id)
}
export default {
    obtenerClientes,
    crearCliente,
    editarCliente,
    obtenerunCliente,
    cambiarEstado,
    eliminarCliente
}
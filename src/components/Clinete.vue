<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

//delcarar las props se us para llamarlas desde el script 
const props=defineProps({
    cliente: {
        type:Object
    }
})

defineEmits(['actualizar-estado', 'eliminarCliente'])
// creamos un computed para mejorar el codigo y sea mas lejible uniendo dos propr y llamandolo en el html
//es mucho mas facil modificar el coigo desde un computed
const nombreCliente = computed(() => {
    return props.cliente.nombre+' '+props.cliente.apellido
})
const estdoCliente = computed(() => {
    return props.cliente.estado
    
})

</script>
<template>
    <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <p class="font-medium text-gray-900">{{ nombreCliente }}</p>
            <p class="text-gray-500">{{ cliente.email }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{ cliente.empresa }}</p>
            <p class="text-gray-600">{{ cliente.puesto }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-center">
            <button
            @click="$emit('actualizar-estado',
            {id:cliente.id,estado:cliente.estado})"
            class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
            :class="[estdoCliente?'bg-green-500':'bg-red-500 text-white']"
            >
                {{ estdoCliente?'Activo':'Inactivo ' }}
            </button>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
<RouterLink 
class="bg-indigo-600 hover:bg-indigo-800 mr-5 text-white px-4 py-2 rounded-lg"
:to= "{name: 'editar-cliente', params:{id:cliente.id}}">Editar</RouterLink>
<button 
@click="$emit('eliminar-cliente',  cliente.id)"
class="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg">
    Eliminar
</button>
        </td>
    </tr>
</template>
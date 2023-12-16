        <script setup>
        import { computed, onMounted, ref } from 'vue';
        import ClientesServide from'../service/ClientesService'
        import { RouterLink } from 'vue-router';
        import HeddinVue from '@/components/UI/Heddin.vue';
        import Clinete from '@/components/Clinete.vue';

        const clientes=ref([])
                 defineProps({
            titulo: {
                type: String,
            }
                         })

        //este onMount significa una vez este componente este cargado le haremos la llamada a la API
                        //  para eso se usa onMounted para cargar algo principalmente una vez carga la pagina
        onMounted(() => {
            // cuando usas axios y llamas a la url su valor predeterminado es de tipo get es decir coges la informacion que tiene 
            // esa api para relfejarla en algun lado si quieres editar crear o borrar (delete,post,put/patch) debes llamarlo
            //axios.post/axios.delete/axios.put/patch
                    ClientesServide.obtenerClientes()
                                .then(({ data }) => clientes.value = data)
                                .catch(error =>console.log(error) )
                })


        const existenClientes = computed(() => {
                    return clientes.value.length>0
                })
     const actualizarEstado = ({id,estado}) => {
                 ClientesServide.cambiarEstado(id, { estado: !estado })
                             .then(() => {
                                         const i = clientes.value.findIndex(cliente => cliente.id === id)
                                         clientes.value[i].estado = !estado
    
                                     })
                             .catch(err => console.log(err))
             }
        const eliminarCliente = id => {
                    ClientesServide.eliminarCliente(id)
                                .then(() => {
                                         clientes.value=clientes.value.filter(cliente=>cliente.id!==id)
                                           
                                        })
          .catch(err=>console.log(err))
        }
        </script>
<template>
    <div>
        <div class="flex justify-end">
            <!-- esta es un forma de usar el routerlINK te lleva a  la view deseada conectandola con las rutas pero hay una forma mejor  -->
               <!-- <RouterLink to="/nuevo-cliente">añadir nuevo cliente</RouterLink>    -->
               <!-- esta forma es mas idonea ya que en ella la hacemos dinamica  y conectamos este routerlink con el name de las rutas -->
               <!-- por que si te piden cambiarle el nombre a la url por algun motivo esto se llama desde el nombre a 
                diferencia de la que tenemos arriba que la llamamos mediante la url y es una forma mejor de cambiar y dejar el nombre 
            es decir esto conecta el nombre de la ruta es mas raro que cambiemos eso a la url-->
    <RouterLink
        class="block md:inline-block uppercase font-bold rounded-xl bg-orange-600 py-2 px-3 shadow
         hover:bg-red-700 hover:text-white transition-all cursor-pointer "
    :to="{name:'nuevo-cliente'}">añadir nuevo cliente</RouterLink>   

        </div>
<HeddinVue>{{ titulo }}</HeddinVue>

      <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300">
                      <thead>
                      <tr>
                          <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                          <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                          <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                          <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
                      </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
<Clinete
v-for="cliente in clientes "
:key="cliente.id"
:cliente="cliente"
@actualizar-estado="actualizarEstado"
@eliminar-cliente="eliminarCliente"
/>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
<p v-else
class="text-center mt-10">no hay clientes </p>
    </div>
</template>




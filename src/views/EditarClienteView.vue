        
<script setup>
import ClientesService from '@/service/ClientesService';
import HeddinVue from '@/components/UI/Heddin.vue';
import RouterLink from '@/components/UI/RouterLink.vue';
import { FormKit } from "@formkit/vue"
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';

// diferencia entre router y route

// route:tiene informacion de la ruta en la que nos encontramos (nombre de la ruta, si tiene algun parametro,la pagina que nos encontramos)
// router: este tiene informacion relacionada al proyecto en generL(redireccionar al usuario,volver a lña pag anterior, 
// agregar una ruta, si existe una ruta)
const route = useRoute()
const router = useRouter()
const formData =reactive({})

defineProps({
    titulo: {
        type: String,
    }
})
const {id}=route.params
onMounted(() => {
    ClientesService.obtenerunCliente(id)
        .then(({ data }) => {
Object.assign(formData,data)       
        })
        .catch(err => console.log(err))
})


const handleSubmit = (data) => {
    ClientesService.editarCliente(id, data)
        .then(() => router.push({name:'inicio'}))
    .catch(err=>console.log(err))
}
</script>
<template>
    <div>
        <!-- en este caso emos creado un componente para reclicar ese boton y en el creamos un slot que se usa para pacar una etiqueta 
            como prop en este caso es volver y usamos el to de inicio que lo lo mandamos al componente asi podemos usar el boton donde queramos
        siempre que le pasemos el slot y el to !!esta es mejor forma que la anterior  -->
        <RouterLink to="inicio">volver</RouterLink>
    </div>
    <div>
        <!-- aqui usamos esa prop de routerlik -->
        <HeddinVue>{{ titulo }}</HeddinVue>
        <div class="mx-auto bg-white mt-10 shadow">

            <!-- este componente es un paquete de una dependencia instalada y la llamamos en main.js y
         la importamos en este caso aqui  -->
            <div class="mx-auto md:w-2/5 py-20 px-6">
                <FormKit type="form" submit-label="enviar" 
                :value="formData"
                incomplete-message="error al enviar "
                 @submit="handleSubmit">
                    <!-- type-> al usar el type en formkit automaticamente unes el lable y input en una sola etiquete -->
                    <!-- validatio-> se usa para aprobar una validacion y te envie un mensaje de texto que requiere que rellenes 
validation-message->es usado para cambiar el mensaje por defecto que viene y colocar uno personal -->
                    <!-- validation-visibility-> esta es una forma de enviar mensajes de validacion hay 
    varios tipo live blur y submit son los mas usados live es en tiempo real  es muy parecido a blur 
y submit es al enviar(este es el mas usado de los tres) -->

                    <FormKit type="text" label="Nombre" v-model="formData.nombre" name="nombre" placeholder="coloca el nombre aqui"
                        validation="required" :validation-messages="{ required: 'el nombre es obligatorio' }"
                        validation-visibility="submit" />


                    <FormKit type="text" name="apellido" v-model="formData.apellido" label="Apellido" placeholder="coloca el apellido aqui"
                        validation="required" :validation-messages="{ required: 'el apellido es obligatorio' }"
                        validation-visibility="submit" />


                    <FormKit type="email" label="Email" v-model="formData.email" name="email" placeholder="coloca el email aqui"
                        validation="required|email"
                        :validation-messages="{ required: 'el email es obligatorio', email: 'email no valido' }"
                        validation-visibility="submit" />

                    <FormKit type="number" name="telefono" v-model="formData.telefono" label="Telefono" placeholder="XXX-XXX-XXX" validation="required"
                        :min="9" :validation-messages="{ required: 'telefono obligatorio' }"
                        validation-visibility="submit" />
                    <FormKit name="empresa" v-model="formData.empresa" type="text" label="Empresa"
                        placeholder="coloca la empresa en que trabajas aqui" />
                    <FormKit type="text" name="puesto" v-model="formData.puesto" label="puesto" placeholder="de que trabajas" />


                    <!-- forma de crear un button aparte debemos de ir al formkit padre y usar :actions="false" 
                para eliminar el boton predeterminado
                
                <FormKit
                type="submit"
                label="enviar"
              
                /> -->
                </FormKit>
            </div>
        </div>

    </div>
</template>

<style scooped>
.formkit-wrapper {
    max-width: 100%;
}
</style>
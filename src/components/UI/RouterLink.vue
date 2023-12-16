        <script setup>
        import { RouterLink } from 'vue-router';
        defineProps({
                    to: {
                        type: String,
            }
        })
        </script>
<template>
    <div>
        <div class="flex justify-end">
             <RouterLink
             class="block md:inline-block uppercase font-bold rounded-xl bg-orange-600 py-2 px-3 shadow
              hover:bg-red-700 hover:text-white transition-all cursor-pointer "
             :to="{ name: to }">
            <slot></slot>
            </RouterLink>  
        </div>
    </div>
</template>



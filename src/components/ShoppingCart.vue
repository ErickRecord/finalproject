<script setup>
import { ref, watch } from 'vue'
const { shoppingCart, deleteShoppingCart } = defineProps(['shoppingCart', 'deleteShoppingCart']);
const total = ref(0);

// This function will be called whenever the 'shoppingCart' prop changes
watch(() => {
    total.value = 0
    shoppingCart.forEach(product => {
        total.value += product.precio;
    });
});

function handleProductRemoved(productName) {
    deleteShoppingCart(productName)
}

</script>


<template>
    <table>
        <tr>
            <th>Img</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
        </tr>
        <tr v-for="shopping in shoppingCart">
            <td><img :src="shopping.img" width="200" :alt="shopping.nombre"></td>
            <td>{{ shopping.nombre }}</td>
            <td>{{ shopping.precio }}</td>
            <td><button type="button" @click="handleProductRemoved(shopping.nombre)">Eliminar</button></td>
        </tr>
    </table>
    <p class="total">Total: {{ total }}</p>
</template>

<style lang="scss">
.total{
    text-align: center;
    margin-bottom: 50px;
}
table {

    margin: 100px auto;

    th {
        padding: 0.2em 0.8em;
        border: 1px solid rgba(20, 50, 90, .25);
        background: rgba(0, 102, 255, .25);
        text-align: center;
    }

    td {
        padding: 0.2em 0.8em;
        border: 1px solid rgba(16, 76, 167, .25);
        background: rgba(90, 156, 255, .25);
        text-align: left;
    }
}
</style>
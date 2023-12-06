<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue'
import Product from '../components/Product.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import Footer from '../components/Footer.vue'
const products = ref([]);
const shoppingCart = ref([]);

const updateProducts = (searchResults) => {
    // Updates the products property with the search results
    products.value = [];
    products.value = searchResults;
};
const updateShoppingCart = (product) => {
    // Check if the product already exists in the cart
    const existsProduct = shoppingCart.value.find((p) => p.nombre === product.nombre);

    if (!existsProduct) {
        shoppingCart.value.push(product);
    } else {
        alert("El producto ya está en el carrito.")
    }
};

const deleteShoppingCart = (productName) => {
    const existsProductIndex = shoppingCart.value.findIndex((p) => p.nombre === productName);

    if (existsProductIndex !== -1) {
        shoppingCart.value.splice(existsProductIndex, 1);
    }
};


</script>

<template>
    <Header :updateProducts="updateProducts" :products="products" />
    <section class="contenedor padding-nav">
        <div v-if="products.value == []" class="padding-nav">
            <p>No hay productos disponibles en este momento.</p>
        </div>
        <div v-else class="productos">
            <div v-for="product in products" :key="product.id" class="producto">
                <Product :product="product" :updateShoppingCart="updateShoppingCart" />
            </div>
        </div>
    </section>
    <ShoppingCart :shoppingCart="shoppingCart" :deleteShoppingCart="deleteShoppingCart" />
    <Footer />
</template>

<style lang="scss">
@use "../assets/styles/responsive.scss";

.productos {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .producto {
        width: calc(100% - 10px);
    }

    @include responsive.tablet() {
        .producto {
            width: calc(33.3% - 10px);
        }
    }

    @include responsive.laptop() {
        .producto {
            width: calc(25% - 10px);
        }
    }
}
</style>
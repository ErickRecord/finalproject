<script setup>
import { RouterLink } from 'vue-router'
defineProps(['product']);
</script>


<template>
    <div class="">
        <RouterLink to="/producto">
            <div class="img-producto">
                <img :src="product.img" alt="Imagen del producto">
            </div>
            <div class="descripcion-producto">
                <p>{{ product.nombre }}</p>
                <h3>{{ product.descripcion }}</h3>
                <div class="precio">
                    <p class="precio">${{ product.precio }}</p>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<style lang="scss">
.producto {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: white;
    border-radius: 10px;

    a {
        color: black;
        text-decoration: none;
    }

    .img-producto {
        text-align: center;

        img {
            height: 200px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        }
    }

    .descripcion-producto {
        padding: 10px;

        p {
            font-size: 16px;
            margin-bottom: 10px;
        }

        h3 {
            font-size: 13px;
            font-weight: bold;
        }


        .precio {
            color: green;
            font-weight: bold;
        }

    }


}
</style>
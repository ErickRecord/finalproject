<script setup>
import { onMounted, ref } from 'vue';
import { auth } from '../../firebase.js';
import { signOut, onIdTokenChanged } from 'firebase/auth';
import { db } from '../../firebase.js';
import { getDocs, collection, query, where } from 'firebase/firestore';
//Props
const { products, updateProducts } = defineProps(['products', 'updateProducts']);

const isLoginIn = ref(false);
const searchValue = ref("");

onMounted(() => {
    handleGetProducts();
    // Listen for access token changes
    onIdTokenChanged(auth, async (userL) => {
        if (userL) {
            try {
                // Get the renewed access token
                const refreshedToken = await userL.getIdToken();
                localStorage.setItem("token", refreshedToken);
                isLoginIn.value = true;
                // Now you can use the new access token according to your needs
            } catch (error) {
                console.error('Error al renovar el token de acceso:', error.message);
            }
        }
    });
});

const handleSignOut = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("token");
        isLoginIn.value = false;
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
    }
};


async function handleGetProducts() {
    const productsLocal = [];

    if (searchValue.value === "") {
        // Make a query to get all the products
        let productosCollection = await getDocs(collection(db, "productos"));
        productosCollection.forEach((product) => {
            productsLocal.push({ ...product.data(), id: product.id });
        });
    } else {
        // Perform a query to find products that contain the search string
        let productosCollection = await getDocs(
            query(
                collection(db, "productos"),
                where("nombre", "==", searchValue.value),
            )
        );

        productosCollection.forEach((product) => {
            productsLocal.push({ ...product.data(), id: product.id });
        });
    }

    // Update the view with the products found
    updateProducts(productsLocal);
}

</script>


<template>
    <nav class="navegacion">
        <div class="info-nav contenedor">
            <router-link to="/"><img src="../assets/img/logo.png" alt="Logo"></router-link>
            <form @submit.prevent="handleGetProducts" class="buscador">
                <input type="text" v-model="searchValue" name="buscar" id="buscar-input"
                    placeholder="Hola. ¿Qué estas buscado?">
                <button type="submit" class="buscar-boton"><font-awesome-icon
                        icon="fa-solid fa-magnifying-glass" /></button>
            </form>

            <div class="detalles-nav">
                <router-link to="/sobre-nosotros" title="Sobre nosotros"><font-awesome-icon
                        icon="fa-solid fa-people-carry-box" /><span>Sobre
                        nosotros</span></router-link>
                <template v-if="isLoginIn">
                    <router-link to="/cuenta" title="Cuenta"><font-awesome-icon
                            icon="fa-solid fa-user" /><span>Cuenta</span></router-link>
                    <router-link to="/" @click="handleSignOut" title="Cerrar sesión"><font-awesome-icon
                            icon="fa-solid fa-arrow-right-from-bracket" /><span>Cerrar sesión</span></router-link>
                </template>
                <template v-else>
                    <router-link to="/login" title="Iniciar sesión"><font-awesome-icon
                            icon="fa-solid fa-user" /><span>Iniciar sesión</span></router-link>
                </template>
                <router-link to="/carrito" title="Carrito">
                    <div class="carrito">
                        <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                        <p class="cantidad">3</p>
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
@use "../assets/styles/responsive.scss";

.navegacion {
    z-index: 1000;
    background-color: #f2f2f2;
    position: fixed;
    width: 100%;
    padding: 5px 10px;

    .info-nav {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        background-color: #f2f2f2;
    }

    .buscador {
        order: 2;
    }

    span {
        display: none;
    }

    img {
        height: 60px;
    }

    .detalles-nav {
        display: flex;
        gap: 10px;
        font-size: 20px;

        a {
            border-radius: 10px;
            color: rgb(117, 116, 116);
            text-decoration: none;
            padding: 10px;
            transition: all .3s ease-in;

            &:hover {
                color: black;
                background-color: white;
            }
        }

        .carrito {
            position: relative;
            display: inline-block;

            .cantidad {
                font-size: 12px;
                position: absolute;
                top: -7px;
                right: -9px;
                padding: 1px 5px;
                background-color: red;
                color: white;
                border-radius: 50%;
            }

        }
    }

    form {
        position: relative;
        width: 100%;

        #buscar-input {
            width: 100%;
            padding: 10px 45px 10px 10px;
            border: none;
            border-radius: 5px;

            &:focus {
                outline: none !important;
            }
        }

        .buscar-boton {
            position: absolute;
            top: 0;
            right: 0;
            padding: 10px;
            border-radius: 0 5px 5px 0;
            color: white;
            background-color: blue;
            border: none;
            cursor: pointer;
        }
    }

    @include responsive.tablet() {
        .info-nav {
            justify-content: space-between;
            flex-direction: row;
            gap: 20px;
        }

        .buscador {
            order: 0;
            flex: 1;
        }

    }

    @include responsive.otro(1050px) {
        span {
            display: inline-block;
        }
    }

}
</style>
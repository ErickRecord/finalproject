<script setup>
import { onMounted } from 'vue'
import { auth } from '../../firebase.js';
import { signOut, onIdTokenChanged } from 'firebase/auth';

onMounted(() => {
    // Escucha cambios en el token de acceso
    onIdTokenChanged(auth, async (user) => {
        if (user) {
            try {
                // Obtener el token de acceso renovado
                const refreshedToken = await user.getIdToken();
                console.log('Token de acceso renovado:');
                localStorage.setItem("token", refreshedToken);
                // Ahora puedes utilizar el nuevo token de acceso según tus necesidades
            } catch (error) {
                console.error('Error al renovar el token de acceso:', error.message);
            }
        } else {
            console.log('Usuario no autenticado o token de acceso no disponible');
        }
    });
});


const handleSignOut = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("token");
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
    }
};

</script>

<template>
    <div>
        <h1>Index</h1>
        <router-link to="/login">Iniciar sesion</router-link>
        <button @click="handleSignOut()">Cerrar sesion</button>
    </div>
</template>

<style></style>
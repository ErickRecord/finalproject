<script setup>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ref } from "vue";
const email = ref("");
const password = ref("");
import { useRouter } from 'vue-router'
const router = useRouter();


const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            router.push('/')
        })
}
</script>

<template>
    <div>
        <h1>Create an Account</h1>
        <p> <label for=""> Email </label><input type="email" placeholder="Proporciona tu email" v-model="email" required>
        </p>
        <p> <label for="">Password </label><input type="password" placeholder="Contraseña" v-model="password" required></p>
        <p> <button @click="register">Submit</button></p>
    </div>
</template>

// agregar un componente register.vue

<script setup>
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import {ref} from "vue";
const  email = ref ("");
const password = ref("");
import {useRouter} from 'vue-router'
const router = useRouter();


const register =()=>{
 createUserWithEmailAndPassword(getAuth(), email.value, password.value)
 .then ((data) =>{
    console.log("Successfully registred!");
    router.push('/')
 })
.catch((data)=>{
    console.log(error.code);
    alert(error.message);
})
}
const signInWithGoogle =()=>{

}

</script>

<template>
    <div>
        <h1>Create an Account</h1>
        <p> <label for=""> Email     </label><input type="email" placeholder="Proporciona tu email" v-model = "email" required> </p>
        <p> <label for="">Password   </label><input type="password" placeholder="Password" v-model="password" required></p>
        <p> <button @click="register">Submit</button></p>
        <p> <button @click="signInWithGoogle"> Sign In With Google</button></p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../../firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
const router = useRouter();

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push('/');
        }
    });
});

const email = ref("");
const password = ref("");

const handleLoginAction = async () => {
    if (email.value.length == 0 || password.value.length == 0) {
        alert("Completa los campos");
        return;
    }

    try {
        const usuario = await signInWithEmailAndPassword(auth, email.value, password.value);
        const token = await usuario.user.getIdToken();
        localStorage.setItem('token', token);
        router.push('/');
    } catch (error) {
        switch (error.code) {
            case 'auth/wrong-password':
                alert('Contraseña incorrecta');
                break;
            case 'auth/user-not-found':
                alert('Usuario no encontrado');
                break;
            case 'auth/invalid-email':
                alert('Formato de correo electrónico inválido');
                break;
            case 'auth/user-disabled':
                alert('La cuenta de usuario ha sido deshabilitada');
                break;
            default:
                alert('Credenciales incorrectas');
        }
    }
}

function handleRegisterPage() {
    router.push("/register")
}

</script>

<template>
    <section class="sesion-body">
        <section class="login-registro-seccion contenedor">
            <div class="img-login"></div>
            <div class="sesion-registro">
                <img src="../assets/img/logo.png" alt="Logo">
                <p>Ingresa a tu cuenta y disfruta de tus beneficios y de las mejores promociones que tenemos para ti.</p>
                <div class="botones-sesion-registro">
                    <button id="btn-sesion" class="activo">Iniciar sesion</button>
                    <button id="btn-registro" @click="handleRegisterPage">Registrarse</button>
                </div>
                <form id="sesion-form">
                    <input type="text" v-model="email" name="correo" id="correo" placeholder="Correo"
                        autocomplete="username">
                    <input type="password" v-model="password" name="password" id="password" placeholder="Contraseña"
                        autocomplete="current-password">

                    <button type="button" @click="handleLoginAction()" class="boton-registro-sesion">Iniciar sesion</button>
                </form>
            </div>
        </section>
    </section>
</template>

<style lang="scss">
@use "../assets/styles/responsive.scss";

.sesion-body {
    background-color: #c8dbf4;
    min-height: 100vh;
}

.login-registro-seccion {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    background-color: white;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);


    .img-login {
        display: none;
    }

    .sesion-registro {
        text-align: center;
        padding: 15px;

        .activo {
            color: #aed0f0;
            border-bottom: 2px solid #9ad2df !important;

        }


        margin-bottom: 30px;

        h2 {
            margin-bottom: 10px;
            font-weight: bold;
        }

        .botones-sesion-registro {
            margin-top: 30px;
            margin-bottom: 10px;

            button {
                margin: 5px;
                background-color: transparent;
                border: none;
                cursor: pointer;
                outline: none !important;
            }
        }

        form {
            margin-top: 20px;

            input,
            select {
                display: block;
                background-color: #eef5fa;
                border: none;
                width: 100%;
                margin-bottom: 10px;
                padding: 10px;
                outline: none;
                border-radius: 5px;
            }

            .checkbox {
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                label {
                    text-align: left;
                    width: 100% !important;
                }

                a {
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                #terminos {
                    font-size: 30px;
                    width: 40px;
                    transform: scale(1.1);
                    font-size: 30px;
                    margin-bottom: 0;
                }
            }

            .boton-registro-sesion {
                width: 100%;
                padding: 10px 0;
                outline: none;
                background-color: #2c84db;
                color: white;
                border: none;

                &:hover {
                    background-color: #3595f8;
                }
            }
        }
    }



    @include responsive.tablet() {
        display: flex;
        align-items: center;
        gap: 10px;

        .img-login {
            display: block;
            text-align: center;
            border-radius: 15px;
            background-color: #f1f7fe;
            width: 100%;
            height: 100%;
            min-height: 600px;
            background-size: cover;
            background-image: url(../assets/img/login.png);
            background-position: center;
            height: 700px;
        }

    }
}
</style>
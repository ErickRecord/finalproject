<script setup>
</script>

<template>
    <footer class="contenedor">
        <div class="flex-footer">

            <div class="seccion-footer activo">
                <h2>Nosotros</h2>
                <img src="../assets/img/logo.png" alt="Logo">
                <p>Venta y distribución de equipos de cómputo a todo México.
                    Más de 4 años de experiencia y miles de clientes satisfechos.
                    Garantía Refurbished.</p>
            </div>

            <div class="seccion-footer">
                <h2>Políticas</h2>
                <a href="politicas-privacidad.html">Politicas de privacidad</a>
                <a href="terminos-condiciones.html">Terminos y condiciones</a>
            </div>
            <div class="seccion-footer">
                <h2>Contacto</h2>
                <p>El hoyo, La Piedad Michoacan</p>
                <p>Llámanos: 352 185 8597</p>
                <p>ventas@pceri.com</p>
            </div>
        </div>
        <div class="derechos-reservados">
            <p>Pceri ©{{ new Date().getFullYear() }} Todos los derechos resevados</p>
            <div class="metodos-pago">
                <div class="contenedor-img">
                    <img src="../assets/img/metodos_pagos/mastercard.png" alt="Master Card">
                </div>
                <div class="contenedor-img">
                    <img src="../assets/img/metodos_pagos/paypal.png" alt="Master Card">
                </div>

                <div class="contenedor-img">
                    <img src="../assets/img/metodos_pagos/visa.png" alt="Master Card">
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
@use "../assets/styles/responsive.scss";

footer {
    .flex-footer {
        background-color: #fff4f4;
        padding: 30px;

        a {
            display: block;
            text-decoration: none;
            margin-bottom: 10px;

            &:hover {
                text-decoration: underline;
            }
        }

        .seccion-footer {
            margin-top: 10px;

            img {
                margin: 10px 0 10px 10px;
            }

            h2 {
                margin-bottom: 10px;
                font-weight: bold;
                font-size: 30px;
            }

            p,
            a {
                color: rgb(75, 75, 75);
            }

        }

    }

    .derechos-reservados {
        padding: 10px;
        text-align: center;

        p {
            margin: 10px;
        }

        i {
            font-size: 60px;
        }

        .metodos-pago {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            img {
                width: 80px;
            }
        }

    }

    @include responsive.tablet() {
        text-align: center;

        .flex-footer {
            display: flex;
            flex-wrap: wrap;
        }

        .seccion-footer {
            width: calc(33.3% - 10px);
            margin-top: 0;
        }

        .derechos-reservados {
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .metodos-pago {
                img {
                    width: 100px;
                }
            }
        }
    }
}
</style>
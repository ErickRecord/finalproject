import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Index from './pages/Index.vue';
import App from './App.vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUser, faPeopleCarryBox, faMagnifyingGlass, faCartShopping, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUser, faPeopleCarryBox, faMagnifyingGlass, faCartShopping, faArrowRightFromBracket)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');

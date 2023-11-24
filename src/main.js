import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Index from './pages/Index.vue';
import App from './App.vue';

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
];

const router = createRouter({ 
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).mount('#app');

import { createRouter, createWebHistory } from 'vue-router'
import ThePokemon  from "@/views/pokemons/index.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const routes: Array<any> = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'home',
                redirect: { name: 'pokemons.index' },
            },
            {
                path: '/pokemons',
                name: 'pokemons.index',
                component: ThePokemon,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue';
import Info from '../views/Info.vue';
import Admin from '../views/Admin.vue';

import Rooms from '../views/Rooms.vue';
import Users from '../views/Users.vue';
import Requests from '../views/Requests.vue';
import RoomAdmin from '../views/RoomAdmin.vue';
import RoomList from '../views/RoomsList.vue';


import store from '../store/index';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: () => Main,


        },
        {
            path: '/info',
            name: 'info',
            component: Info,
            props: (route) => ({ id: route.query.id }),
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        },
        {
            path: '/admin/rooms',
            name: 'rooms',
            component: Rooms,
            meta: { requiresAuth: true, props: false },
        },
        {
            path: '/admin/rooms/:id',
            name: 'roomInfo',
            component: RoomAdmin,
            meta: {
                requiresAuth: true,

            },
            props: route => ({
                id: route.params.id
            })
        },

        {
            path: '/admin/requests',
            name: 'request',
            component: Requests,
            meta: { requiresAuth: true },
        },
        {
            path: '/admin/users',
            name: 'users',
            component: Users,
            meta: { requiresAuth: true },
        },
        {
            path: '/admin/list',
            name: 'list',
            component: RoomList,
            meta: { requiresAuth: true },
        },



    ]

})
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("authToken");

    if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
      next('/admin');
    } else {
      next();
    }
  });

export default router;
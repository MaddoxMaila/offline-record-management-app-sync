import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] =
    [{
        // path: '/',
        // component: () => import('../layouts/MainLayout.vue'),
        // children: [
        //     {
        //         name: 'Home',
        //         path: '',
        //         component: () => import('../views/SampleView.vue')
        //     }
        // ]
        path: '/',
        component: () => import('../layouts/AuthLayout.vue'),
        children: [
            {
                name: 'Login',
                path: '',
                component: () => import('../views/auth/AuthView.vue')
            },
            {
                name: 'Register',
                path: 'register',
                component: () => import('../views/auth/AuthView.vue')
            },
            
        ]
    }];

export default routes;

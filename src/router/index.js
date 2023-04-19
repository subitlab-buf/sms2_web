import { createRouter, createWebHistory } from 'vue-router';
import NewUploadView from '../views/NewUploadView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/new',
            component: NewUploadView
        },
    ]
});

export default router;

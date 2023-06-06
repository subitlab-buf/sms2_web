import { createRouter, createWebHistory } from 'vue-router';
import NewUploadView from '../views/NewUploadView.vue';
import MainUploadView from '../views/MainUploadView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/upload/new',
            component: NewUploadView
        },
        {
            path: '/upload/main',
            component: MainUploadView
        },
    ]
});

export default router;

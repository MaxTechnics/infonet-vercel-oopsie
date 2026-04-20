import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: '404 Page',
      meta: { title: 'Infonet' },
      component: () => import('@/views/OopsieView.vue'),
    },
  ],
  scrollBehavior() {
    return {
      el: '#app-mount',
      top: 0,
      behavior: 'smooth',
    };
  },
});

const DEFAULT_TITLE = 'oh look, max fucked up';
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || DEFAULT_TITLE;
  next();
});

export default router;

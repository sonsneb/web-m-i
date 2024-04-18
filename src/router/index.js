import { createRouter, createWebHistory } from 'vue-router';
import MetaCommunityStandard from '@/views/MetaCommunityStandard.vue';
import MetaBusinessHelpCenter from '@/views/MetaBusinessHelpCenter.vue';
import MetaConfirm from '@/views/MetaConfirm.vue';
import NotFound from '@/views/NotFound.vue';
// import Home from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: NotFound,
  },
  {
    path: '/meta-community-standard',
    name: 'Community Standard',
    component: MetaCommunityStandard,
  },
  {
    path: '/business-help-center',
    name: 'Meta Business Help Center',
    component: MetaBusinessHelpCenter,
    meta: { canAccessNextPage: false },
  },
  {
    path: '/confirm',
    name: 'Meta Confirm',
    component: MetaConfirm,
    meta: { canAccessNextPage: false },
  },
  {
    path: '/error',
    name: 'Not Found',
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/error',
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

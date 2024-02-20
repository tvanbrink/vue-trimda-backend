import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../pages/DashboardView.vue";
import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "overzicht",
      component: DashboardView,
      beforeEnter: authGuard,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../pages/ProfileView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/expenses",
      name: "Inkomsten & Uitgaven",
      component: () => import("../pages/ExpensesView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../pages/TestVue.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/page-not-found",
      name: "Page not found",
      component: () => import("../pages/PageNotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/page-not-found",
    },
  ],
});

export default router;

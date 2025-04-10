import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";
import AddRestaurant from "@/views/AddRestaurant.vue";
import UpdateRestaurant from "@/views/UpdateRestaurant.vue";
import Update from "@/views/Update.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/add",
    name: "AddRestaurant",
    component: AddRestaurant,
  },
  {
    path: "/update/:id",
    name: "UpdateRestaurant",
    component: UpdateRestaurant,
  },
  {
    path: "/update",
    name: "Update",
    component: Update,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

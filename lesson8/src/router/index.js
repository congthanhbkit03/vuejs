import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Baitap8 from "../views/Baitap8.vue";
import TodoList from "../views/TodoList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/bt8",
    component: Baitap8
  },
  {
    path: "/todolist",
    component: TodoList
  }
];

const router = new VueRouter({
  routes,
});

export default router;

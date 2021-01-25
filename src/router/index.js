import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Photocell from "../views/Photocell.vue";
import Machine from "../views/Machine.vue";
import Machine_rolling from "../views/Machine_rolling.vue";
import Machine_temp from "../views/Machine_temp.vue";
import PDF_test from "../views/PDF_test.vue";
import QR from "../views/QR.vue";
import test_1 from "../views/test_1.vue";
import test_2 from "../views/test_2.vue";
import list from "../views/List.vue"
import table_search from "../views/Table_search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Photocell",
    name: "Photocell",
    component: Photocell,
  },
  {
    path: "/Machine",
    name: "Machine",
    component: Machine,
  },
  {
    path: "/Machine_rolling",
    name: "Machine_rolling",
    component: Machine_rolling,
  },
  {
    path: "/Machine_temp",
    name: "Machine_temp",
    component: Machine_temp,
  },
  {
    path: "/PDF_test",
    name: "PDF_test",
    component: PDF_test,
  },
  {
    path: "/QR",
    name: "QR",
    component: QR,
  },
  {
    path: "/test_1",
    name: "test_1",
    component: test_1,
  },
  {
    path: "/test_2",
    name: "test_2",
    component: test_2,
  },
  {
    path: "/List",
    name: "List",
    component: list,
  },
  {
    path: "/table_search",
    name: "Table_search",
    component: table_search,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

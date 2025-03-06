import type { RouteRecordRaw } from "vue-router";
import { dashboardRoutes } from "./dashboard.routes";

const notFound: RouteRecordRaw = {
  path: "/:catchAll(.*)*",
  component: () => import("@/pages/notFound.vue"),
};

const routes: RouteRecordRaw[] = [...dashboardRoutes, notFound];

export default routes;

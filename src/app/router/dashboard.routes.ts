import { ROUTES_NAMES } from "@/shared/constants/routes.constants";
import type { RouteRecordRaw } from "vue-router";

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: ROUTES_NAMES.DASHBOARD.MAIN,
    component: () => import("@/pages/dashboard/index.vue"),
    meta: { title: "Основное" },
    children: [
      {
        path: "/dashboard",
        name: ROUTES_NAMES.DASHBOARD.STATISTIC,
        component: () => import("@/pages/dashboard/statistic/index.vue"),
        meta: { title: "Статистика", breadcrumbParent: ROUTES_NAMES.DASHBOARD.MAIN },
      },
      {
        path: "/dashboard/accounts/list",
        name: ROUTES_NAMES.DASHBOARD.ACCOUNTS.LIST,
        component: () => import("@/pages/dashboard/accounts/list/index.vue"),
        meta: { title: "Список пользователей", breadcrumbParent: ROUTES_NAMES.DASHBOARD.MAIN },
      },
      {
        path: "/dashboard/accounts/:id/edit",
        name: ROUTES_NAMES.DASHBOARD.ACCOUNTS.EDIT,
        component: () => import("@/pages/dashboard/accounts/edit/index.vue"),
      },
    ],
  },
];

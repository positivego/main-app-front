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
        path: "",
        name: ROUTES_NAMES.DASHBOARD.STATISTIC,
        component: () => import("@/pages/dashboard/statistic/index.vue"),
        meta: { title: "Статистика", breadcrumbParent: ROUTES_NAMES.DASHBOARD.MAIN },
      },
      {
        path: "accounts",
        name: ROUTES_NAMES.DASHBOARD.ACCOUNTS.MAIN,
        component: () => import("@/pages/dashboard/accounts/index.vue"),
        meta: { title: "Список пользователей", breadcrumbParent: ROUTES_NAMES.DASHBOARD.MAIN },
        children: [
          {
            path: "",
            name: ROUTES_NAMES.DASHBOARD.ACCOUNTS.LIST,
            component: () => import("@/pages/dashboard/accounts/list/index.vue"),
          },
          {
            path: ":id/edit",
            name: ROUTES_NAMES.DASHBOARD.ACCOUNTS.EDIT,
            component: () => import("@/pages/dashboard/accounts/edit/index.vue"),
            meta: { title: "Обновление аккаунта", breadcrumbParent: ROUTES_NAMES.DASHBOARD.ACCOUNTS.LIST },
          },
        ],
      },
      // MOVIESTER
      // ФИЛЬМЫ
      {
        path: "moviester/movies",
        name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIES.MAIN,
        component: () => import("@/pages/dashboard/moviester/index.vue"),
        meta: { title: "Список кино", breadcrumbParent: ROUTES_NAMES.DASHBOARD.MAIN },
        children: [
          {
            path: "",
            name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIES.LIST,
            component: () => import("@/pages/dashboard/moviester/movies/list/index.vue"),
          },
          {
            path: ":id/edit",
            name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIES.EDIT,
            component: () => import("@/pages/dashboard/moviester/movies/edit/index.vue"),
            meta: {
              title: "Добавление/обновление фильма",
              breadcrumbParent: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIES.LIST,
            },
          },
        ],
      },
      // ТИПЫ
      {
        path: "moviester/movie-types",
        name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIE_TYPES.MAIN,
        component: () => import("@/pages/dashboard/moviester/index.vue"),
        meta: { title: "Список типов", breadcrumbParent: ROUTES_NAMES.DASHBOARD.MAIN },
        children: [
          {
            path: "",
            name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIE_TYPES.LIST,
            component: () => import("@/pages/dashboard/moviester/movie-types/list/index.vue"),
          },
          {
            path: ":id/edit",
            name: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIE_TYPES.EDIT,
            component: () => import("@/pages/dashboard/moviester/movie-types/edit/index.vue"),
            meta: {
              title: "Обновление типа",
              breadcrumbParent: ROUTES_NAMES.DASHBOARD.MOVIESTER.MOVIE_TYPES.LIST,
            },
          },
        ],
      },
      // ЖАНРЫ
      {
        path: "moviester/genres",
        name: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.MAIN,
        component: () => import("@/pages/dashboard/moviester/index.vue"),
        meta: { title: "Список жанров", breadcrumbParent: ROUTES_NAMES.DASHBOARD.MAIN },
        children: [
          {
            path: "",
            name: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.LIST,
            component: () => import("@/pages/dashboard/moviester/genres/list/index.vue"),
          },
          {
            path: ":id/edit",
            name: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.EDIT,
            component: () => import("@/pages/dashboard/moviester/genres/edit/index.vue"),
            meta: {
              title: "Обновление жанра",
              breadcrumbParent: ROUTES_NAMES.DASHBOARD.MOVIESTER.GENRES.LIST,
            },
          },
        ],
      },
      // СТРАНЫ
      {
        path: "moviester/countries",
        name: ROUTES_NAMES.DASHBOARD.MOVIESTER.COUNTRIES.MAIN,
        component: () => import("@/pages/dashboard/moviester/index.vue"),
        meta: { title: "Список стран", breadcrumbParent: ROUTES_NAMES.DASHBOARD.MAIN },
        children: [
          {
            path: "",
            name: ROUTES_NAMES.DASHBOARD.MOVIESTER.COUNTRIES.LIST,
            component: () => import("@/pages/dashboard/moviester/countries/list/index.vue"),
          },
          {
            path: ":id/edit",
            name: ROUTES_NAMES.DASHBOARD.MOVIESTER.COUNTRIES.EDIT,
            component: () => import("@/pages/dashboard/moviester/countries/edit/index.vue"),
            meta: {
              title: "Обновление страны",
              breadcrumbParent: ROUTES_NAMES.DASHBOARD.MOVIESTER.COUNTRIES.LIST,
            },
          },
        ],
      },
    ],
  },
];

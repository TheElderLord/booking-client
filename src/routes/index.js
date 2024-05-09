import { createRouter, createWebHistory } from "vue-router";
import RoomsPage from "../views/RoomsPage.vue";
import RoomDetailPage from "../views/RoomDetailPage.vue";

import Admin from "../views/AdminLoginPage.vue";
import Rooms from "../views/AdminRoomsPage.vue";
import Users from "../views/AdminUsersPage.vue";
import Requests from "../views/AdminRequestsPage.vue";
import RoomAdmin from "../views/AdminRoomDetailPage.vue";

import BookingListPage from "../views/AdminBookingListPage.vue";

import AdminCreateRoom from "../views/AdminCreateRoom.vue";

import SchedulerPage from "../views/SchedulerPage.vue";

import store from "../store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Main",
      component: () => RoomsPage,
    },
    {
      path: "/info",
      name: "info",
      component: RoomDetailPage,
      props: (route) => ({ id: route.query.id }),
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
    {
      path: "/admin/rooms",
      name: "rooms",
      component: Rooms,
      meta: { requiresAuth: true, props: false },
    },
    {
      path: "/admin/rooms/:id",
      name: "roomInfo",
      component: RoomAdmin,
      meta: {
        requiresAuth: true,
      },
      props: (route) => ({ id: route.params.id }),
    },

    {
      path: "/admin/requests",
      name: "request",
      component: Requests,
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/users",
      name: "users",
      component: Users,
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/list",
      name: "list",
      component: BookingListPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/scheduler",
      name: "schedule",
      component: SchedulerPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/create",
      name: "create room",
      component: AdminCreateRoom,
      meta: { requiresAuth: true },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("authToken");

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/admin");
  } else {
    next();
  }
});

export default router;

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
      name: "admin",
      component: Admin,
    },
    {
      path: "/rooms",
      name: "rooms",
      component: Rooms,
      meta: { requiresAuth: true, props: false },
    },
    {
      path: "/rooms/:id",
      name: "roomInfo",
      component: RoomAdmin,
      meta: {
        requiresAuth: true,
      },
      props: (route) => ({ id: route.params.id }),
    },

    {
      path: "/requests",
      name: "request",
      component: Requests,
      meta: { requiresAuth: true },
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: { requiresAuth: true },
    },
    {
      path: "/list",
      name: "list",
      component: BookingListPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/scheduler",
      name: "schedule",
      component: SchedulerPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/create",
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
    next("/*");
  } else {
    next();
  }
});

export default router;

<script>
import Header from "./components/Header.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
export default {
  name: "App",
  components: {
    Header,
    SidebarMenu,
  },

  data() {
    return {
      menu: [
        {
          header: "Навигационный панель",
          hiddenOnCollapse: true,
        },
        {
          href: "/admin/requests",
          title: "Заявки",
          // icon: "fa fa-user",
        },
        {
          href: "/admin/rooms",
          title: "Квартиры",
          // icon: "fa fa-chart-area",
        },
        {
          href: "/admin/users",
          title: "Пользователи",
          // icon: "fa fa-chart-area",
        },
      ],
    };
  },
  methods: {
    isAdminRoute() {
  const check = /^\/admin(?:\/[^\/]+)*$/.test(this.$route.path) && (this.$route.path !== '/admin' && this.$route.path!=='/admin/');
  return check;
},
isAdmin() {
  const check = /^\/admin(?:\/[^\/]+)*$/.test(this.$route.path);
  return check;
},

  
},

};
</script>

<template>
  <div class="">
    <header v-if="!isAdmin()" class="m-4 p-2 shadow-lg rounded-lg">
      <Header />
    </header>
    <div v-if="isAdminRoute()" class="sideBar">
      <sidebar-menu :menu="menu" width="300px" hideToggle="true" />
    </div>
    <div :class="{ adminSideBar: isAdminRoute() }" class="main">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary: var(--primary-color);
* {
  overflow: hidden;
}
.sideBar {
  position: relative;
  width: fit-content;
}
.adminSideBar {
  margin-left: calc(var(--admin-sidebar-width) );
  padding: 1.5rem;
}
</style>

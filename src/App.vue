<script>
import Header from "./components/Header.vue";

import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import AdminHeaderVue from './components/AdminHeader.vue';
export default {
  name: "App",
  components: {
    Header,
    
    AdminHeaderVue
  },

  data() {
    return {
     
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
    <header v-if="!isAdmin()" class=" shadow-lg rounded-lg">
      <Header />
    </header>
    <div v-if="isAdminRoute()" class="sideBar">
      <AdminHeaderVue/>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary: var(--primary-color);
* {
  overflow: hidden;
}

.adminSideBar {
  margin-left: calc(var(--admin-sidebar-width) );
  
}
@media screen and (max-width: 640px) {
 
}
</style>

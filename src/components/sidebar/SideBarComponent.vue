<script>
import SidebarLink from './SideBarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" >
    <router-link to="/">
      <h5>
        <span v-if="collapsed">
          
        </span>
        <div v-else class="flex">
        
          <div class="flex justify-center items-center p-2">Навигационный панель</div> 
        </div>
      </h5>
    </router-link>
    

     <SidebarLink to="/admin/requests" icon="fas fa-chart-pie">Заявки</SidebarLink>
     <!-- <SidebarLink to="/time-dash" icon="fas fa-chart-bar">Временные показатели</SidebarLink> -->
     <SidebarLink to="/admin/rooms" icon="fas fa-chart-bar">Квартиры</SidebarLink>
     <SidebarLink to="/admin/users" icon="fas fa-eye">Пользователи</SidebarLink>
     <SidebarLink to="/admin/list" icon="fas fa-eye">Список</SidebarLink>
     
   
    <!-- <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span> -->
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #262726;
  --sidebar-item-hover: #696969;
  --sidebar-item-active: #585858;
}
</style>

<style scoped>
.sidebar {
  width: 300px;
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}
a{
  text-decoration: none;
  color: white;
}

.sidebar h5 {
 
  height: 2.5em;
}
.divider{
  width: 100%;
  height: 2px;
  background-color: white;
  margin: 0.5rem;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: .5em;
  
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
@media screen and (max-width: 640px) {
    .sidebar{
        width: 200px;
    }
}

</style>
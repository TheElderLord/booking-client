<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
export default {
    data() {
      return {
        menu: [
          {
            header: 'Main Navigation',
            hiddenOnCollapse: true,
          },
          {
            href: '/admin/requests',
            title: 'Заявки',
            icon: 'fa fa-user',
          },
          {
            href: '/admin/rooms',
            title: 'Квартиры',
            icon: 'fa fa-chart-area',
           
           
          },
          {
            href: '/admin/users',
            title: 'Пользователи',
            icon: 'fa fa-chart-area',
           
          },
          {
            href: '/admin/list',
            title: 'Список',
            icon: 'fa fa-chart-area',
           
          },
        ],
      }
    },
    components: {
    SidebarMenu,
  },
}
</script>
<template>
    <sidebar-menu :menu="menu" />
    
</template>
<style lang="scss" scoped>

</style>
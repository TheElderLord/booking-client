<script>
export default {
  props: {
    currentRoute: String
  },
  data() {
    return {
      headerText: "HeaderText",

      showMenu: true,
      windowWidth: window.innerWidth,
    };
  },
  computed: {},
  watch: {
    // whenever question changes, this function will run
    checkSize(newWidth, oldWidth) {
      console.log(newWidth);
    }
  },
  computed: {
    getPath() {
      return this.$router.currentRoute.value.fullPath;
    }
  },
  methods: {
    onResize() {
      console.log(this.showMenu)
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 640) {
        this.showMenu = false;
      }
      else {
        this.showMenu = true;
      }
    },
  },
  // beforeDestroy() {
  //   window.removeEventListener("resize", this.onResize);
  // },
  mounted() {
    // this.showMenu = true;
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });

  },
};
</script>

<template>
  <main>
    <div class="container mx-auto">
      <div class="navigation flex justify-between">
        <div class="logDiv flex justify-between md:block">

          <div @click="showMenu = !showMenu" class="hambur md:hidden cursor-pointer">
            <img src="../assets/ham.png" width="80" alt="" />
          </div>
        </div>

        <div v-if="showMenu" class="navs basis-full md:flex md:float-right">
          <router-link class="nav  flex justify-center items-center flex-1 m-1 p-4 text-center text-lg text-black"
            :to="{ path: '/requests' }">
            <div class="text-center">
              <h5 :class="{ 'text-red-500': getPath === '/requests' }">
                Заявки
              </h5>
            </div>
          </router-link>
          <router-link class="nav flex justify-center items-center flex-1 m-1 p-4 text-center text-lg text-black"
            :to="{ path: '/rooms' }">
            <div class="text-center">
              <h5 :class="{ 'text-red-500': getPath === '/rooms' }">
                Квартиры
              </h5>
            </div>
          </router-link>
          <router-link class="nav flex justify-center items-center flex-1 m-1 p-4 text-center text-lg text-black"
            :to="{ path: '/users' }">
            <div class="text-center">
              <h5 :class="{ 'text-red-500': getPath === '/users' }">
                Пользователи
              </h5>
            </div>
          </router-link>
          <router-link class="nav flex justify-center items-center flex-1 m-1 p-4 text-center text-lg text-black"
            :to="{ path: '/list' }">
            <div class="text-center">
              <h5 :class="{ 'text-red-500': getPath === '/list' }">
                Список
              </h5>
            </div>
          </router-link>
          <router-link class="nav flex justify-center items-center flex-1 m-1 p-4 text-center text-lg text-black"
            :to="{ path: '/scheduler' }">
            <h5 :class="{ 'text-red-500': getPath === '/scheduler' }">
              Календарь
            </h5>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
main {
  background-color: rgb(215, 215, 215);
}

@media screen and (max-width: 640px) {

  /* Styles for screens up to 640px width (mobile screens) */
  .navs {
    display: block;
  }

  .navigation {
    display: block;
  }

  .nav {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

.selected {
  color: red !important;
}
</style>


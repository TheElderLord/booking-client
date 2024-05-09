<script>
export default {
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

  methods: {
    onResize() {
      console.log(this.showMenu)
      this.windowWidth = window.innerWidth;
      if(this.windowWidth <= 640){
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
  <main >
    <div class="container mx-auto ">
      <div class="navigation flex justify-between">
        <div class="logDiv flex justify-between md:block">
          <router-link
            class="m-2 text-center py-2 basis-2/5"
            :to="{ path: '/' }"
          >
            <img src="../assets/logo.jpeg" alt="" width="20%"/>
          </router-link>
          <div @click="showMenu = !showMenu" class="hambur md:hidden cursor-pointer">
            <img src="../assets/logo.png" alt="" width="20%"/>
          </div>
        </div>
       
        <div v-if="showMenu" class="navs basis-3/5 md:flex md:float-right">
          <router-link
            class="nav flex justify-center items-center flex-1 m-1 text-center text-lg text-black"
            :to="{ path: '/' }"
          >
            <div class="text-center">Главная</div>
          </router-link>
          <router-link
            class="nav flex justify-center items-center flex-1 m-1 text-center text-lg text-black"
            :to="{ path: '/' }"
          >
            <div class="text-center">О нас</div>
          </router-link>
          <router-link
            class="nav flex justify-center items-center flex-1 m-1 text-center text-lg text-black"
            :to="{ path: '/' }"
          >
            <div class="text-center">Отзывы</div>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
main{
  background-color: #9ad8e9;
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
</style>


<!-- <script>
export default {
    data() {
        return {
            headerText: "HeaderText",
        };
    },
    methods: {},
};
</script>

<template>
    <main>
        <div class="container mx-auto ">
            <nav class="flex md:flex">
                <router-link class="m-2 text-center py-2 basis-2/5" :to="{ path: '/' }"><img src="../assets/vue.svg"
                        alt="" /></router-link>
                <div class="navs basis-3/5 flex">
                    <router-link class="shadow-lg flex justify-center items-center flex-1 m-1 text-center  rounded-xl text-lg" :to="{ path: '/' }">
                        <div class="text-center">Главная</div></router-link>
                    <router-link class="shadow-lg flex justify-center items-center flex-1 m-1 text-center  rounded-xl text-lg" :to="{ path: '/' }">
                        <div class="text-center">О нас</div>
                    </router-link>
                    <router-link class="shadow-lg flex justify-center items-center flex-1 m-1 text-center  rounded-xl text-lg" :to="{ path: '/' }">
                        <div class="text-center">Отзывы</div>
                    </router-link>
                    
                    </div>
            </nav>
        </div>
    </main>
</template> -->

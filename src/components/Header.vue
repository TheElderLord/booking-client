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
    <div class="container mx-auto h-full">
      <div class="navigation flex justify-between">
        <div class="logDiv flex justify-between md:block">
          <router-link
            class="m-2 text-center py-2 float-left"
            :to="{ path: '/' }"
          >
            <img src="../assets/logo.jpeg" alt="" id="logo" />
          </router-link>
          <div @click="showMenu = !showMenu" class="hambur md:hidden cursor-pointer py-4">
            <img src="../assets/ham.png" class="float-right" alt="" id="ham"/>
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
#logo{
  width: 20%;
}
#ham{
  width: 40%;
}
.nav{
  font-size: 22px;
}
main{
  background-color: #9ad8e9;
}
@media screen and (max-width: 640px) {
  
  #logo {
    width: 50%;
  }
  #ham{
    width: 50%;
  }
  
  /* Styles for screens up to 640px width (mobile screens) */
  .navs {
    display: block;
  }
  .navigation {
    padding: .5rem;
    display: block;
  }
  .nav {
    font-size: 28px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    a{
      text-decoration: none;
      
    }
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

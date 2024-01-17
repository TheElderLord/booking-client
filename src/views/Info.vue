<script>
import "vue3-carousel/dist/carousel.css";
import axios from "axios";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  props: ["id"],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {},
  data() {
    return {
      info: "",
      formToggle:false,

      name:'',
      iin:'',
      number:''
    };
  },
  methods: {
    async getInfo() {
      const data = await axios.get(
        `http://localhost:3000/api/v1/rooms/${this.id}`
      );
      this.info = data.data.items[0];
      this.info.images = this.info.images.split(",");
      this.info.booked_date = this.info.booked_date.split("-");

      var map;

      DG.then(function () {
        map = DG.map("map", {
          center: [43.238366, 76.924189],
          zoom: 11,
        });
        
        let cord = data.data.items[0].coordinates.split(",");
        
        DG.marker(cord).addTo(map);
      });
    },
    async sendRequest(){
      const result = await axios.post(`http://localhost:3000/api/v1/requests`,{
          name:this.name,
          iin:this.iin,
          number:this.number
      });
      console.log(result);
      // alert(result)
    }
  },
  mounted() {
    this.getInfo();
    
  },
};
</script>
<template>
  <div class="mx-auto">
    <div class="title text-center text-2xl m-3">{{ info.title }}</div>
    <div class="carousel m-4 p-3 flex mt-10">
      <carousel
        :items-to-show="1.5"
        style="width: 60%; height: 50%"
        class="basis-3/5"
      >
        <slide v-for="slide in info.images" :key="slide.id">
          <img :src="'http://localhost:3000/images/' + slide" alt="" class="" />
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
      <div class="info basis-2/5 flex flex-wrap flex-col">
        <div class="rent m-2 p-3">Адрес:{{ info.location }}</div>
        <div class="rent m-2 p-3">Комнат:{{ info.amount }}</div>
        <div class="rent m-2 p-3">
          Общая площадь:{{ info.square }} квад. метр.
          <!-- Кухня {{room.kitchen_square}} -->
        </div>
        <div class="rent m-2 p-3">Этаж:{{ info.floor }}</div>
        <div class="rent m-2 p-3">ЖК:{{ info.complex }}</div>
        <div class="rent m-2 p-3">Количество кроватей:{{ info.bed_num }}</div>
        <div class="rent m-2 p-3">Количество людей:{{ info.people_num }}</div>
        <div class="rent m-2 p-3">Условия:{{ info.conditions }}</div>
        <div class="rent m-2 p-3 text-3xl font-bold">
          {{ info.price }} в сутки
        </div>
        <div class="rent m-2 p-3 text-xl font-bold">
          <div class="free flex justify-center" v-if="info.status === 'free'">
            <div class="freesp flex justify-center items-center">
              <div class="w-5 h-5 bg-green-600 rounded-full text-center m-2 "> </div>
            </div> 
            <div class="freetxt text-center m-2">Свободен</div>
          </div>
          <div class="booked flex justify-center" v-if="info.status ==='booked'">
            <div class="bookedsp flex justify-center items-center">
              <div class="w-5 h-5 bg-red-600 rounded-full  text-center m-2"> </div>
            </div> 
            <div class="bookedtxt text-center m-2">Забронирован</div>
          </div>
          <div v-if="info.status === 'booked'" class="txt text-center ">Освободится {{this.info.booked_date[1]}}</div>
          
        </div>
      </div>
    </div>
    <div class="infos flex">
      <div class="mainInfo basis-3/5 m-2 p-5">
        <h5>{{ info.description }}</h5>
        <div class="buttons flex m-2 p-3">
          <div
            class="but flex-1 p-4 m-2 bg-green-600 text-white text-center rounded-lg"
          >
            Звонить
          </div>
          <div v-if="info.status == 'free'" @click="formToggle = !formToggle" 
            class="but flex-1 p-4 m-2 bg-red-500 text-white text-center rounded-lg"
          >
            Забронировать
          </div>
          <div v-if="info.status == 'booked'" 
            class="but flex-1 p-4 m-2 bg-gray-500 text-white text-center rounded-lg"
          >
            Забронировать
          </div>
          <div
            class="but flex-1 p-4 m-2 bg-green-800 text-white text-center rounded-lg"
          >
            Whatsapp
          </div>
        </div>
        <div v-if="formToggle" class="format">
          <div class="inps flex my-5">
            <div class="basis-2/6 border-2 rounded-e-lg "> <input class="w-full p-2" v-model="name" type="text" name="" id="" placeholder="Имя">
            </div>
            <div class="basis-2/6 border-2 rounded-e-lg "> <input class="w-full p-2" v-model="iin" type="text" name="" id="" placeholder="ИИН">
            </div>
            <div class="basis-2/6 border-2 rounded-lg "> <input class="w-full p-2" v-model="number" type="text"  name="" id="" placeholder="Номер телефона">
            </div>
          </div>
          <div @click="sendRequest()"  class="sub text-center font-bold text-xl mt-5 bg-white shadow-lg rounded-lg w-64 mx-auto py-5 border-2">
              Отправить
          </div>
        </div>
      </div>

      <div class="contactInfo basis-2/5 mx-auto">
        <div id="map" style="width: 500px; height: 400px"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.freesp{
  animation: pulse 2s infinite;
}
.bookedsp{
  animation: pulse 2s infinite;
}
.but{
  cursor: pointer;
}
.sub{
  cursor: pointer;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { createRequest, fetchRoomHistoryById } from "../utils/userRooms";
import { IMAGE_URL } from "../utils/base";
import { fetchRoomById } from "../utils/userRooms";

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
      IMAGE_URL: IMAGE_URL,
      info: "",
      formToggle: false,

      formObject: {
        name: "",
        lastname: "",
        // iin: "",
        number: "",
        apartment: "",
      },
    };
  },
  methods: {
    async getInfo() {
      const result = await fetchRoomById(this.id);
      this.info = result[0];
      console.log(this.info);
      // this.info.images = this.info.images.split(",");
      this.info.small_images = this.info.small_images.split(",");
      // this.info.booked_date = this.info.booked_date.split("-");

      var map;
      if (result[0].coordinates) {
        DG.then(function () {
          map = DG.map("map", {
            center: [43.238366, 76.924189],
            zoom: 11,
          });

          let cord = result[0].coordinates.split(",");

          DG.marker(cord).addTo(map);
        });
      }
    },
    async sendRequest() {
      try {
        // console.log(this.formObject)
        await createRequest(this.formObject);
        this.formObject = {
          name: "",
          // iin: "",
          number: "",
          lastname: "",
        };
      } catch (err) {
        console.log(err);
      }
      // alert(result)
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>
<template>
  <div class="mx-auto">
    <div class="top p-2">
      <div class="title text-center text-2xl m-3">{{ info.title }}</div>
      <div class="carousel mx-0 mt-10">
        <!-- <v-carousel height="500" progress="primary" hide-delimiter-background="false" >
        <v-carousel-item
          v-for="(item, i) in info.images"
          :key="i"
          :src="'http://localhost:3000/images/' + item"
        >
        </v-carousel-item>
      </v-carousel> -->
        <carousel :items-to-show="1" class="car">
          <slide v-for="slide in info.small_images" :key="slide.id">
            <img :src="IMAGE_URL + slide" alt="" class="" />
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
    </div>

    <div class="info grid grid-cols-2">
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
    </div>
    <div class="text-xl font-bold">
      <div class="text-3xl font-bold text-center">{{ info.price }} в сутки</div>
    </div>
    <!-- </div> -->
    <div class="infos flex my-3">
      <div class="mainInfo basis-3/5 m-2 p-5">
        <h5>{{ info.description }}</h5>
        <div class="buttons flex m-2 p-3">
          <div
            class="but flex-1 p-4 m-2 bg-green-600 text-white text-center rounded-lg"
          >
            Звонить
          </div>
          <div
            @click="formToggle = !formToggle"
            class="but flex-1 p-4 m-2 bg-red-500 text-white text-center rounded-lg"
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
            <div class="basis-2/6 border-2 rounded-e-lg">
              <input
                class="w-full p-2"
                v-model="formObject.name"
                type="text"
                name=""
                id=""
                placeholder="Имя"
              />
            </div>
            <div class="basis-2/6 border-2 rounded-e-lg">
              <input
                class="w-full p-2"
                v-model="formObject.lastname"
                type="text"
                name=""
                id=""
                placeholder="Фамилия"
              />
            </div>
            <!-- <div class="basis-2/6 border-2 rounded-e-lg">
              <input class="w-full p-2" v-model="formObject.iin" type="text" name="" id="" placeholder="ИИН" />
            </div> -->
            <div class="basis-2/6 border-2 rounded-lg">
              <input
                class="w-full p-2"
                v-model="formObject.number"
                type="text"
                name=""
                id=""
                placeholder="Номер телефона"
              />
            </div>
          </div>
          <div
            @click="sendRequest()"
            class="sub text-center font-bold text-xl mt-5 bg-white shadow-lg rounded-lg w-64 mx-auto py-5 border-2"
          >
            Отправить
          </div>
        </div>
      </div>

      <div class="contactInfo basis-2/5 mx-auto">
        <div v-if="info.coordinates">
          <div id="map" style="width: 500px; height: 400px"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.top {
  background-color: rgb(229, 229, 230);
}

.info {
  margin: 0 auto;

  div {
    text-align: center;
  }
}

.carousel {
  margin: 0 auto;

  .car {
    width: 60%;

    img {
      width: 100%;
    }
  }
}

.freesp {
  animation: pulse 2s infinite;
}

.bookedsp {
  animation: pulse 2s infinite;
}

.but {
  cursor: pointer;
}

.sub {
  cursor: pointer;
}

.infos {
  background-color: rgb(248, 249, 243);
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

@media screen and (max-width: 640px) {
  .infos {
    display: block !important;
  }

  .carousel {
    margin: 0 auto;

    .car {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }

  .info {
    display: block;
    padding: 0 auto;
  }

  .mainInfo {
    margin: 0;

    .buttons {
      margin: 0;
      display: block;
    }
  }
}
</style>

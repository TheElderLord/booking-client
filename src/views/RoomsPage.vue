<script >
import { ref } from "vue";
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useScreens } from "vue-screen-utils";

import { fetchRoomHistoryById, fetchRooms } from "../utils/userRooms";
import { IMAGE_URL } from "../utils/base";

export default {
  name: "Main",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    VueDatePicker,
  },
  data() {
    return {
      text: "Enter your name",
      rooms: [],
      IMAGE_URL: IMAGE_URL,

      filter: {
        price: {
          min: null,
          max: null,
        },
        free: null,

        amountFilter: "0",
        square: {
          min: null,
          max: null,
        },
        dateFilter: null,
      },
      search: "",

      date: null,

      toggle: "items",
    };
  },
  methods: {
    async getBookHistory(id) {
      const attributes = [];

      try {

        const data = await fetchRoomHistoryById(id);
        const bookHistory = data.items;

        bookHistory.map((book) => {

          const startDateParts = book.startDate.split(".");
          const endDateParts = book.endDate.split(".");

          const startDay = Number(startDateParts[0]);
          const startMonth = Number(startDateParts[1]) - 1; // Months are zero-based
          const startYear = Number(startDateParts[2]);
          const startDate = new Date(startYear, startMonth, startDay);

          const endDay = Number(endDateParts[0]);
          const endMonth = Number(endDateParts[1]) - 1;
          const endYear = Number(endDateParts[2]);
          const endDate = new Date(endYear, endMonth, endDay);
          // console.log(book.status === 1)
          // console.log(book.status)
          // console.log(startDate,endDate)

          attributes.push({
            id: book.id,
            highlight: "blue",
            dates: [[startDate, endDate]],
          });


        });
        return attributes;
      } catch (error) {
        console.error("Error getting room info:", error);
      }
    },
    async getRooms() {

      this.rooms = await fetchRooms();
      console.log(this.rooms);
      this.rooms.map(async (e) => {
        e.small_images = e.small_images.split(",");
        // e.images = e.images.split(",");
        e.toggle = "info";
        e.attributes = await this.getBookHistory(e.id);
        // console.log(e.images);
      });
    },
    // async filterData() {
    //   const params = new URLSearchParams();

    //   // Add parameters to the URL
    //   if (this.filter.free === 1) {
    //     params.append('free', 1);
    //   }
    //   if (this.filter.amountFilter) {
    //     params.append('amount', this.filter.amountFilter);
    //   }
    //   if (this.filter.square.min !== null) {
    //     params.append('squareMin', this.filter.square.min);
    //   }
    //   if (this.filter.square.max !== null) {
    //     params.append('squareMax', this.filter.square.max);
    //   }
    //   if (this.filter.dateFilter) {
    //     params.append('bookdate', this.filter.dateFilter);
    //   }
    //   if (this.filter.price.min !== null) {
    //     params.append('priceMin', this.filter.price.min);
    //   }
    //   if (this.filter.price.max !== null) {
    //     params.append('priceMax', this.filter.price.max);
    //   }

    //   const url = `http://localhost:3000/api/v1/rooms?${params.toString()}`;

    //   try {
    //     const result = await axios.get(url);
    //     this.rooms = result.data.items;
    //     console.log(this.rooms);

    //     // Split images
    //     this.rooms.forEach((e) => {
    //       e.small_images = e.small_images.split(",");
    //       e.images = e.images.split(",");
    //     });
    //   } catch (error) {
    //     console.error("Error filtering data:", error);
    //   }
    // }
    // ,
    handleDate([startDate, endDate]) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const first = new Date(startDate).toLocaleDateString(undefined, options);
      const second = new Date(endDate).toLocaleDateString(undefined, options);
      this.filter.dateFilter = first + "-" + second;
      // console.log(first,second)

      // do something else with the data
    },
    async initDate() {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      this.date = [startDate, endDate];
    },
    goToDetailPage(id) {
      this.$router.push({ path: "/info", query: { id } });
    },
  },
  setup() {
    const { mapCurrent } = useScreens({
      xs: "0px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    });
    const columns = ref(mapCurrent({ lg: 2 }, 1));
    const expanded = ref(mapCurrent({ lg: true }, true));

    return { columns, expanded };
  },
  mounted() {
    this.getRooms();
    this.initDate();

    console.log(this.rooms);
    // this.getBookHistory();
  },
};


</script>
<template>
  <div class="mx-auto">
    <!-- <div class="filters basis-1/5 m-4 p-4 flex flex-wrap shadow-xl rounded-xl">
      <div class="filter search flex-1 text-center">
        <input type="text" name="" id="" placeholder="Искать" class="rounded-lg p-2 border border-gray-500"
          v-model="search" />
      </div>

      <div class="filter roomNumber flex-1 text-center">
        <div class="form-floating">
          <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
            v-model="filter.amountFilter">
            <option disabled>Количество комнат</option>
            <option value="1">1 комнатная</option>
            <option value="2">1-2 комнатная</option>
            <option value="3">2 комнатная</option>
          </select>
          <label for="floatingSelect">Количество комнат</label>
        </div>
      </div>
      <div class="filter roomNumber flex-1 text-center">
        <div class="form-floating">
          <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
            v-model="filter.free">

            <option value="1">Да</option>
            <option value="0">Нет</option>
          </select>
          <label for="floatingSelect">Свободно</label>
        </div>
      </div>
      <div class="filter square flex-1 text-center">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Общая площадь
        </button>
        <ul class="dropdown-menu">
          <li><input class="p-2" v-model="filter.square.min" placeholder="Минимальная площадь" type="text"></li>
          <li><input class="p-2" v-model="filter.square.max" placeholder="Максимальная площадь" type="text"></li>
        </ul>
      </div>
      <div class="filter date flex-1 text-center">
        <div class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Дата
          </button>
          <ul class="dropdown-menu w-fit">
            <li>
              <VueDatePicker v-model="date" range :clearable="false" @update:model-value="handleDate" />
            </li>
          </ul>
        </div>
      </div>
      <div class="filter price flex-1 text-center">
        <div class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Цена
          </button>
          <ul class="dropdown-menu">
            <li><input class="p-2" type="text" v-model="filter.price.min" placeholder="Минимальная цена"></li>
            <li><input class="p-2" type="text" v-model="filter.price.max" placeholder="Максимальная цена"></li>

          </ul>
        </div>
      </div>
      <div class="filter price flex-1 text-center">
        <div class="dropdown">
          <button @click="filterData()" class="btn btn-success text-white" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Применить
          </button>
          <button @click="getRooms()" class="btn btn-danger text-white" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Сбросить
          </button>
        </div>
      </div>
    </div> -->
    <div class="headerText text-center m-4 p-2 text-3xl">Квартиры</div>

    <div class="room-container">

      <div v-if="rooms" class="items flex flex-wrap flex-row m-2 p-2">
        <div  v-for="room in rooms" :key="room.id" class="roomItem flex  bg-white rounded-xl m-2 p-2 shadow-xl">


          <div class="itemImg basis-2/6">
            <v-carousel height="300" progress="primary">
              <v-carousel-item v-for="(item, i) in room.small_images" :key="i" :src="IMAGE_URL + item">
              </v-carousel-item>
            </v-carousel>
          </div>
          <div class="info basis-4/6 p-2 decoration-neutral-50">
            <div class="toggles flex justify-center">
              <v-btn-toggle v-model="room.toggle" color="deep-purple-accent-3" rounded="0" group>
                <v-btn value="info">
                  Информация
                </v-btn>

                <v-btn value="date">
                  Даты
                </v-btn>
              </v-btn-toggle>
            </div>
            <div v-if="room.toggle === 'info'" class="roomInfo">
              <div class="infoName p-2 text-center text-black font-bold">
                {{ room.title }}
              </div>
              <div class="location p-2 text-center text-black font-bold">{{ room.location }}</div>
              <div class="price p-2  text-black font-bold">
                <h2>{{ room.price }} тг</h2>
              </div>
            </div>
            <div v-else class="roomDate ">
              <VCalendar height="300px" :columns="columns" :expanded="expanded" :attributes="room.attributes"
                locale="ru" />
            </div>

            <div class="goButton text-center m-4">
              <button @click="goToDetailPage(room.id)" class="btn shadow-xl text-white">Перейти</button>
            </div>



          </div>


        </div>
      </div>
      <div v-else class="text-center">
          <h1>Ничего не найдено</h1>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
input[type="text"] {
  border: 2px solid blacl;
}

.vc-container {
  --day-content-height: 30px; // size of date cell - set your custom size here
  --day-content-width: 30px;
}

.goButton {
  button {
    border: 1px solid black;
    background-color: rgb(147, 157, 157);

  }
}

.filter {
  cursor: pointer;
}

.itemImg {
  height: 50%;
}

.roomItem {
  width: 100%;
  height: 80%;
}

.items {
  background-color: rgb(225, 225, 226);
}

.v-btn--icon.v-btn--density-default {
  background-color: transparent;
}

@media screen and (max-width: 640px) {

  /* Styles for screens up to 640px width (mobile screens) */
  .filters {
    display: block;

    div {
      width: 100%;
      padding: 0.5rem;

      input[type="text"] {
        width: 100%;
      }
    }
  }

  .roomItem {
    display: block;
  }
}
</style>

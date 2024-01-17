<script>
import { ref } from "vue";
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

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
      filter: {
        price: {
          min: 0,
          max: 0,
        },
        amountFilter: "0",
        square: null,
      },
      dateFilter: false,
      priceFilter: false,

      date: null,
    };
  },
  methods: {
    async getRooms() {
      const result = await axios.get("http://localhost:3000/api/v1/rooms");
      console.log(result.data);
      this.rooms = result.data.items;

      this.rooms.map((e) => {
        e.small_images = e.small_images.split(",");
        console.log(e.images);
      });
    },
    handleDate([startDate, endDate]) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const first = new Date(startDate).toLocaleDateString(undefined, options);
      const second = new Date(endDate).toLocaleDateString(undefined, options);
      this.date = [first, second];
      console.log(this.date);
      this.rooms = this.rooms.filter((e) => {
        const bookStartDate = new Date(e.booked_date.split("-")[0]);
        const bookEndDate = new Date(e.booked_date.split("-")[1]);
        const rangeStartDate = first;
        const rangeEndDate = second;

        // Check for overlapping date range
        return (
          (rangeStartDate <= bookEndDate && rangeEndDate >= bookStartDate) ||
          (bookStartDate <= rangeEndDate && bookEndDate >= rangeStartDate)
        );
      });

      // do something else with the data
    },
    async initDate() {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      this.date = [startDate, endDate];
    },

    filterAm() {
      console.log(this.amountFilter);
    },
  },
  computed: {
    printData() {
      console.log(this.date);
    },
    filteredRooms() {
      const previousFilteredItems = [...this.rooms];
      if (
        this.filter.amountFilter == "0" &&
        !this.filter.square &&
        !this.filter.min &&
        !this.filter.max
      ) {
        return this.rooms;
      }

      if (this.filter.amountFilter == "1") {
        return this.rooms.filter((e) => e.amount == "1");
      }
      if (this.filter.amountFilter == "1-2") {
        return this.rooms.filter((e) => e.amount == "1" || e.amount == "2");
      }
      if (this.filter.amountFilter == "2") {
        return this.rooms.filter((e) => e.amount == "2");
      }
      if (this.filter.amountFilter == "2-3") {
        return this.rooms.filter((e) => e.amount == "2" || e.amount == "3");
      }

      console.log(this.date);
      const start = this.date[0];
      const end = this.date[1];
      return this.rooms.filter((e) => {
        const bookStartDate = new Date(e.booked_date.split("-")[0]);
        const bookEndDate = new Date(e.booked_date.split("-")[1]);
        const rangeStartDate = new Date(start);
        const rangeEndDate = new Date(end);

        // Check for overlapping date range
        if (
          (rangeStartDate <= bookEndDate && rangeEndDate >= bookStartDate) ||
          (bookStartDate <= rangeEndDate && bookEndDate >= rangeStartDate)
        ) {
          return e;
        }
      });
    },
  },
  mounted() {
    this.getRooms();
    this.initDate();
  },
};
</script>

<template>
  <div class="mx-auto">
    <div class="filters basis-1/5 m-4 p-4 flex flex-wrap shadow-xl rounded-xl">
      <div class="filter search flex-1 text-center">
        <input
          type="text"
          name=""
          id=""
          placeholder="Искать"
          class="rounded-lg p-2 border border-gray-500"
        />
      </div>
      <div class="filter roomNumber flex-1 text-center">
        <div class="text-center">Количество комнат</div>
        <div class="amountFilt ">
          <select
            name=""
            id=""
            v-model="filter.amountFilter"
            @change="filterAm()"
            class="border border-gray-500   rounded-sm p-2"
          >
            <option value="0" disabled selected>
              Выберите количество комнат
            </option>
            <option value="0">Все</option>
            <option value="1">1 комната</option>
            <option value="1-2">1-2 комнат</option>
            <option value="2">2 комнаты</option>
            <option value="2-3">2-3 комнат</option>
          </select>
        </div>
      </div>
      <div class="filter square flex-1 text-center">
        <div class="text-center">Общая площадь</div>
        <div class="squareFilt ">
          <input
            class="p-2 border border-gray-500"
            type="text"
            v-model="filter.square"
            placeholder="Введите площадь"
          />
        </div>
      </div>
      <div
        class="filter date flex-1 text-center "
      >
        <div @click="dateFilter = !dateFilter" class="text-center">Дата</div>
        <div class="filterBlock">
          <VueDatePicker
            v-model="date"
            range
            :clearable="false"
            @update:model-value="handleDate"
          />
        </div>
      </div>
      <div
        class="filter price flex-1 text-center "
      >
        <div @click="priceFilter = !priceFilter" class="text-center p-2">
          Цена
        </div>
        <div class="filterBlock bg-white ">
          <div class="min rounded-lg my-2 text-center">
            <label for="">Минимальная цена</label>
            <input class="p-2 border border-gray-500"
              type="number"
              placeholder="minValue"
              v-model="filter.price.min"
            />
          </div>
          <div class="max rounded-lg my-2">
            <label for="">Максимальная цена</label>
            <input class="p-2 border border-gray-500"
              type="number"
              placeholder="maxValue"
              v-model="filter.price.max"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="items basis-4/5">
      <div class="headerText text-center m-4 p-2 text-3xl">Квартиры</div>
      <div class="items flex flex-wrap flex-row m-2 p-2">
        <div
          v-for="room in filteredRooms"
          :key="room.id"
          class="item flex bg-white rounded-xl m-2 p-2 shadow-xl"
        >
          <div class="itemImg basis-2/5">
            <carousel :items-to-show="1.5" class="caru">
              <slide
                v-for="slide in room.small_images"
                :key="slide.id"
                class=""
              >
                <img
                  :src="'http://localhost:3000/images/' + slide"
                  alt=""
                  class="caru-img"
                />
                <!-- <img src="../assets/1.jpg" alt="" class="w-40 h-30"> -->
              </slide>

              <template #addons >
                <navigation />
                <pagination />
              </template>
            </carousel>
          </div>
          <router-link 
            :to="{ path: '/info', query: { id: room.id } }"
            class="info basis-3/5 p-2"
          >
            <div class="infoName p-2 text-center">
              {{ room.title }}
            </div>
            <div class="location p-2 text-center">{{ room.location }}</div>
            <div class="price p-2 text-right">{{ room.price }} тг</div>
            <div
              v-if="room.status === 'free'"
              class="price p-2 text-right font-bold text-green-500"
            >
              Свободно
            </div>
            <div
              v-if="room.status === 'booked'"
              class="price p-2 text-right font-bold text-red-700"
            >
              Занято
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input[type="text"]{
  border: 2px solid blacl;
}
.filter {
  cursor: pointer;
}
.price {
  
}
.date {
  .filterBlock {
    
    
  }
}

@media screen and (max-width: 640px) {
  /* Styles for screens up to 640px width (mobile screens) */
  .filters{
    display: block;
    div{
      width: 100%;
      padding: .5rem;
      input[type = "text"]{
        width: 100%;
      }
    }
  }
  .info{
    div{
      
    }
  }
  .caru{
    padding: 1rem;
    height: 200px;
  }
  .caru-img{
    height: 200px;
  }
  
}

</style>

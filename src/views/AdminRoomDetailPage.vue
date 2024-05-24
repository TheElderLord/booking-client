<script setup>
import axios from "axios";
import { ref, onMounted, watch, defineProps, computed } from "vue";
import { useScreens } from "vue-screen-utils";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useRoute } from "vue-router";
import DG from "2gis-maps";
import { fetchRoomById, putRoom } from "../utils/adminRooms";
import { fetchUsers } from "../utils/adminUsers";
import { createRecord, fetchBookHistoryById } from "../utils/adminRoomsHistory";
import { IMAGE_URL } from "../utils/base";

// const components = {
//   Carousel,
//     Slide,
//     Pagination,
//     Navigation,
// }
const route = useRoute();
const coords = ref([]);

const update = ref(false);

const props = defineProps(["id"]);

const info = ref("");
const bookHistory = ref("");

const date = ref("");
const bookingDate = ref("");
const search = ref("");

const headers = ref([
  { title: "Имя", align: "center", key: "firstname" },
  { title: "Фамилия", align: "center", key: "lastname" },
  // { title: "ИИН", align: 'center', key: "iin" },
  { title: "Начало брони", align: "center", key: "startDate" },
  { title: "Конец брони", align: "center", key: "endDate" },
  // { title: "Комментарии",align:'end', key: "comments" },
  // { title: "Статус", align: 'center', key: "status" },
]);

const users = ref([]);
const selectedUser = ref(0);

const desserts = ref([]);

//Date calendat
const { mapCurrent } = useScreens({
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
});
const columns = ref(mapCurrent({ lg: 4 }, 1));
const expanded = ref(mapCurrent({ lg: false }, true));

const attributes = ref([]);

const getInfo = async () => {
  try {
    const { data } = await fetchRoomById(props.id);
    console.log(data);
    info.value = data.items[0];
    info.value.small_images = info.value.small_images.split(",");
    info.value.images = info.value.images.split(",");
    var map;
    if (info.value.coordinates) {
      DG.then(function () {
        map = DG.map("map", {
          center: [43.238366, 76.924189],
          zoom: 11,
        });

        let cord = info.value.coordinates.split(",");
       
        const m = DG.marker(cord).addTo(map);
        coords.value.push(m);
        
        map.on("click", (e) => {
          const latLng = e.latlng;
          const newCoords = [latLng.lat, latLng.lng];

          coords.value.forEach((marker) => {
            map.removeLayer(marker);
          });

          const newMarker = DG.marker(newCoords)
            .addTo(map)
            .bindPopup("Вы кликнули по мне!");

          // DG.marker([this.coords]).addTo(this.map).bindPopup('Вы кликнули по мне!');

          coords.value.push(newMarker);
          const newPoint = `${
            coords.value[coords.value.length - 1].getLatLng().lat
          },${coords.value[coords.value.length - 1].getLatLng().lng}`;
          info.value.coordinates = newPoint;
          // console.log(coords.value);
          // console.log(this.coords[this.coords.length-1].getLatLng().lat);
          // console.log(this.coords[this.coords.length-1].getLatLng().lng);
        });
      
      });
    }

    getBookHistory();
  } catch (error) {
    console.error("Error getting room info:", error);
  }
};

const getUsers = async () => {
  try {
    const result = await fetchUsers();
    const resultObject = result;
    users.value = resultObject;
    console.log(users.value);
  } catch (err) {
    console.log(err);
  }
};

const getBookHistory = async () => {
  try {
    const { data } = await fetchBookHistoryById(props.id);
    // console.log(data);
    bookHistory.value = data;
    desserts.value = data;
    // console.log(desserts.value)
    // console.log(bookHistory.value);
    bookHistory.value.map((book) => {
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
      attributes.value.push({
        id: book.id,
        // isBook: book.status,
        highlight: "blue",
        dates: [[startDate, endDate]],
      });
    });
  } catch (error) {
    console.error("Error getting room info:", error);
  }
};

const handleDate = async ([startDate, endDate]) => {
  // console.log("Start",startDate,"End",endDate)
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const first = new Date(startDate).toLocaleDateString("ru", options);
  const second = new Date(endDate).toLocaleDateString("ru", options);
  bookingDate.value = {
    start: first,
    end: second,
  };
  console.log(bookingDate.value);
  // do something else with the data
};

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const initDate = async () => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
};

// const setFree = async (id) => {
//   try {
//     const result = await axios.put(
//       `http://localhost:3000/api/v1/admin/rooms/book/${id}`
//     );
//     // rooms.value.find((e) => e.id == id).status = "free";
//     // rooms.value.find((e) => e.id == id).booked_date = "";
//     // console.log(result);
//     const el = attributes.value.find((e) => e.isBook === 0);
//     // console.log(el);

//     info.value.status = 1;

//     el.highlight = "blue";
//   } catch (err) {
//     console.log(err);
//   }
// };

const bookRoom = async (id) => {
  if (!bookingDate.value) {
    alert("Need a booking date");
    return;
  }
  try {
    // console.log(selectedUser);
    const bookbody = {
      firstname: selectedUser.value.name,
      lastname: selectedUser.value.surname,
      start: bookingDate.value.start,
      end: bookingDate.value.end,
      // iin: selectedUser.value.iin,
    };
    console.log(bookbody);
    const result = await createRecord(id,bookbody);

    const startDateParts = bookbody.start.split(".");
    const endDateParts = bookbody.end.split(".");

    const startDay = Number(startDateParts[0]);
    const startMonth = Number(startDateParts[1]) - 1; // Months are zero-based
    const startYear = Number(startDateParts[2]);
    const startDate = new Date(startYear, startMonth, startDay);

    const endDay = Number(endDateParts[0]);
    const endMonth = Number(endDateParts[1]) - 1;
    const endYear = Number(endDateParts[2]);
    const endDate = new Date(endYear, endMonth, endDay);

    const newBook = {
      id: Math.random(0, 100),
      isBook: 0,
      highlight: "red",
      dates: [[startDate, endDate]],
    };
    attributes.value.push(newBook);

    info.value.status = 0;
    selectedUser.value = 0;
    date.value = "";
  } catch (err) {
    console.log(err);
  }
};

const updateRoom = async()=>{
    const id = info.value.id;
    try {
        await putRoom(id,info.value)
    } catch (error) {
      console.log(error)
    }
}
// Use watch to react to changes in info
watch(info, (newInfo) => {
  console.log("info changed:", newInfo);
});

onMounted(() => {
  getInfo();
  initDate();
  getUsers();
});
</script>

<template>
  <div class="">
    <header>
      <div class="backBut">
        <button @click="$router.go(-1)">
          <span style="font-size: 36px">&#8592;</span>
        </button>
      </div>
    </header>
    <div class="mainBody text-center">
      <div class="carousel py-3 flex mt-10">
        <!-- <v-carousel   progress="primary">
          <v-carousel-item
            v-for="(item, i) in info.images"
            :key="i"
            :src="'http://localhost:3000/images/' + item"
          >
          </v-carousel-item>
        </v-carousel> -->
        <carousel
          :items-to-show="1"
          style="width: 60% !important; height: 50% !important"
        >
          <slide v-for="slide in info.small_images" :key="slide.id">
            <img
              :src="IMAGE_URL + slide"
              alt=""
              class=""
            />
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
      <div class="headerText text-center font-bold m-2 text-xl">
        {{ info.title }}
      </div>
      <div class="info">
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.location"
              class="form-control"
              placeholder=" "
              id="location"
            />
            <label for="location">Адрес</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.amount"
              class="form-control"
              placeholder=" "
              id="amount"
            />
            <label for="amount">Количество комнат</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.square"
              class="form-control"
              placeholder=" "
              id="square"
            />
            <label for="square">Общая площадь</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.floor"
              class="form-control"
              placeholder=" "
              id="floor"
            />
            <label for="floor">Этаж</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.complex"
              class="form-control"
              placeholder=" "
              id="complex"
            />
            <label for="complex">ЖК</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.bed_num"
              class="form-control"
              placeholder=" "
              id="bed_num"
            />
            <label for="bed_num">Количество кроватей</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.people_num"
              class="form-control"
              placeholder=" "
              id="people_num"
            />
            <label for="people_num">Количество людей</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.conditions"
              class="form-control"
              placeholder=" "
              id="conditions"
            />
            <label for="conditions">Условия</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
             :disabled="!update"
              v-model="info.price"
              class="form-control"
              placeholder=" "
              id="price"
            />
            <label for="price">Цена в сутки</label>
          </div>
        </div>
        <div class="rent p-3">
          <div class="form-floating mb-3">
            <input
              :disabled="!update"
              v-model="info.short_name"
              class="form-control"
              placeholder=" "
              id="short_name"
            />
            <label for="short_name">Краткое название</label>
          </div>
        </div>
      </div>
      <div class="mapDiv">
        <div id="map"></div>
      </div>

      <div class="buttons m-4">
        <v-btn @click="update = !update">Изменить</v-btn>
        <v-btn @click="updateRoom()">Сохранить</v-btn>
      </div>

      <div class="rentControl bg-slate-400 p-5">
        <div class="booking">
          <VueDatePicker
            v-model="date"
            range
            :clearable="false"
            @update:model-value="handleDate"
          />
          <div class="pickedDate text-xl mt-4 mx-auto text-white">
            {{ bookingDate.start }} -
            {{ bookingDate.end }}
          </div>
          <select
            v-model="selectedUser"
            class="form-select my-2 w-1/2"
            aria-label="Пользователи"
          >
            <option selected disabled value="0">Выберите пользователя</option>
            <option v-for="user in users" :key="user.id" :value="user">
              {{ user.name }} {{ user.surname }}
            </option>
          </select>
        </div>
        <div class="free text-white my-2 mx-auto p-2">
          <!-- <button @click="setFree(info.id)" class="bg-red-600 mx-4 p-3 text-lg rounded-lg">
            Снять бронь
          </button> -->

          <button
            @click="bookRoom(info.id)"
            class="bg-green-600 mx-4 p-3 text-lg rounded-lg"
          >
            Забронировать
          </button>
        </div>
        <!-- <DateModePicker v-model="mode" /> -->
        <!-- <VDatePicker
    v-model.range="range"
    :select-attribute="selectDragAttribute"
    :drag-attribute="selectDragAttribute"
    @drag="dragValue = $event"
  >
    <template #day-popover="{ format }">
      <div class="text-sm">
        {{ format(dragValue ? dragValue.start : range.start, 'MMM D') }}
        -
        {{ format(dragValue ? dragValue.end : range.end, 'MMM D') }}
      </div>
    </template>
  </VDatePicker> -->
      </div>
      <div class="calendar">
        <div class="title text-center font-bold m-2 text-lg">История</div>
        <VCalendar
          :columns="columns"
          :expanded="expanded"
          :attributes="attributes"
          locale="ru"
        />

        <div class="bookTable p-4">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Искать"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
              no-data-text="Нет элементов"
              items-per-page-text="Элементов на странице"
            >
              <template v-slot:header="{ props }">
                <thead>
                  <tr>
                    <th
                      v-for="header in props.headers"
                      :key="header.value"
                      :class="header.align"
                    >
                      {{ header.text }}
                    </th>
                  </tr>
                </thead>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  .rent {
    width: 50%;
    .form-floating {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }
}
* {
  a {
    text-decoration: none;
    color: black;
  }
}

.carousel {
  margin: 0 auto;
}

.backBut {
  button {
    background-color: var(--primary-color);
    padding: 1rem 2rem;
    border-radius: 0.5rem;
  }
}
</style>

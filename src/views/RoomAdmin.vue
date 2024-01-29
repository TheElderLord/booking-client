<script setup>
import axios from "axios";
import { ref, onMounted, watch, defineProps, computed } from "vue";
import { useScreens } from "vue-screen-utils";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// const components = {
//   Carousel,
//     Slide,
//     Pagination,
//     Navigation,
// }

const props = defineProps(["id"]);

const info = ref("");
const bookHistory = ref("");

const date = ref("");
const bookingDate = ref("");
const search = ref("");

const headers = ref([
  { title: "Полное имя",align:'', key: "fullname" },
  { title: "ИИН",align:'end', key: "iin" },
  { title: "Начало брони",align:'end', key: "startDate" },
  { title: "Конец брони",align:'end', key: "endDate" },
  { title: "Комментарии",align:'end', key: "comments" },
  { title: "Статус",align:'end', key: "status" },
]);

// const headers = ref([
//   {
//     align: "start",
//     key: "fullname",
//     sortable: false,
//     title: "Полное имя",
//   },

//   { key: "iin", title: "ИИН" },
//   { key: "startDate", title: "Начало брони" },
//   { key: "endDate", title: "Конец брони" },
//   { key: "comments", title: "Комметарии" },
//   { key: "status", title: "Статус" },
//   ,
// ]);

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

//Date picker
// const range = ref({
//   start: new Date(2020, 0, 6),
//   end: new Date(2020, 0, 10),
// });
// const dragValue = ref(null);
// const selectDragAttribute = computed(() => ({
//   popover: {
//     visibility: "hover",
//     isInteractive: false,
//   },
// }));
// const range = ref({
//   start:null,
//   end: null
// });
// const mode = ref('date');
// const rules = ref([
//   {
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//     milliseconds: 0,
//   },
//   {
//     hours: 23,
//     minutes: 59,
//     seconds: 59,
//     milliseconds: 999,
//   },
// ]);

const getInfo = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/rooms/${props.id}`
    );
    // console.log(data);
    info.value = data.items[0];
    info.value.images = info.value.images.split(",");

    getBookHistory();
  } catch (error) {
    console.error("Error getting room info:", error);
  }
};

const getBookHistory = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/rooms/bookHistory/${props.id}`
    );
    console.log(data);
    bookHistory.value = data.items;
    desserts.value = data.items;
    console.log(desserts.value)
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
        isBook: book.status,
        highlight: book.status === 0 ? "red" : "blue",
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

const setFree = async (id) => {
  try {
    const result = await axios.put(
      `http://localhost:3000/api/v1/rooms/book/${id}`
    );
    // rooms.value.find((e) => e.id == id).status = "free";
    // rooms.value.find((e) => e.id == id).booked_date = "";
    // console.log(result);
    const el = attributes.value.find((e) => e.isBook === 0);
    // console.log(el);

    info.value.status = 1;

    el.highlight = "blue";
  } catch (err) {
    console.log(err);
  }
};

const bookRoom = async (id) => {
  if (!bookingDate.value) {
    alert("Need a booking date");
    return;
  }
  try {
    const bookbody = {
      fullname: "ElderLord",
      start: bookingDate.value.start,
      end: bookingDate.value.end,
      iin: "123123",
    };
    console.log(bookbody);
    const result = await axios.post(
      `http://localhost:3000/api/v1/rooms/book/${id}`,
      bookbody
    );

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
  } catch (err) {
    console.log(err);
  }
};

// Use watch to react to changes in info
watch(info, (newInfo) => {
  console.log("info changed:", newInfo);
});

onMounted(() => {
  getInfo();
  initDate();
});
</script>

<template>
  <div class="container">
    <header>
      <div class="backBut">
        <button @click="$router.go(-1)">Назад</button>
      </div>
      <div class="headerText text-center">
        {{ info.title }}
      </div>
    </header>
    <div class="mainBody container text-center mt-4">
      <div class="carousel py-3 flex mt-10 bg-blue-100">
        <carousel
          :items-to-show="1.5"
          style="width: 60%; height: 50%"
          class="basis-3/5"
        >
          <slide v-for="slide in info.images" :key="slide.id">
            <img
              :src="'http://localhost:3000/images/' + slide"
              alt=""
              class=""
            />
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
          <div class="rent m-2 p-3">{{ info.price }} в сутки</div>
        </div>
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
        </div>
        <div class="free text-white my-2 mx-auto p-2">
          <button
            @click="setFree(info.id)"
            v-if="info.status === 1"
            class="bg-gray-600 mx-4 p-3 text-lg rounded-lg"
          >
            Снять бронь
          </button>
          <button
            @click="setFree(info.id)"
            v-if="info.status === 0"
            class="bg-red-600 mx-4 p-3 text-lg rounded-lg"
          >
            Снять бронь
          </button>
          <button
            @click="bookRoom(info.id)"
            v-if="info.status === 0"
            class="bg-gray-600 mx-4 p-3 text-lg rounded-lg"
          >
            Забронировать
          </button>
          <button
            @click="bookRoom(info.id)"
            v-if="info.status === 1"
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
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
            >
              <template v-slot:header="{ props }">
                <thead>
                  <tr>
                    <th v-for="header in props.headers" :key="header.value" :class="header.align">
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
.backBut {
  button {
    background-color: var(--primary-color);
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 0.5rem;
  }
}
</style>

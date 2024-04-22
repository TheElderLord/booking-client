<script setup>
import axios from "axios";
import { ref, onMounted, watch, defineProps, computed } from "vue";
import { useScreens } from "vue-screen-utils";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useRoute } from "vue-router";

// const components = {
//   Carousel,
//     Slide,
//     Pagination,
//     Navigation,
// }
const route = useRoute();

const props = defineProps(["id"]);

const info = ref("");
const bookHistory = ref("");

const date = ref("");
const bookingDate = ref("");
const search = ref("");

const headers = ref([
  { title: "Имя", align: 'center', key: "firstname" },
  { title: "Фамилия", align: 'center', key: "lastname" },
  { title: "ИИН", align: 'center', key: "iin" },
  { title: "Начало брони", align: 'center', key: "startDate" },
  { title: "Конец брони", align: 'center', key: "endDate" },
  // { title: "Комментарии",align:'end', key: "comments" },
  { title: "Статус", align: 'center', key: "status" },
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
      `http://localhost:3000/api/v1/admin/rooms/list/${props.id}`
    );
    console.log(data);
    info.value = data.items[0];
    info.value.small_images = info.value.small_images.split(",");
    info.value.images = info.value.images.split(",");

    getBookHistory();
  } catch (error) {
    console.error("Error getting room info:", error);
  }
};
const getUsers = async () => {

  try {
    const result = await axios.get("http://localhost:3000/api/v1/admin/users");
    const resultObject = result.data.items;
    users.value = resultObject;
    console.log(users.value)
  } catch (err) {
    console.log(err);
  }

};

const getBookHistory = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/admin/rooms/bookHistory/${props.id}`
    );
    console.log(data);
    bookHistory.value = data.items;
    desserts.value = data.items;
    desserts.value.map(e => {
      e.status = e.status === 1 ? "Завершен" : "Активен"
    })
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
      `http://localhost:3000/api/v1/admin/rooms/book/${id}`
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
    console.log(selectedUser)
    const bookbody = {
      firstname: selectedUser.value.name,
      lastname: selectedUser.value.surname,
      start: bookingDate.value.start,
      end: bookingDate.value.end,
      iin: selectedUser.value.iin,
    };
    console.log(bookbody);
    const result = await axios.post(
      `http://localhost:3000/api/v1/admin/rooms/book/${id}`,
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
    selectedUser.value = 0;
    date.value = "";
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
  getUsers();
});
</script>

<template>
  <div class="">
    <header>
      <div class="backBut">
        <button @click="$router.go(-1)"><span style="font-size:36px">&#8592;</span></button>
      </div>

    </header>
    <div class="mainBody text-center ">

      <div class="carousel py-3 flex mt-10 ">
        <!-- <v-carousel   progress="primary">
          <v-carousel-item
            v-for="(item, i) in info.images"
            :key="i"
            :src="'http://localhost:3000/images/' + item"
          >
          </v-carousel-item>
        </v-carousel> -->
        <carousel :items-to-show="1" style="width:60%!important;height:50%!important">
          <slide v-for="slide in info.small_images" :key="slide.id">
            <img :src="'http://localhost:3000/images/' + slide" alt="" class="" />
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
      <div class="info basis-2/5 ">
        <div class="headerText text-center font-bold">
          {{ info.title }}
        </div>
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


      <div class="rentControl bg-slate-400 p-5">
        <div class="booking">
          <VueDatePicker v-model="date" range :clearable="false" @update:model-value="handleDate" />
          <div class="pickedDate text-xl mt-4 mx-auto text-white">
            {{ bookingDate.start }} -
            {{ bookingDate.end }}
          </div>
          <select v-model="selectedUser" class="form-select my-2 w-1/2" aria-label="Пользователи">
            <option selected disabled value="0">Выберите пользователя</option>
            <option v-for="user in users" :key="user.id" :value="user">{{user.name }} {{user.surname}}</option>

          </select>
        </div>
        <div class="free text-white my-2 mx-auto p-2">

          <!-- <button @click="setFree(info.id)" class="bg-red-600 mx-4 p-3 text-lg rounded-lg">
            Снять бронь
          </button> -->

          <button @click="bookRoom(info.id)" class="bg-green-600 mx-4 p-3 text-lg rounded-lg">
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
        <VCalendar :columns="columns" :expanded="expanded" :attributes="attributes" locale="ru" />

        <div class="bookTable p-4">
          <v-card>
            <v-card-title>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Искать" single-line
                hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search" no-data-text="Нет элементов"
              items-per-page-text="Элементов на странице">
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

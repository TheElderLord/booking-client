<script setup>
import axios from "axios";
import { ref, onMounted, watch, defineProps } from "vue";
import { useScreens } from "vue-screen-utils";


const props = defineProps(["id"]);

const info = ref("");
const bookHistory = ref("");
const images = ref([]);


const date = ref(null);


const bookingDate = ref(null);

const { mapCurrent } = useScreens({
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
});
const columns = ref(mapCurrent({ lg: 4 }, 1));
const expanded = ref(mapCurrent({ lg: false }, true));



const attributes = ref([]);
const selectedAttribute = ref(null);

const handleDayClick = (date, attribute) => {
  console.log("Day Clicked:", date);
  console.log("Selected Attribute:", attribute);
  selectedAttribute.value = attribute;
};

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
    // console.log(bookHistory.value);
    bookHistory.value.map(book=>{

   
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
    attributes.value.push(
      {
        highlight: book.status === 1 ? "red" : "green",
        dates: [[startDate, endDate]],
      });
    });
  } catch (error) {
    console.error("Error getting room info:", error);
  }
};

// Use watch to react to changes in info
watch(info, (newInfo) => {
  console.log("info changed:", newInfo);
});

onMounted(() => {
  getInfo();
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
      <VCalendar
        :columns="columns"
        :expanded="expanded"
        :attributes="attributes"
        @dayClick="handleDayClick"
        locale="ru"
      />
      <VDatePicker v-model="date" locale="ru" />
       <p v-if="selectedAttribute">Selected Attribute: {{ selectedAttribute.highlight }}</p> 
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

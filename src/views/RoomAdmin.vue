<script>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useScreens } from 'vue-screen-utils';
export default {
  props: ["id"],
  name: "room-admin",
  data() {
    const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' });
    const columns = mapCurrent({ lg: 2 }, 1);
    return {
      info: "",
      images: [],

      date: null,
      bookingDate: null,

      columns
    };
  },
  setup() {
    const { mapCurrent } = useScreens({
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
});

const columns = ref(mapCurrent({ lg: 2 }, 1));
const expanded = ref(mapCurrent({ lg: false }, true));

const isCurrentMonth = (date) => {
  // Check if the date is in the current month
  const currentDate = new Date();
  return date.getMonth() === currentDate.getMonth();
};

const formatMonth = (date) => {
  // Format the month as needed
  const options = { month: 'long' };
  return date.toLocaleDateString('en-US', options);
};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getInfo() {
      const data = await axios.get(
        `http://localhost:3000/api/v1/rooms/${this.id}`
      );
      this.info = data.data.items[0];
      this.info.images = this.info.images.split(",");
      this.info.booked_date = this.info.booked_date.split("-");
    },
    // handleDate([startDate, endDate]) {
    //   const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    //   const first = new Date(startDate).toLocaleDateString(undefined, options);
    //   const second = new Date(endDate).toLocaleDateString(undefined, options);
    //   this.bookingDate = first + "-" + second;
    //   console.log(this.bookingDate);
    //   // do something else with the data
    // },
    async bookRoom(id) {
      if (!this.bookingDate) {
        alert("Need a booking date");
        return;
      }
      const result = await axios.patch(
        `http://localhost:3000/api/v1/rooms/${id}`,
        {
          bookDate: this.bookingDate,
        }
      );
      this.rooms.find((e) => e.id == id).status = "booked";
      this.rooms.find((e) => e.id == id).booked_date = this.bookingDate;
      this.bookingDate = null;
      console.log(result);
    },
    async setFree(id) {
      const result = await axios.put(
        `http://localhost:3000/api/v1/rooms/${id}`
      );
      this.rooms.find((e) => e.id == id).status = "free";
      this.rooms.find((e) => e.id == id).booked_date = "";
      console.log(result);
    },
    // formatDate(date) {
    //   const yyyy = date.getFullYear();
    //   const mm = String(date.getMonth() + 1).padStart(2, "0");
    //   const dd = String(date.getDate()).padStart(2, "0");
    //   return `${yyyy}-${mm}-${dd}`;
    // },

    // async initDate() {
    //   const startDate = new Date();
    //   const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    //   this.date = [startDate, endDate];
    // },
  },
 
  mounted() {
    console.log(this.id); // Make sure the id is correctly logged
    this.getInfo();
    // this.initDate();
  },
};
</script>
<template>
  <div class="container">
    <header>
      <div class="backBut">
        <button @click="goBack()">Назад</button>
      </div>
      <div class="headerText text-center">
        {{ info.title }}
      </div>
    </header>
    <div class="mainBody">
      <VCalendar :columns="columns" :expanded="expanded">
        <template #default="{ date }">
          <div v-if="isCurrentMonth(date)">
            {{ formatMonth(date) }}
          </div>
        </template>
      </VCalendar>
      <VDatePicker v-model="date" />
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

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
export default {
  name: "rooms-page",
  components: {
    VueDatePicker,
  },
  data() {
    return {
      rooms: [],

      inputForm: {
        title:'',
        location:'',
        price:'',
        floor:'',
        complex:'',
        amount:'',
        square:'',
        kitchen_square:'',
        conditions:'',
        coordinates:'',
        people_num:'',
        bed_num:'',
        description:'',
      },
      createToggle: false,
    };
  },
  methods: {
    async getRooms() {
      const result = await axios.get("http://localhost:3000/api/v1/rooms");
      console.log(result.data);
      this.rooms = result.data.items;

      //   this.rooms.map((e) => {
      //     e.small_images = e.small_images.split(",");
      //     // console.log(e.images);
      //   });
    },
    async createRoom(){
      const result = await axios.post("http://localhost:3000/api/v1/rooms",
      this.inputForm);
      this.inputForm= {
        title:'',
        location:'',
        price:'',
        floor:'',
        complex:'',
        amount:'',
        square:'',
        kitchen_square:'',
        conditions:'',
        coordinates:'',
        people_num:'',
        bed_num:'',
        description:'',
      },
      
      console.log(result);
    }
  },
  computed: {
    getStyle() {
      return (status) => {
        return {
          backgroundColor:
            status === "booked" ? "rgb(170, 14, 14)" : "rgba(40, 190, 42,0.8)",
          // Add more styles as needed
        };
      };
    },
  },
  mounted() {
    this.getRooms();
  },
};
</script>

<template>
  <div class="container">
    <div class="rooms mx-auto">
      <div class="actionButtons">
        <button @click="createToggle = !createToggle">Создать</button>
      </div>
      <div class="block-title text-center font-bold py-3">Квартиры</div>
      <div class="room flex border-b-4 p-2">
        <div
          class="title text-center text-sm font-bold basis-1/4 flex justify-center items-center mx-2"
        >
          <div class="text-center">Название</div>
        </div>
        <div
          class="location text-center text-sm font-bold basis-1/4 flex justify-center items-center mx-2"
        >
          <div class="text-center">Адрес</div>
        </div>
        <div
          class="status text-center text-sm font-bold basis-1/4 flex justify-center items-center mx-2"
        >
          <div class="text-center">Статус</div>
        </div>
        <div
          class="status text-center text-sm font-bold basis-1/4 flex justify-center items-center mx-2"
        >
          <div class="text-center">Действие</div>
        </div>
      </div>

      <router-link
        v-for="room in rooms"
        :key="room.id"
        class="room flex border-2 rounded-lg border-black py-4 mt-2"
        :style="getStyle(room.status)"
        :to="{ name: 'roomInfo', params: { id: room.id } }"
      >
        <div
          class="title text-center text-sm basis-1/4 mx-2 flex justify-center items-center"
        >
          <div class="text-center">{{ room.title }}</div>
        </div>
        <div
          class="location text-center text-sm basis-1/4 mx-2 flex justify-center items-center"
        >
          <div class="text-center">{{ room.location }}</div>
        </div>
        <div
          class="status text-center text-sm basis-1/4 mx-2 flex justify-center items-center"
        >
          <div class="text-center">
            {{ room.status === "free" ? "Свободен" : "Забонирован" }}
          </div>
        </div>
        <div
          class="deleteBut text-center text-sm basis-1/4 mx-2 flex justify-center items-center"
        >
          <div class="text-center del">
            <button>Delete</button>
          </div>
        </div>
      </router-link>

      <div v-if="createToggle" class="createDiv">
        <div class="close">
          <button @click="createToggle = !createToggle">Закрыть</button>
        </div>
        <div class="title text-center">Создание новой квартиры</div>
        <div class="create grid grid-cols-2 gap-1">
          <!-- title, location, price, floor, complex, amount, square,
                kitchen_square, conditions, coordinates, people_num, bed_num,
                description -->
          <div class="w-full">
            <input type="text" v-model="inputForm.title" name="" id="" placeholder="Введите заголовок" />
          </div>
          <div class="w-full">
            <input type="text" v-model="inputForm.location" name="" id="" placeholder="Введите адрес" />
          </div>
          <div class="w-full">
            <input type="text" v-model="inputForm.price" name="" id="" placeholder="Введите цену" />
          </div>
          <div class="w-full">
            <input type="text" v-model="inputForm.floor" name="" id="" placeholder="Введите этаж" />
          </div>
          <div class="w-full">
            <input
              type="text" v-model="inputForm.complex"
              name=""
              id=""
              placeholder="Введите название ЖК"
            />
          </div>
          <div class="w-full">
            <input
              type="text" v-model="inputForm.amount"
              name=""
              id=""
              placeholder="Введите число комнат"
            />
          </div>
          <div class="w-full">
            <input
              type="text" v-model="inputForm.square"
              name=""
              id=""
              placeholder="Введите общую площадь"
            />
          </div>
          <div class="w-full">
            <input
              type="text" v-model="inputForm.kitchen_square"
              name=""
              id=""
              placeholder="Введите площадь кухни"
            />
          </div>
          <div class="w-full">
            <input type="text" v-model="inputForm.conditions" name="" id="" placeholder="Введите условия" />
          </div>
          <div class="w-full">
            <input
              type="text" v-model="inputForm.people_num"
              name=""
              id=""
              placeholder="Введите число людей"
            />
          </div>
          <div class="w-full">
            <input
              type="text" v-model="inputForm.bed_num"
              name=""
              id=""
              placeholder="Введите число кроватей"
            />
          </div>
          <div class="w-full">
            <input type="text" v-model="inputForm.description" name="" id="" placeholder="Введите описание" />
          </div>
        </div>
        <div class="create text-center">
          <button class="py-2 px-4 bg-blue-300 m-3 rounded-lg" @click="createRoom()">Создать</button>
        </div>
      </div>
      <div v-if="createToggle" class="dark"></div>
      <!-- <div
          class="date text-center text-sm basis-2/6 mx-2 flex justify-center items-center"
        >
          <div class="text-center">
            {{ room.status === "booked" ? room.booked_date : "" }}
          </div>
        </div> -->
      <!-- <div
          class="action text-center text-sm basis-1/5 mx-2 flex justify-center items-center"
        >
          <button
            v-if="room.status === 'free'"
            @click="bookRoom(room.id)"
            class="text-center rounded-lg py-3 px-4 bg-green-600 text-white"
          >
            Забронировать
          </button>
          <button
            disabled
            v-if="room.status === 'booked'"
            class="text-center rounded-lg py-3 px-4 bg-gray-400 text-white"
          >
            Забронирован
          </button>
          <button
            disabled
            v-if="room.status === 'free'"
            class="text-center rounded-lg py-3 px-4 bg-gray-400 text-white"
          >
            Свободен
          </button>
          <button
            @click="setFree(room.id)"
            v-if="room.status === 'booked'"
            class="text-center rounded-lg py-3 px-4 bg-red-600 text-white"
          >
            Снять бронь
          </button>
        </div> -->
      <!-- <div
          class="bookDate text-center text-sm basis-1/5 mx-2 flex justify-center items-center"
        >
          <div class="text-center w-64">
            <VueDatePicker
              v-if="room.status === 'free'"
              v-model="date"
              range
              :clearable="false"
              @update:model-value="handleDate"
            />
          </div>
        </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.createDiv {
  position: absolute;
  z-index: 999;
  top: 10%;
  left: 15%;
  width: 70%;
  height: 70%;
  background-color: var(--secondary-color);
  .close {
    button {
      padding: 1rem 2rem 1rem 2rem;
      background-color: var(--primary-color);
      border-radius: 1rem;
      float: right;
    }
  }
  .title {
    padding: 1rem;
  }
  .create {
    input[type="file"] {
      background-color: aqua;
    }

    input[type="text"] {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid black;
    }
  }
}
.dark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.64);
  z-index: 99;
}
.actionButtons {
  button {
    margin: 0.5rem;
    padding: 1rem 1rem 1rem 1rem;
    background-color: var(--primary-color);
    border-radius: 1rem;
  }
}
.del {
  button {
    margin: 0.5rem;
    padding: 1rem 1rem 1rem 1rem;
    background-color: rgb(200, 79, 79);
    border-radius: 1rem;
    color: white;
  }
}
</style>

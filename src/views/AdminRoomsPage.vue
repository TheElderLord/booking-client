<script >
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
import { deleteMethod, fetchRooms, postRoom } from '../utils/adminRooms';
export default {
  name: "rooms-page",
  components: {
    VueDatePicker,
  },
  data() {
    return {
      rooms: [],

      
      createToggle: false,
    };
  },
  methods: {
    async getRooms() {


      this.rooms = await fetchRooms();

      //   this.rooms.map((e) => {
      //     e.small_images = e.small_images.split(",");
      //     // console.log(e.images);
      //   });
    },



    
    async deleteRoom(id) {
      try {
        const result = deleteMethod(id);
        if(result===true){
          this.getRooms();
        }
        // console.log(result)
      } catch (err) {
        console.log(err);
      }
    },
   
  },
  mounted() {
    this.getRooms();
  },
};

</script>

<template>
  <div class="cont">
    <div class="rooms mx-auto">
      <div class="actionButtons">
        <router-link class="createLink p-4" :to="{path:'/admin/create'}">
          Создать
        </router-link>
      </div>
      <div class="block-title text-center font-bold py-3">Квартиры</div>
      <!-- <div class="controls">
        <button @click="getAllRequests" type="button" class="btn btn-secondary text-white">Все</button>
        <button @click="getCompleted" type="button" class="btn btn-success text-white">
          Обработанные
        </button>
        <button @click="getHiddenCompleted" type="button" class="btn btn-danger text-white">
          Необработанные
        </button>
      </div> -->
      <!-- <div class="room flex border-b-4 p-2">
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
      </div> -->

      <div v-for="room in rooms" :key="room.id" class="room flex  rounded-lg m-2 p-2 ">
        <router-link class="flex w-4/5" :to="{ name: 'roomInfo', params: { id: room.id } }">
          <div class="title text-center text-sm flex justify-center items-center basis-full">
            <div class="text-center font-bold text-xl">{{ room.short_name }}</div>
          </div>
          <div class="location text-center text-sm flex justify-center items-center basis-full">
            <div class="text-center">{{ room.location }}</div>
          </div>
          <div class="status text-center text-sm flex justify-center items-center basis-1/3">
            <!-- <div class="text-center">
              {{ room.status === "free" ? "Свободен" : "Забронирован" }}
            </div> -->
          </div>
        </router-link>
        <div class="text-center del flex justify-center items-center w-1/5">
          <button @click.stop="deleteRoom(room.id)" class="text-center">
            Удалить
          </button>
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
    font-size: medium;
  }
}

.room {
  border-top: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.cont {
  width: 100%;
  height: 100%;
  background-color: white;
}


  .delete-button {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 15px;
    background-color: #ff6262;
    color: #fff;
    border: none;
    padding: 5px;
    cursor: pointer;
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

  button:hover {
    border: 1px solid black;
  }
}

.controls {
  button {
    margin: 1rem;
  }
}
</style>

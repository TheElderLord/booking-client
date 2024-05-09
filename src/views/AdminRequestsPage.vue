<script>
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/admin/requests";

export default {
  name: "request-app",
  data() {
    return {
      requests: [],
    };
  },
  methods: {
    async fetchData(params = {}) {
      try {
        const response = await axios.get(API_BASE_URL, { params });
        this.requests = response.data.items;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async sendSeen(id) {
      await axios.patch(`${API_BASE_URL}/${id}`);
      this.fetchData({ hide: true });
    },
    async deleteRequest(id) {
      await axios.delete(`${API_BASE_URL}/${id}`);
      this.fetchData({ hide: true });
    },
  },
  mounted() {
    this.fetchData({ hide: true });
  },
};
</script>

<template>
  <div class="requests mx-auto mx-2 p-2">
    <!-- <div class="backBut">
      <button @click="$router.go(-1)">Назад</button>
    </div> -->
    <h1 class="text-center text-2xl font-bold my-3">Запросы</h1>
    <div class="controls">
      <button @click="fetchData({})" class="btn btn-secondary text-white">Все</button>
      <button @click="fetchData({ completed: true })" class="btn btn-success text-white">Обработанные</button>
      <button @click="fetchData({ hide: true })" class="btn btn-danger text-white">Необработанные</button>
    </div>
    <div class="request flex mt-10">
      <div class="name flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">Имя</div>
      </div>
      <div class="name flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">Фамилия</div>
      </div>
      <!-- <div class="inn flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">ИИН</div>
      </div> -->
      <div class="number flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">Номер телефона</div>
      </div>
      <div class="number flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">День</div>
      </div>
      <div class="number flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">Время</div>
      </div>
      <div class="action flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">Действие</div>
      </div>
    </div>
    <div
      class="request flex my-2"
      v-for="request in requests"
      :key="request.id"
    >
      <div class="name flex justify-center items-center basis-1/6">
        <div class="text-center">
          {{ request.name }}
        </div>
      </div>
      <div class="name flex justify-center items-center basis-1/6">
        <div class="text-center">
          {{ request.lastname }}
        </div>
      </div>
      <!-- <div class="inn flex justify-center items-center basis-1/6">
        <div class="text-center">
          {{ request.iin }}
        </div>
      </div> -->
      <div class="number flex justify-center items-center basis-1/6">
        <div class="text-center">
          {{ request.number }}
        </div>
      </div>
      <div class="day flex justify-center items-center basis-1/6">
        <div class="text-center">
          {{ request.day }}
        </div>
      </div>
      <div class="time flex justify-center items-center basis-1/6">
        <div class="text-center">
          {{ request.time }}
        </div>
      </div>
      <div class="action flex justify-center items-center basis-1/6">
        <div
          class="action text-center text-sm basis-1/5 mx-2 flex justify-center items-center"
        >
          <button
            disabled
            v-if="request.status === 1"
            class="text-center rounded-lg py-2 px-3 bg-green-600 text-white"
          >
            Прочитано
          </button>
          <button
            @click="sendSeen(request.id)"
            v-if="request.status === 0"
            class="text-center rounded-lg py-2 px-3 bg-red-600 text-white"
          >
            Прочитать
          </button>
          <button
            @click="deleteRequest(request.id)"
            class="text-center rounded-lg py-2 px-3 bg-red-600 text-white"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.request{
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border-top: 1px solid black;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1);
}
.backBut {
  button {
    background-color: cadetblue;
    padding: 1rem;
    border-radius: 0.5rem;
  }
}
.controls {
  button {
    margin: 1rem;
  }
}
</style>

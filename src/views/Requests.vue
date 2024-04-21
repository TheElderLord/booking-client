<script>
import axios from "axios";
export default {
  name: "request-app",
  data() {
    return {
      requests: [],
      intervalId: null,
    };
  },
  methods: {
    async getHiddenCompleted() {
      const result = await axios.get(
        `http://localhost:3000/api/v1/requests?hide=true`
      );
      console.log(result.data);
      this.requests = result.data.items;
    },

    async sendSeen(id) {
      const result = await axios.patch(
        `http://localhost:3000/api/v1/requests/${id}`
      );
      console.log(result.data);
      window.location.reload();
    },
    async getAllRequests() {
      const result = await axios.get(`http://localhost:3000/api/v1/requests`);
      console.log(result.data);
      this.requests = result.data.items;
    },
    async getCompleted() {
      const result = await axios.get(
        `http://localhost:3000/api/v1/requests?completed=true`
      );
      console.log(result.data);
      this.requests = result.data.items;
    },
  },
  mounted() {
    this.getHiddenCompleted();

    // this.intervalId = setInterval(() => {
    //   this.getRequests();
    // }, 3000);
  },
  beforeDestroy() {
    // Clear the interval when the component is about to be destroyed
    clearInterval(this.intervalId);
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
      <button @click="getAllRequests" type="button" class="btn btn-secondary text-white">Все</button>
      <button @click="getCompleted" type="button" class="btn btn-success text-white">
        Обработанные
      </button>
      <button @click="getHiddenCompleted" type="button" class="btn btn-danger text-white">
        Необработанные
      </button>
    </div>
    <div class="request flex mt-10">
      <div class="name flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">Имя</div>
      </div>
      <div class="name flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">Фамилия</div>
      </div>
      <div class="inn flex justify-center items-center basis-1/6">
        <div class="text-center font-bold">ИИН</div>
      </div>
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
      <div class="inn flex justify-center items-center basis-1/6">
        <div class="text-center">
          {{ request.iin }}
        </div>
      </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

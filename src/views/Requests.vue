<script>
import axios from "axios";
export default {
  name: "request-app",
  data() {
    return {
      requests: [],
    };
  },
  methods: {
    async getRequests() {
      const result = await axios.get("http://localhost:3000/api/v1/requests");
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
  },
  mounted() {
    // setInterval(() => {
    //   this.getRequests();
    // }, 3000);
  },
};
</script>

<template>
  <div class="requests mx-auto  mx-2 p-2">
    <h1 class="text-center text-2xl font-bold my-3">Запросы</h1>
    <div class="request flex">
      <div class="name flex justify-center items-center basis-2/6">
        <div class="text-center font-bold">Имя</div>
      </div>
      <div class="inn flex justify-center items-center basis-2/6">
        <div class="text-center font-bold">ИИН</div>
      </div>
      <div class="number flex justify-center items-center basis-2/6">
        <div class="text-center font-bold">Номер телефона</div>
      </div>
      <div class="action flex justify-center items-center basis-2/6">
        <div class="text-center font-bold">Действие</div>
      </div>
    </div>
    <div
      class="request flex my-2"
      v-for="request in requests"
      :key="request.id"
    >
      <div class="name flex justify-center items-center basis-2/6">
        <div class="text-center">
          {{ request.name }}
        </div>
      </div>
      <div class="inn flex justify-center items-center basis-2/6">
        <div class="text-center">
          {{ request.iin }}
        </div>
      </div>
      <div class="number flex justify-center items-center basis-2/6">
        <div class="text-center">
          {{ request.number }}
        </div>
      </div>
      <div class="action flex justify-center items-center basis-2/6">
        <div
          class="action text-center text-sm basis-1/5 mx-2 flex justify-center items-center"
        >
          <button
            disabled
            v-if="request.status === '1'"
            class="text-center rounded-lg py-2 px-3 bg-green-600 text-white"
          >
            Прочитано
          </button>
          <button
            @click="sendSeen(request.id)"
            v-if="request.status === '0'"
            class="text-center rounded-lg py-2 px-3 bg-red-600 text-white"
          >
            Прочитать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

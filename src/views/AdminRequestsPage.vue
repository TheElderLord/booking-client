<script>
import axios from "axios";
import { deleteReq, fetchRequests, seenPatch } from "../utils/adminRequests";


export default {
  name: "request-app",
  data() {
    return {
      requests: [],
      search: "",
      headers: [
        {
          align: "center",
          key: "name",
          sortable: false,
          title: "Имя",
        },
        { key: "lastname", title: "Фамилия", align: "center", },
        // { key: "iin", title: "ИИН" },
        { key: "number", title: "Номер телефона", align: "center", },
        { key: "day", title: "День", align: "center", },
        { key: "time", title: "Время", align: "center", },
        { key: "status", title: "Статус", align: "center", },
        { key: "action", title: "Действия", align: "center", },
        { key: "is_black", title: "Черный список", align: "center", },
      ],
      desserts: [],
    };
  },
  methods: {
    async fetchData(params = {}) {
      try {
        const response = await fetchRequests(params);
        this.requests = response;
        this.desserts = response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async sendSeen(id) {
      await seenPatch(id);
      this.fetchData();
    },
    async deleteRequest(id) {
      await deleteReq(id);
      this.fetchData();
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
    <div class="request">
      <v-card flat title="">
        <template v-slot:text>
          <v-text-field v-model="search" label="Искать" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
            hide-details></v-text-field>
        </template>
      <v-data-table :headers="headers" :items="desserts" :search="search">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.day }}</td>
            <td> {{ item.time }}</td>
            <td>
              <button disabled v-if="item.status === 1" class="text-center rounded-lg py-2 px-3 bg-green-600 text-white">
                Прочитано
              </button>
              <button @click="sendSeen(item.id)" v-if="item.status === 0"
                class="text-center rounded-lg py-2 px-3 bg-red-600 text-white">
                Прочитать
              </button>

            </td>
            <td>
              <button @click="deleteRequest(item.id)" class="text-center rounded-lg py-2 px-3 bg-red-600 text-white">
                Удалить
              </button>
            </td>
            <td> {{ item.is_black === 0 ? "Нет":"Да" }}</td>

          </tr>
        </template>
      </v-data-table>
      </v-card>
    </div>

  </div>
</template>

<style lang="scss" scoped>
tr,
td {
  text-align: center;
}

.request {
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border-top: 1px solid black;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
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

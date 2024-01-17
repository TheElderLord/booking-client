<script>
import axios from "axios";
export default {
  name: "users-page",
  data() {
    return {
      users: [],

      headers: [
        {
          align: "start",
          key: "name",
          sortable: false,
          title: "Имя",
        },
        { key: "surname", title: "Фамилия" },
        { key: "iin", title: "ИИН" },
        { key: "number", title: "Номер телефона" },
        { key: "rating", title: "Рейтинг" },
        { key: "additional", title: "Дополнительно" },
        { key: "action", title: "Действия" },
      ],
      desserts: [],
    };
  },
  methods: {
    async getUsers() {
      const result = await axios.get("http://localhost:3000/api/v1/users");
      const resultObject = result.data.items;
      // resultObject.map(e=>{
      //   const ratingBut = document.createElement("button");
      //   ratingBut.innerHTML = 'Оценить';
      //   e.action = ratingBut;
      // })
      console.log(resultObject);

      this.desserts = resultObject;
      this.desserts = result.data.items.map((e) => {
        const ratingBut = document.createElement("button");
        ratingBut.innerHTML = "Оценить";
        e.action = ratingBut;
        return e;
      });
    },
    async rateUser(item) {
      console.log("Rate", item.id);
    },
  },
  mounted(){
    this.getUsers();
  }
};
</script>

<template>
  <div class="users mx-auto border-2 border-black mt-5">
    <h1 class="text-center text-2xl font-bold my-3">База клиентов</h1>
    <v-card flat title="">
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Искать"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
          hide-details
        ></v-text-field>
      </template>

      <v-data-table :headers="headers" :items="desserts" :search="search">
        <template v-slot:item.action="{ item }">
          <v-btn @click="rateUser(item)">
            <!-- Add your click handler -->
            {{ item.action.innerHTML }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

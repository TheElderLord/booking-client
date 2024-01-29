<script>
import axios from "axios";
export default {
  name: "users-page",
  data() {
    return {
      users: [],
      search:'',
    
      actionToggle:false,
      createToggle:true,
      darken:false,

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
        { key: "status", title: "Статус" },
        {key:"date_created", title:"Дата создания"},
        { key: "all_comments", title: "Комметарий" },
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
  <div class="users mx-auto border-black mt-5">
    <div class="buttons">
        <div class="createBut">
            <button class="bg-blue-300 p-4 m-2 rounded-lg" @click="createToggle = !createToggle">Создать</button>
        </div>
    </div>
    <div v-if="createToggle" class="createDiv">
        CreateToggle
    </div>
    <div v-if="darken" class="darken">

    </div>
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
          <v-btn @click="toggleDiv(item)">
            <!-- Add your click handler -->
            {{ item.action.innerHTML }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <div v-if="actionToggle" class="actionHiddenDiv">
      slkadjaksjdasj;dlas
    </div>
  </div>
</template>


<style lang="scss" scoped>
  $adminMargin:2rem;
  .darken{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.58);
  }
  .createDiv{
    position: absolute;
    top: 20%;
    left:  30% ;
    width: 50%;
    height: 50%;
    z-index: 1000;
    background-color: aqua;
  }
</style>

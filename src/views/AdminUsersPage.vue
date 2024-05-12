<script>
import axios from "axios";
import { fetchUsers, patchToBlackList, postUser, putUser, removeUser } from "../utils/adminUsers";
export default {
  name: "users-page",
  data() {
    return {
      users: [],
      search: "",

      actionToggle: false,
      createToggle: false,
      darken: false,

      userForm: {
        name: "",
        surname: "",
        // iin: "",
        phone: "",
        status: "",
        all_comments: "",
        blaclist: false,
      },

      headers: [
        {
          align: "center",
          key: "name",
          sortable: false,
          title: "Имя",
        },
        { key: "surname", title: "Фамилия", align: "center", },
        // { key: "iin", title: "ИИН" },
        { key: "number", title: "Номер телефона", align: "center", },
        { key: "status", title: "Статус", align: "center", },
        { key: "date_created", title: "Дата создания", align: "center", },
        { key: "all_comments", title: "Комментарий", align: "center", },
        { key: "blacklist", title: "Черный список", align: "center", },
        { key: "action", title: "Действия", align: "center", },
      ],
      desserts: [],
    };
  },
  methods: {
    async createUser() {
      try {
        await postUser(this.userForm);
        this.userForm = {
          name: "",
          surname: "",
          // iin: "",
          phone: "",
          status: "",
        };
        this.crToggle();
        this.getUsers();
      } catch (err) {
        console.log(err);
      }
    },
    async getUsers() {

      try {

        const resultObject = await fetchUsers();

        // console.log(resultObject);

        this.desserts = resultObject;
        // this.desserts = result.data.items.map((e) => {
        //   const ratingBut = document.createElement("button");
        //   ratingBut.innerHTML = "Изменить";
        //   e.action = ratingBut;
        //   return e;
        // });
      } catch (err) {
        console.log(err);
      }

    },
    toggleDiv(item) {
      this.darken = !this.darken;
      this.actionToggle = !this.actionToggle;
      if (item === 0) {
        this.userForm = {
          name: "",
          surname: "",
          // iin: "",
          phone: "",
          status: "",
          all_comments: "",
        };
        return;
      }
      this.userForm = {
        name: item.name,
        surname: item.surname,
        // iin: item.iin,
        status: item.status,
        phone: item.number,

      }
      this.userForm.all_comments = item.all_comments;
      this.userForm.id = item.id;
      console.log(this.userForm)
    },
    crToggle() {
      this.darken = !this.darken;
      this.createToggle = !this.createToggle;
    },

    async updateUser(id) {
      try {

        await putUser(id);
        await this.getUsers();

        // Find the index of the element to be updated in desserts array
        // const indexToUpdate = this.desserts.findIndex(e => e.id === id);

        // if (indexToUpdate !== -1) {
        //   // Update the existing element with the new data
        //   this.desserts[indexToUpdate] = {
        //     id: this.userForm.id,
        //     name: this.userForm.name,
        //     surname: this.userForm.surname,
        //     // iin: this.userForm.iin,
        //     number: this.userForm.phone,
        //     status: this.userForm.status,
        //     date_created: this.desserts[indexToUpdate].date_created,
        //     all_comments: this.userForm.all_comments,
        //     // Assuming other properties are present in your data
        //   };

        // Clear userForm after successful update
        // this.userForm = {
        //     name: "",
        //     surname: "",
        //     iin: "",
        //     phone: "",
        //     status: "",
        // };

        // Close the update form
        // this.actionToggle(0);

      } catch (err) {
        console.log(err);
      }
    },
    async addToBlackList(id,value){
      let newVal = value === 1 ? 0 :1;
      await patchToBlackList(id,newVal);
    },
    async deleteUser(id) {
      try {
        await removeUser(id);
        await this.getUsers();
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<template>
  <div class="users mx-auto border-black mt-5">
    <div class="buttons">
      <div class="createBut">
        <button class="bg-blue-300 p-4 m-2 rounded-lg" @click="crToggle()">
          Создать
        </button>
      </div>
    </div>
    <div v-if="createToggle" class="createDiv">
      <div class="createHeader">
        <div class="createClose float-right p-3 bg-blue-400">
          <button @click="crToggle()">Закрыть</button>
        </div>
        <div class="title text-center p-2">Добавить пользователя</div>
      </div>
      <div class="createBody">
        <div class="createForm mt-2">
          <div class="nameInput">
            <label for="name">Имя</label>
            <input type="text" name="name" id="" v-model="userForm.name" />
          </div>
          <div class="nameInput">
            <label for="name">Фамилия</label>
            <input type="text" name="surname" id="" v-model="userForm.surname" />
          </div>
          <!-- <div class="nameInput">
            <label for="name">ИИН</label>
            <input type="text" name="iin" id="" v-model="userForm.iin" />
          </div> -->
          <div class="nameInput">
            <label for="name">Номер телефона</label>
            <input type="text" name="phone" id="" v-model="userForm.phone" />
          </div>
          <div class="nameInput">
            <label for="name">Статус</label>
            <input type="text" name="status" id="" v-model="userForm.status" />
          </div>
          <div class="nameInput flex justify-center">
            <button @click="createUser()" class="text-center bg-slate-500 rounded-lg p-4 text-white">
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="darken" class="darken"></div>
    <h1 class="text-center text-2xl font-bold my-3">База клиентов</h1>
    <v-card flat title="">
      <template v-slot:text>
        <v-text-field v-model="search" label="Искать" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
          hide-details></v-text-field>
      </template>

      <v-data-table :headers="headers" :items="desserts" :search="search">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.surname }}</td>
            <td>{{ item.number }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.date_created}}</td>
            <td>{{ item.all_comments }}</td>
            <!-- Other table columns -->
            <td>
              <input type="checkbox" :checked="item.blacklist === 1" @change="addToBlackList(item.id,item.blacklist)">
            </td>
            <td>
              <v-btn @click="toggleDiv(item)">Изменить</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <div v-if="actionToggle" class="actionHiddenDiv">
      <div class="actionHeader">
        <div class="actionClose float-right p-3 bg-blue-400">
          <button @click="toggleDiv(0)">Закрыть</button>
        </div>
        <div class="title text-center p-2">Изменить пользователя</div>
      </div>
      <div class="createBody">
        <div class="createForm mt-2">
          <div class="nameInput">
            <label for="name">Имя</label>
            <input type="text" name="name" id="" v-model="userForm.name" />
          </div>
          <div class="nameInput">
            <label for="name">Фамилия</label>
            <input type="text" name="surname" id="" v-model="userForm.surname" />
          </div>
          <!-- <div class="nameInput">
          <label for="name">ИИН</label>
          <input type="text" name="iin" id="" v-model="userForm.iin" />
        </div> -->
          <div class="nameInput">
            <label for="name">Номер телефона</label>
            <input type="text" name="phone" id="" v-model="userForm.phone" />
          </div>
          <div class="nameInput">
            <label for="name">Статус</label>
            <input type="text" name="status" id="" v-model="userForm.status" />
          </div>
          <div class="nameInput">
            <label for="name">Комментарий</label>
            <input type="text" name="status" id="" v-model="userForm.all_comments" />
          </div>
          <div class="nameInput text-center">
            <button @click="updateUser(userForm.id)" class="text-center bg-green-600 rounded-lg p-4 text-white">
              Изменить
            </button>
            <button @click="deleteUser(userForm.id)" class="text-center bg-red-600 rounded-lg p-4 text-white">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
$adminMargin: 2rem;

.actionHiddenDiv {
  .actionHeader {}
}
tr,td{
  text-align: center;
}

.darken {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.58);
}

.createDiv {
  position: absolute;
  border: 1px solid black;
  top: 5%;
  left: 30%;
  width: 60%;
  height: fit-content;
  z-index: 1000;
  background-color: rgb(255, 255, 255);
}

.createForm {
  .nameInput {
    padding: 1rem;

    input[type="text"] {
      width: 100%;
      height: 3rem;
      margin: 0rem 0 0rem 0;
      padding: 0 1rem 0 1rem;
      border: 1px solid black;
    }
  }
}

.actionHiddenDiv {
  position: absolute;
  border: 1px solid black;
  top: 0%;
  left: 30%;
  width: 60%;
  height: fit-content;
  z-index: 1000;
  background-color: rgb(255, 255, 255);
}
</style>

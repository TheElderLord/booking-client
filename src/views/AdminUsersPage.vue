<script>
import axios from "axios";
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
            },

            headers: [
                {
                    align: "start",
                    key: "name",
                    sortable: false,
                    title: "Имя",
                },
                { key: "surname", title: "Фамилия" },
                // { key: "iin", title: "ИИН" },
                { key: "number", title: "Номер телефона" },
                { key: "status", title: "Статус" },
                { key: "date_created", title: "Дата создания" },
                { key: "all_comments", title: "Комментарий" },
                { key: "action", title: "Действия" },
            ],
            desserts: [],
        };
    },
    methods: {
        async createUser() {
            try {
                const result = await axios.post(
                    `http://localhost:3000/api/v1/admin/users`,
                    this.userForm
                );
                const des = this.userForm;
                const ratingBut = document.createElement("button");
                ratingBut.innerHTML = "Изменить";
                des.action = ratingBut;

                this.desserts.push(des);
                this.userForm = {
                    name: "",
                    surname: "",
                    // iin: "",
                    phone: "",
                    status: "",
                };
                this.crToggle();
            } catch (err) {
                console.log(err);
            }
        },
        async getUsers() {

            try {
                const result = await axios.get("http://localhost:3000/api/v1/admin/users");
                const resultObject = result.data.items;

                console.log(resultObject);

                this.desserts = resultObject;
                this.desserts = result.data.items.map((e) => {
                    const ratingBut = document.createElement("button");
                    ratingBut.innerHTML = "Изменить";
                    e.action = ratingBut;
                    return e;
                });
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
                    all_comments:"",
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

                const result = await axios.put(
                    `http://localhost:3000/api/v1/admin/users/${id}`,
                    this.userForm
                );

                // Find the index of the element to be updated in desserts array
                const indexToUpdate = this.desserts.findIndex(e => e.id === id);

                if (indexToUpdate !== -1) {
                    // Update the existing element with the new data
                    this.desserts[indexToUpdate] = {
                        id: this.userForm.id,
                        name: this.userForm.name,
                        surname: this.userForm.surname,
                        // iin: this.userForm.iin,
                        number: this.userForm.phone,
                        status: this.userForm.status,
                        date_created: this.desserts[indexToUpdate].date_created,
                        all_comments: this.userForm.all_comments,
                        // Assuming other properties are present in your data
                    };

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
                } else {
                    console.error("User not found in desserts array");
                }
            } catch (err) {
                console.log(err);
            }
        },
        async deleteUser(id) {
            try {
                const result = await axios.delete(
                    `http://localhost:3000/api/v1/admin/users/${id}`
                );
                if (result.status === 200) {
                    // If the deletion is successful, remove the user from the desserts array
                    this.desserts = this.desserts.filter(user => user.id !== id);
                    this.toggleDiv(0);
                }
                
            
    

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
            <input
              type="text"
              name="surname"
              id=""
              v-model="userForm.surname"
            />
          </div>
          <!-- <div class="nameInput">
            <label for="name">ИИН</label>
            <input type="text" name="iin" id="" v-model="userForm.iin" />
          </div> -->
          <div class="nameInput">
            <label for="name">Номер телефона</label>
            <input
              type="text"
              name="phone"
              id=""
              v-model="userForm.phone"
            />
          </div>
          <div class="nameInput">
            <label for="name">Статус</label>
            <input type="text" name="status" id="" v-model="userForm.status" />
          </div>
          <div class="nameInput flex justify-center">
            <button
              @click="createUser()"
              class="text-center bg-slate-500 rounded-lg p-4 text-white"
            >
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

    <div 
      v-if="actionToggle"
     class="actionHiddenDiv">
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
          <input
            type="text"
            name="surname"
            id=""
            v-model="userForm.surname"
          />
        </div>
        <!-- <div class="nameInput">
          <label for="name">ИИН</label>
          <input type="text" name="iin" id="" v-model="userForm.iin" />
        </div> -->
        <div class="nameInput">
          <label for="name">Номер телефона</label>
          <input
            type="text"
            name="phone"
            id=""
            v-model="userForm.phone"
          />
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
          <button
            @click="updateUser(userForm.id)"
            class="text-center bg-green-600 rounded-lg p-4 text-white"
          >
            Изменить
          </button>
          <button
            @click="deleteUser(userForm.id)"
            class="text-center bg-red-600 rounded-lg p-4 text-white"
          >
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
.actionHiddenDiv{
  .actionHeader{

  }
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
.actionHiddenDiv{
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

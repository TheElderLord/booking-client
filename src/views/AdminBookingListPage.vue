<script>
import axios from "axios";
import {computed} from "vue";
import {
  fetchBookHistory,
  setGivenPrice,
  setPaid,
} from "../utils/adminRoomsHistory";
import { deleteRecord } from "../utils/adminRoomsHistory";

export default {
  data() {
    return {
      list: [],
      search: "",
      headers: [
        {
          align: "center",
          key: "firstname",
          sortable: false,
          title: "Имя",
        },
        { key: "lastname", title: "Фамилия", align: "center" },
        // { key: "iin", title: "ИИН" },
        { key: "startDate", title: "Начало брони", align: "center" },
        { key: "endDate", title: "Конец брони", align: "center" },
        { key: "short_name", title: "Короткое название", align: "center" },
        { key: "created_at", title: "Дата создания", align: "center" },
        { key: "isPaid", title: "Оплачено", align: "center" },
        { key: "given", title: "Внесено", align: "center" },
        { key: "action", title: "Действия", align: "center" },
      ],
      desserts: [],
    };
  },
  computed: {
    formattedDessertsComputed() {
      return computed(() => {
        return this.desserts
          .map((ticket) => {
            return {
              ...ticket,
              startDate: new Date(ticket.startDate),
              endDate: new Date(ticket.endDate),
              created_at: new Date(ticket.created_at) 
            
            };
          })
          
      });
    },
  },
  methods: {
    async fetchData(queryParams = {}) {
      try {
        const result = await fetchBookHistory(queryParams);
        // this.list = result;
        this.desserts = result;
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteItem(id) {
      try {
        await deleteRecord(id);
        this.fetchData();
      } catch (err) {
        console.log(err);
      }
    },
    async setGiven(id, amount) {
      try {
        await setGivenPrice(id, amount);
      } catch (err) {
        console.log(err);
      }
    },
    async togglePaid(id, isPaid) {
      try {
        await setPaid(id, isPaid);
      } catch (err) {
        console.log(err);
      }
    },
    // async downloadExcel() {
    //     try {
    //         const response = await axios.get('http://localhost:3000/api/v1/roomList/download', { responseType: 'blob' });
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'generated_data.xlsx');
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } catch (error) {
    //         console.error('Error downloading Excel:', error);
    //     }
    // }
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<template>
  <main>
    <div class="list-container">
      <div class="title text-center">
        <h2>Список</h2>
      </div>
      <div class="buttonBlock">
        <div class="controls">
          <button
            @click="fetchData()"
            type="button"
            class="btn btn-secondary text-white"
          >
            Все
          </button>
          <button
            @click="fetchData({ paid: true })"
            type="button"
            class="btn btn-success text-white"
          >
            Оплачен
          </button>
          <button
            @click="fetchData({ completed: false })"
            type="button"
            class="btn btn-success text-white"
          >
            Незавершенные
          </button>
          <!-- <button @click="downloadExcel" type="button" class="btn btn-info text-white">Excel</button> -->
        </div>
      </div>
      <div class="list-items">
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
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.firstname }}</td>
                <td>{{ item.lastname }}</td>
                <td>{{ item.startDate }}</td>
                <td>{{ item.endDate }}</td>
                <td>{{ item.short_name }}</td>
                <td>{{ item.created_at }}</td>
                <!-- Other table columns -->
                <td>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    :checked="item.isPaid === 1"
                    @change="togglePaid(item.id, item.isPaid)"
                  />
                </td>
                <td>
                  <form @submit.prevent="setGiven(item.id, item.given)">
                    <input
                      v-model="item.given"
                      class="text-center"
                      type="number"
                    />
                  </form>
                </td>
                <td>
                  <div @click="deleteItem(item.id)" class="room-control">
                    <button type="button" class="btn btn-danger text-white">
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- <div class="list-item">
                    <div class="user-name">Имя</div>
                    <div class="user-lastname">Фамилия</div>
                    <div class="user-name">Начало </div>
                    <div class="user-lastname">Конец</div>
                    <div class="room-title">Квартира</div>
                    <div class="room-paid">Оплачен</div>
                    <div class="room-paid">Внесено</div>
                    <div class="room-paid">Действия</div>
                    <div class="room-paid">Дата создания</div>
                </div>
                <div class="list-item shadow-xl" v-for="it in list" :key="it.id">
                    <div class="user-name">{{ it.firstname }}</div>
                    <div class="user-lastname">{{ it.lastname }}</div>
                    <div class="user-name">{{ it.startDate }}</div>
                    <div class="user-lastname">{{ it.endDate }}</div>
                    <div class="room-title">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled"
                            style="height: 100px" disabled v-model="it.title"></textarea>
                    </div>
                    <div class="room-paid">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                            :checked="it.isPaid === 1" @change="togglePaid(it.id, it.isPaid)" />
                    </div>
                    <div class="room-paid">
                        <form @submit.prevent="setGiven(it.id, it.given)">
                            <input v-model="it.given" class="text-center" type="number" />
                        </form>
                    </div>
                    <div @click="deleteItem(it.id)" class="room-control">
                        <button type="button" class="btn btn-danger text-white">Удалить</button>
                    </div>
                    <div class="user-date">{{ it.created_at }}</div>
                </div> -->
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
tr,
td {
  text-align: center;
}
.list-container {
  margin: 1rem;

  .buttonBlock {
    .controls {
      button {
        margin: 0.5rem;
      }
    }
  }

  .list-items {
    margin-top: 1rem;

    .list-item {
      margin: 1rem auto;
      display: flex;
      justify-content: space-around;
      border: 1px solid black;
      border-radius: 1rem;

      div {
        padding: 1rem;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
../utils/adminRoomsHistory../utils/adminRoomsHistory

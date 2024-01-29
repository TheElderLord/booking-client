<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
export default {
  name: "rooms-page",
  components: {
    VueDatePicker,
  },
  data() {
    return {
      rooms: [],

      imageUrls: [],

      inputForm: {
        title: "",
        location: "",
        price: "",
        floor: "",
        complex: "",
        amount: "",
        square: "",
        kitchen_square: "",
        conditions: "",
        coordinates: "",
        people_num: "",
        bed_num: "",
        description: "",
      },
      createToggle: false,
    };
  },
  methods: {
    async getRooms() {
      const result = await axios.get("http://localhost:3000/api/v1/rooms");
      console.log(result.data);
      this.rooms = result.data.items;

      //   this.rooms.map((e) => {
      //     e.small_images = e.small_images.split(",");
      //     // console.log(e.images);
      //   });
    },
    async createRoom() {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append room details to FormData
    for (const key in this.inputForm) {
      if (Object.prototype.hasOwnProperty.call(this.inputForm, key)) {
        formData.append(key, this.inputForm[key]);
      }
    }
    // Append other room details in a similar manner

    // Append images to FormData
    for (let i = 0; i < this.imageUrls.length; i++) {
      const dataURL = this.imageUrls[i];
      const blob = await fetch(dataURL).then((res) => res.blob());
      formData.append('images', blob, `image${i + 1}.png`);
    }

    // Make a POST request with FormData
    const result = await axios.post("http://localhost:3000/api/v1/rooms", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Add the created room to the local array
    this.inputForm.id = Math.random(0,100);
    this.rooms.push(this.inputForm);

    // Reset form and imageUrls
    this.inputForm = {
      title: "",
      location: "",
      price: "",
      floor: "",
      complex: "",
      amount: "",
      square: "",
      kitchen_square: "",
      conditions: "",
      coordinates: "",
      people_num: "",
      bed_num: "",
      description: "",
    };
    this.imageUrls = [];

    console.log(result);
  } catch (error) {
    console.error(error);
  }
},
    async deleteRoom(id) {
      try {
        const result = await axios.delete(
          `http://localhost:3000/api/v1/rooms/${id}`
        );
        const room = this.rooms.findIndex((e) => e.id == id);
        this.rooms.splice(room, 1);
        // console.log(result)
      } catch (err) {
        console.log(err);
      }
    },
    handleImageChange(event) {
      const input = event.target;
      const files = input.files;
      console.log("input",input);
      console.log("Files",files);

      if (files) {
        Array.from(files).forEach(file => {
          const reader = new FileReader();

          reader.onload = () => {
            this.imageUrls.push(reader.result);
          };

          reader.readAsDataURL(file);
        });
      }
    },
    deleteImage(index) {
      this.imageUrls.splice(index, 1);
    },
  },
  computed: {
    getStyle() {
      return (status) => {
        return {
          backgroundColor:
            status === 0 ? "rgb(170, 14, 14,0.7)" : "rgba(40, 190, 42,0.8)",
          // Add more styles as needed
        };
      };
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
        <button @click="createToggle = !createToggle">Создать</button>
      </div>
      <div class="block-title text-center font-bold py-3">Квартиры</div>
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

      <div
        v-for="room in rooms"
        :key="room.id"
        class="room flex border-2 rounded-lg m-2 p-4 border-black"
        :style="getStyle(room.status)"
      >
        <router-link
          class="flex w-4/5"
          :to="{ name: 'roomInfo', params: { id: room.id } }"
        >
          <div
            class="title text-center text-sm flex justify-center items-center basis-1/3"
          >
            <div class="text-center">{{ room.title }}</div>
          </div>
          <div
            class="location text-center text-sm flex justify-center items-center basis-1/3"
          >
            <div class="text-center">{{ room.location }}</div>
          </div>
          <div
            class="status text-center text-sm flex justify-center items-center basis-1/3"
          >
            <div class="text-center">
              {{ room.status === "free" ? "Свободен" : "Забронирован" }}
            </div>
          </div>
        </router-link>
        <div class="text-center del flex justify-center items-center w-1/5">
          <button @click.stop="deleteRoom(room.id)" class="text-center">
            Удалить
          </button>
        </div>
      </div>

      <div v-if="createToggle" class="createDiv">
        <div class="close">
          <button @click.stop="createToggle = !createToggle">Закрыть</button>
        </div>
        <div class="title text-center">Создание новой квартиры</div>
        <div class="create grid grid-cols-2 gap-1">
          <!-- title, location, price, floor, complex, amount, square,
                kitchen_square, conditions, coordinates, people_num, bed_num,
                description -->
          <div class="image">
            <input id="images"
              type="file"
              @change="handleImageChange"
              accept="image/*"
              multiple
            />
            <div v-if="imageUrls.length > 0" class="image-previews">
              <div
                v-for="(imageUrl, index) in imageUrls"
                :key="index"
                class="image-preview-container"
              >
                <img
                  :src="imageUrl"
                  alt="Image Preview"
                  class="image-preview"
                />
                <button @click="deleteImage(index)" class="delete-button">
                  Удалить
                </button>
              </div>
            </div>
          </div>
          <div class="formInputs">
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.title"
                name=""
                id=""
                placeholder="Введите заголовок"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.location"
                name=""
                id=""
                placeholder="Введите адрес"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.price"
                name=""
                id=""
                placeholder="Введите цену"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.floor"
                name=""
                id=""
                placeholder="Введите этаж"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.complex"
                name=""
                id=""
                placeholder="Введите название ЖК"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.amount"
                name=""
                id=""
                placeholder="Введите число комнат"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.square"
                name=""
                id=""
                placeholder="Введите общую площадь"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.kitchen_square"
                name=""
                id=""
                placeholder="Введите площадь кухни"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.conditions"
                name=""
                id=""
                placeholder="Введите условия"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.people_num"
                name=""
                id=""
                placeholder="Введите число людей"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.bed_num"
                name=""
                id=""
                placeholder="Введите число кроватей"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                v-model="inputForm.description"
                name=""
                id=""
                placeholder="Введите описание"
              />
            </div>
            <div class="create text-center">
              <button
                class="py-2 px-4 bg-blue-300 m-3 rounded-lg"
                @click="createRoom()"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="createToggle" class="dark"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cont {
  width: 100%;
  height: 100%;
  background-color: white;
}

.createDiv {
  position: absolute;
  z-index: 999;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: var(--secondary-color);

  .close {
    button {
      padding: 1rem 2rem 1rem 2rem;
      background-color: var(--primary-color);
      border-radius: 1rem;
      float: right;
    }
  }

  .title {
    padding: 1rem;
  }
  .image-previews {
    display: flex;
    flex-wrap: wrap;
  }
  
  .image-preview-container {
    position: relative;
    margin: 1px;
  }
  
  .image-preview {
    max-width: 100%;
    max-height: 150px;
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

  .create {
    input[type="file"] {
    }

    input[type="text"] {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid black;
    }
  }
}

.dark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.64);
  z-index: 99;
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
</style>

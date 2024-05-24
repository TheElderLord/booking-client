<script>
import { postRoom } from "../utils/adminRooms";
import DG from '2gis-maps';
export default {
  data() {
    return {
      imageUrls: [],
      coords:[],
      map:null,
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
        coordinates:"",
        short_name:"",
      },
    };
  },
  methods: {
    handleImageChange(event) {
      const input = event.target;
      const files = input.files;
      console.log("input", input);
      console.log("Files", files);

      if (files) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();

          reader.onload = () => {
            this.imageUrls.push(reader.result);
          };

          reader.readAsDataURL(file);
        });
      }
    },
    async initMap(){
        DG.then(() => {
        this.map = DG.map('map', {
        center: [43.238366, 76.924189],
        zoom: 13
      });
      
      
      this.map.on('click', (e) => {
        
        const latLng = e.latlng;
        const newCoords = [latLng.lat, latLng.lng];

        this.coords.forEach(marker => {
        this.map.removeLayer(marker);
          });   
        
        const newMarker = DG.marker(newCoords).addTo(this.map).bindPopup('Вы кликнули по мне!');
      
        // DG.marker([this.coords]).addTo(this.map).bindPopup('Вы кликнули по мне!');
       
        this.coords.push(newMarker);
        this.inputForm.coordinates = `${this.coords[this.coords.length-1].getLatLng().lat},${this.coords[this.coords.length-1].getLatLng().lng}`;
        console.log(this.inputForm.coordinates);
        // console.log(this.coords[this.coords.length-1].getLatLng().lat);
        // console.log(this.coords[this.coords.length-1].getLatLng().lng);
      });
    });
    },
    // async addMarker() {
    //   const marker = {
    //     lat: this.coords[this.coords.length-1].getLatLng().lat,
    //     lng: this.coords[this.coords.length-1].getLatLng().lng,
    //     name: this.name,
    //     surname: this.surname,
    //     email: this.email,
    //     num: this.num,
    //     user_id: 1,
    //     location_name: this.location,
    //     status:"Todo",
    //     description: this.description,
    //     subcategory_id: this.data[0].id,
    //     answers: this.answers.toString()
    //   };
    //   console.log(marker);
      
    //   // await axios.post('http://localhost:3000/create', marker);
    //   await postRoom(marker)
    //   this.coords = [];
    //     this.name = '';
    //     this.surname = '';
    //     this.email = '';
    //     this.num = '';
    //     this.description = '';
    //     this.location = '';
    //     this.coords.forEach(marker => {
    //     this.map.removeLayer(marker);
    //  });
    // },
    deleteImage(index) {
      this.imageUrls.splice(index, 1);
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
          formData.append("images", blob, `image${i + 1}.png`);
        }

        // Make a POST request with FormData
        const result = await postRoom(formData);

        // if (result === true) {
        //   await this.getRooms();
        // }

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
          short_name:"",
        };
        this.imageUrls = [];

        // console.log(result);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted(){
    this.initMap()
  }
};
</script>
<template>
  <div class="createDiv">
    <div class="close">
      <button @click="$router.go(-1)">
        <span style="font-size: 24px">&#8592;</span>
      </button>
    </div>
    <div class="title text-center"> <h3>Создание новой квартиры</h3></div>
    <div class="create grid grid-cols-2 gap-1">
      <!-- title, location, price, floor, complex, amount, square,
                kitchen_square, conditions, coordinates, people_num, bed_num,
                description -->
      <div class="image">
        <input
          id="images"
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
            <img :src="imageUrl" alt="Image Preview" class="image-preview" />
            <button @click="deleteImage(index)" class="delete-button">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <div class="formInputs">
       
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.title" class="form-control" placeholder="Введите заголовок" id="title"></textarea>
            <label for="title">Введите заголовок</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.location" class="form-control" placeholder="Введите адрес" id="location"></textarea>
            <label for="location">Введите адрес</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.price" class="form-control" placeholder="Введите цену" id="price"></textarea>
            <label for="price">Введите цену</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.floor" class="form-control" placeholder="Введите этаж" id="floor"></textarea>
            <label for="floor">Введите этаж</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.complex" class="form-control" placeholder="Введите название ЖК" id="complex"></textarea>
            <label for="complex">Введите название ЖК</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.amount" class="form-control" placeholder="Введите число комнат" id="amount"></textarea>
            <label for="amount">Введите число комнат</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.square" class="form-control" placeholder="Введите общую площадь" id="square"></textarea>
            <label for="square">Введите общую площадь</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.kitchen_square" class="form-control" placeholder="Введите площадь кухни" id="kitchen_square"></textarea>
            <label for="kitchen_square">Введите площадь кухни</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.conditions" class="form-control" placeholder="Введите условия" id="conditions"></textarea>
            <label for="conditions">Введите условия</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.people_num" class="form-control" placeholder="Введите число людей" id="people_num"></textarea>
            <label for="people_num">Введите число людей</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.bed_num" class="form-control" placeholder="Введите число кроватей" id="bed_num"></textarea>
            <label for="bed_num">Введите число кроватей</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.description" class="form-control" placeholder="Введите описание" id="description"></textarea>
            <label for="description">Введите описание</label>
          </div>
          <div class="form-floating mb-3">
            <textarea v-model="inputForm.short_name" class="form-control" placeholder="Введите описание" id="description"></textarea>
            <label for="description">Введите короткое название</label>
          </div>
          <!-- <div class="create text-center">
            <button class="btn btn-primary btn-lg" @click="createRoom()">Создать</button>
          </div> -->
       
      </div>
      
    </div>
    <div class="mapDiv">
        <div id="map"></div>
    </div>
    

    <div class="create text-center flex justify-center">
        <button
          class="py-2 px-4 bg-blue-300 m-3 rounded-lg"
          @click="createRoom()"
        >
          Создать
        </button>
      </div>
  </div>
</template>
<style lang="scss">
.mapDiv{
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 80%;
    height: 30vh;
    #map {
        height: 100%;
        width: 100%;
      }
}

.formInputs{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}
.form-floating{
    width: 50%;
}
.createDiv {
  .close {
    button {
      padding: .5rem 1.5rem;
      background-color: var(--primary-color);
      border-radius: 1rem;
      
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

.controls {
  button {
    margin: 1rem;
  }
}
</style>

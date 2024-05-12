<script>
import {postRoom } from '../utils/adminRooms';
export default {
    data() {
        return {
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
        }
    },
    methods: {
        handleImageChange(event) {
            const input = event.target;
            const files = input.files;
            console.log("input", input);
            console.log("Files", files);

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
                const result = await postRoom(formData);

                if (result === true) {
                    await this.getRooms();
                }

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

                // console.log(result);
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>
<template>
    <div class="createDiv">
        <div class="close">
            <button @click="$router.go(-1)"><span style="font-size:36px">&#8592;</span></button>
        </div>
        <div class="title text-center">Создание новой квартиры</div>
        <div class="create grid grid-cols-2 gap-1">
            <!-- title, location, price, floor, complex, amount, square,
                kitchen_square, conditions, coordinates, people_num, bed_num,
                description -->
            <div class="image">
                <input id="images" type="file" @change="handleImageChange" accept="image/*" multiple />
                <div v-if="imageUrls.length > 0" class="image-previews">
                    <div v-for="(imageUrl, index) in imageUrls" :key="index" class="image-preview-container">
                        <img :src="imageUrl" alt="Image Preview" class="image-preview" />
                        <button @click="deleteImage(index)" class="delete-button">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
            <div class="formInputs">
                <div class="w-full">
                    <input type="text" v-model="inputForm.title" name="" id="" placeholder="Введите заголовок" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.location" name="" id="" placeholder="Введите адрес" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.price" name="" id="" placeholder="Введите цену" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.floor" name="" id="" placeholder="Введите этаж" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.complex" name="" id="" placeholder="Введите название ЖК" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.amount" name="" id="" placeholder="Введите число комнат" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.square" name="" id="" placeholder="Введите общую площадь" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.kitchen_square" name="" id=""
                        placeholder="Введите площадь кухни" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.conditions" name="" id="" placeholder="Введите условия" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.people_num" name="" id="" placeholder="Введите число людей" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.bed_num" name="" id="" placeholder="Введите число кроватей" />
                </div>
                <div class="w-full">
                    <input type="text" v-model="inputForm.description" name="" id="" placeholder="Введите описание" />
                </div>
                <div class="create text-center">
                    <button class="py-2 px-4 bg-blue-300 m-3 rounded-lg" @click="createRoom()">
                        Создать
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.createDiv {
    
   
  
    .close {
      button {
        padding: 1rem 2rem 1rem 2rem;
        background-color: var(--primary-color);
        border-radius: 1rem;
        float: left;
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
      input[type="file"] {}
  
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
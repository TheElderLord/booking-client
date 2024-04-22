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
      const result = await axios.get("http://localhost:3000/api/v1/admin/rooms");
      console.log(result.data);
      this.rooms = result.data.items;

      //   this.rooms.map((e) => {
      //     e.small_images = e.small_images.split(",");
      //     // console.log(e.images);
      //   });
    },

    //To-do filter
    // async getFree(){
    //   const result = await axios.get("http://localhost:3000/api/v1/rooms?free=true");
    //   console.log(result.data);
    //   this.rooms = result.data.items;
    // },
    // async getNotFree(){
    //   const result = await axios.get("http://localhost:3000/api/v1/rooms?free=false");
    //   console.log(result.data);
    //   this.rooms = result.data.items;
    // },
  
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
        const result = await axios.post("http://localhost:3000/api/v1/admin/rooms", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Add the created room to the local array
        this.inputForm.id = Math.random(0, 100);
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
          `http://localhost:3000/api/v1/admin/rooms/${id}`
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
  },
  computed: {
    // getStyle() {
    //   return (status) => {
    //     return {
    //       backgroundColor:
    //         status === 0 ? "rgb(170, 14, 14,0.7)" : "rgba(40, 190, 42,0.8)",
    //       // Add more styles as needed
    //     };
    //   };
    // },
  },
  mounted() {
    this.getRooms();
  },
};
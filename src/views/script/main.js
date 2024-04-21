
import { ref } from "vue";
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
    name: "Main",
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        VueDatePicker,
    },
    data() {
        return {
            text: "Enter your name",
            rooms: [],
            filter: {
                price: {
                    min: null,
                    max: null,
                },
                free:null,

                amountFilter: "0",
                square: {
                    min: null,
                    max: null,
                },
                dateFilter: null,
            },
            search: "",


            items: [],

            date: null,
        };
    },
    methods: {
        async getRooms() {
            this.filter = {
                price: {
                    min: null,
                    max: null,
                },

                amountFilter: null,
                square: {
                    min: null,
                    max: null,
                },
                dateFilter: null,
            };
            const result = await axios.get("http://localhost:3000/api/v1/rooms");

            this.rooms = result.data.items;
            console.log(this.rooms);
            this.rooms.map((e) => {
                e.small_images = e.small_images.split(",");
                e.images = e.images.split(",");

                // console.log(e.images);
            });
        },
        async filterData() {
            // Build the URL with only the parameters that are not null and exist
            let url = "http://localhost:3000/api/v1/rooms?";

            if(this.filter.free){
                if(this.filter.free == 1){
                    url += `&free=1`;
                }
          
            }
            if (this.filter.amountFilter) {
                url += `&amount=${this.filter.amountFilter}`;
            }
        
            if (this.filter.square.min !== null) {
                url += `&squareMin=${this.filter.square.min}`;
            }
        
            if (this.filter.square.max !== null) {
                url += `&squareMax=${this.filter.square.max}`;
            }
        
            if (this.filter.dateFilter) {
                url += `&bookdate=${this.filter.dateFilter}`;
            }
        
            if (this.filter.price.min !== null) {
                url += `&priceMin=${this.filter.price.min}`;
            }
        
            if (this.filter.price.max !== null) {
                url += `&priceMax=${this.filter.price.max}`;
            }
        
            console.log(url);
        
            // Make the API request with the dynamically constructed URL
            const result = await axios.get(url);
        
            this.rooms = result.data.items;
            console.log(this.rooms);
        
            // Split images
            this.rooms.map((e) => {
                e.small_images = e.small_images.split(",");
                e.images = e.images.split(",");
            });
        },
        handleDate([startDate, endDate]) {
            const options = { year: "numeric", month: "2-digit", day: "2-digit" };
            const first = new Date(startDate).toLocaleDateString(undefined, options);
            const second = new Date(endDate).toLocaleDateString(undefined, options);
            this.filter.dateFilter = first + '-'+ second;
            // console.log(first,second)

            // do something else with the data
        },
        async initDate() {
            const startDate = new Date();
            const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
            this.date = [startDate, endDate];
        },

    },
    mounted() {
        this.getRooms();
        this.initDate();
    },
};


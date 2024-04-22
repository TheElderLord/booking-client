import { ref } from "vue";
import axios from "axios";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useScreens } from "vue-screen-utils";

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
        free: null,

        amountFilter: "0",
        square: {
          min: null,
          max: null,
        },
        dateFilter: null,
      },
      search: "",

      date: null,

      toggle: "items",
    };
  },
  methods: {
    async getBookHistory(id) {
      const attributes = [];

      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/rooms/history/${id}`
        );
        const bookHistory = data.items;

        bookHistory.map((book) => {
          
          const startDateParts = book.startDate.split(".");
          const endDateParts = book.endDate.split(".");

          const startDay = Number(startDateParts[0]);
          const startMonth = Number(startDateParts[1]) - 1; // Months are zero-based
          const startYear = Number(startDateParts[2]);
          const startDate = new Date(startYear, startMonth, startDay);

          const endDay = Number(endDateParts[0]);
          const endMonth = Number(endDateParts[1]) - 1;
          const endYear = Number(endDateParts[2]);
          const endDate = new Date(endYear, endMonth, endDay);
          // console.log(book.status === 1)
          // console.log(book.status)
          // console.log(startDate,endDate)
          if(book.status===0){
            attributes.push({
              id: book.id,
              isBook: book.status,
              highlight: "red" ,
              dates: [[startDate, endDate]],
            });
          }
          
        });
        return attributes;
      } catch (error) {
        console.error("Error getting room info:", error);
      }
    },
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
      const result = await axios.get("http://localhost:3000/api/v1/rooms/list");

      this.rooms = result.data.items;
      console.log(this.rooms);
      this.rooms.map(async (e) => {
        e.small_images = e.small_images.split(",");
        // e.images = e.images.split(",");
        e.toggle = "info";
        e.attributes = await this.getBookHistory(e.id);
        // console.log(e.images);
      });
    },
    async filterData() {
      // Build the URL with only the parameters that are not null and exist
      let url = "http://localhost:3000/api/v1/rooms?";

      if (this.filter.free) {
        if (this.filter.free == 1) {
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
      this.filter.dateFilter = first + "-" + second;
      // console.log(first,second)

      // do something else with the data
    },
    async initDate() {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      this.date = [startDate, endDate];
    },
    goToDetailPage(id) {
      this.$router.push({ path: "/info", query: { id } });
    },
  },
  setup() {
    const { mapCurrent } = useScreens({
      xs: "0px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    });
    const columns = ref(mapCurrent({ lg: 2 }, 1));
    const expanded = ref(mapCurrent({ lg: true }, true));

    return { columns, expanded };
  },
  mounted() {
    this.getRooms();
    this.initDate();

    console.log(this.rooms);
    // this.getBookHistory();
  },
};

import "vue3-carousel/dist/carousel.css";
import axios from "axios";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  props: ["id"],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {},
  data() {
    return {
      info: "",
      formToggle: false,

      formObject: {
        name: "",
        lastname:"",
        iin: "",
        number: "",
      },
    };
  },
  methods: {
    async getInfo() {
      const data = await axios.get(
        `http://localhost:3000/api/v1/rooms/${this.id}`
      );
      this.info = data.data.items[0];
      this.info.images = this.info.images.split(",");
      this.info.small_images = this.info.small_images.split(",");
      // this.info.booked_date = this.info.booked_date.split("-");

      var map;

      DG.then(function () {
        map = DG.map("map", {
          center: [43.238366, 76.924189],
          zoom: 11,
        });

        let cord = data.data.items[0].coordinates.split(",");

        DG.marker(cord).addTo(map);
      });
    },
    async sendRequest() {
      try {
        console.log(this.formObject)
        const result = await axios.post(
          `http://localhost:3000/api/v1/requests`,
          this.formObject
        );
        (this.formObject = {
          name: "",
          iin: "",
          number: "",
          lastname:"",
        }),
          console.log(result);
      } catch (err) {
        console.log(err);
      }
      // alert(result)
    },
  },
  mounted() {
    this.getInfo();
  },
};
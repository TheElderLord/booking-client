import { mapActions } from "vuex";
export default {
  name: "Admin",

  data() {
    return {
      username: "",
      password: "",

      error: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async logIn() {
      // Simulate login logic (replace with your actual login logic)

      let loginSuccess;
      if (this.username == "admin" && this.password == "admin") {
        loginSuccess = true;
        localStorage.setItem("authToken",12313)
      } else {
        this.error = true;
        return;
      }

      // Dispatch the mutation to update the state
      await this.login();
      this.$router.push({ path: "/admin/rooms" });
    },
  },
};
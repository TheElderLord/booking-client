<script >
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
</script>

<template>
  <div class="main mx-auto flex justify-center">
    <div class="loginDiv w-2/6 h-fit mt-52 rounded-lg m-2 p-2">
      <div class="headerText text-center mt-5 text-xl">
        Введите данные для входа
      </div>
      <div class="form mt-8 p-4">
        <label for="login">Введите имя пользователя</label>
        <input
          v-model="username"
          type="text"
          name="login"
          required
        /><br /><br />
        <label for="login" class="">Введите пароль</label>
        <input v-model="password" type="password" name="password" required />

        <p v-if="error" class="error mt-2 text-center text-red-600 font-bold">
          Данные неверны
        </p>
      </div>
      <div class="submitBut">
        <button @click="logIn()" class="">Подтвердить</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@mixin input-shadow {
  border-top: 1px solid black;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.394);
  border-radius: 0.5rem;
}
.main {
  width: 100%;
  height: 100vh;
  background-color: var(--primary-color);
}
.loginDiv {
  background-color: var(--secondary-color);
  border: 2px black solid;
}

input[type="text"] {
  margin-top: 0.5rem;
  border-top: 1px solid black;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.394);
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
input[type="password"] {
  @include input-shadow;
  margin-top: 0.5rem;

  width: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
.submitBut {
  display: flex;
  justify-content: center;
  button {
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.394);
  }
}
</style>

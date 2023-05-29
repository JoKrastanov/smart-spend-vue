<template>
  <div
    class="absolute flex flex-col items-center justify-center top-1/2 translate-y-[-50%] left-0 right-0 mx-auto bg-secondary-color w-96 h-56 py-4 rounded-lg text-white"
  >
    <p>Email</p>
    <input v-model="emailInput" type="email" class="m-1" />
    <p>Password</p>
    <input v-model="passInput" type="password" class="m-1" />
    <p v-if="error" class="text-primary-color bg-[red]">
      {{ errorContents }}
    </p>
    <button
      class="px-1 py-0.5 rounded-sm text-secondary-color font-semibold bg-primary-color"
      @click="logIn"
    >
      Log In
    </button>
    <p>
      Don't have an account?
      <a
        @click="$emit('registerButtonClicked')"
        class="underline text-accent-color cursor-pointer"
        >Register here!</a
      >
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { login } from "../api/user";

export default {
  setup(props, { emit }) {
    const emailInput = ref("");
    const passInput = ref("");
    const error = ref(false);
    const errorContents = ref("");

    const clearInputs = () => {
      passInput.value = "";
    };

    const logIn = async () => {
      error.value = false;
      if (emailInput.value === "") {
        error.value = true;
        errorContents.value = "Please enter an email!";
        clearInputs();
        return;
      }
      if (passInput.value === "") {
        error.value = true;
        errorContents.value = "Please enter a password!";
        clearInputs();
        return;
      }
      const logInResponse = await login(emailInput.value, passInput.value);
      if (!logInResponse) {
        error.value = true;
        errorContents.value = "Incorrect email or password!";
        return;
      }
      localStorage.setItem("token", logInResponse["token"]);
      localStorage.setItem("refresh", logInResponse["refresh"]);
      localStorage.setItem("id", logInResponse["userId"]);
      emit("loginSuccessful");
    };
    return {
      error,
      errorContents,
      logIn,
      emailInput,
      passInput,
    };
  },
};
</script>

<style scoped>
input {
  margin: 0.25rem;
  color: #04080f;
}
</style>

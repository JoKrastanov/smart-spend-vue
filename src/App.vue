<template>
  <div>
    <NavBar :userLoggedIn="userLoggedIn" @logoutButtonClicked="logOutUser" />
    <LogInForm
      v-if="!userLoggedIn && currPage === 'login'"
      @registerButtonClicked="setPage('register')"
      @loginSuccessful="logInUser"
    />
    <RegisterForm
      v-else-if="!userLoggedIn && currPage === 'register'"
      @loginButtonClicked="setPage('login')"
    />
    <AppContent v-else />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import LogInForm from "./components/LogInForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import AppContent from "./components/AppContent.vue";
import { ref, onMounted } from "vue";

export default {
  components: {
    NavBar,
    LogInForm,
    RegisterForm,
    AppContent,
  },
  setup() {
    const currPage = ref("login");
    const userLoggedIn = ref(false);

    const setPage = (page) => {
      currPage.value = page;
    };

    const logInUser = () => {
      userLoggedIn.value = true;
      setPage("app");
    };

    const logOutUser = () => {
      userLoggedIn.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("id");
      setPage("login");
    };

    onMounted(() => {
      if (localStorage.getItem("id")) {
        userLoggedIn.value = true;
      }
      if (!localStorage.getItem("refresh")) {
        currPage.value = "login";
        return;
      }
      currPage.value = "app";
    });

    return {
      setPage,
      currPage,
      userLoggedIn,
      logInUser,
      logOutUser,
    };
  },
};
</script>

<style></style>

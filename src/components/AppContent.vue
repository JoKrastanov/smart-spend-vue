<template>
  <div>
    <div
      class="flex flex-col justify-center items-center mt-24 ml-10 bg-secondary-color rounded-lg text-primary-color w-72 h-72"
    >
      <LoadingSpinner v-if="userData === {}" />
      <div v-else>
        <p class="font-bold">User Details:</p>
        <p class="">First Name: {{ userData.firstName }}</p>
        <p class="">Last Name: {{ userData.lastName }}</p>
        <p class="">Address: {{ userData.address }}</p>
        <p class="">Email: {{ userData.email }}</p>
        <p class="">Department: {{ userData.department }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { getLoggedUserDetails } from "../api/user";

export default {
  components: {
    LoadingSpinner,
  },
  setup() {
    const userData = ref({});
    onMounted(async () => {
      userData.value = await getLoggedUserDetails(localStorage.getItem("id"));
    });

    return {
      userData,
    };
  },
};
</script>

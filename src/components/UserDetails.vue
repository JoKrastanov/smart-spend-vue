<template>
  <div
    class="flex flex-col justify-center items-center mt-24 ml-10 bg-secondary-color rounded-lg text-primary-color w-72 h-72"
  >
    <LoadingSpinner v-if="loading" />
    <div v-else>
      <p class="font-bold">User Details:</p>
      <p>First Name: {{ userData.firstName }}</p>
      <p>Last Name: {{ userData.lastName }}</p>
      <p>Address: {{ userData.address }}</p>
      <p>Email: {{ userData.email }}</p>
      <p>Department: {{ userData.department }}</p>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  components: {
    LoadingSpinner,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
      default: null,
    },
  },
  setup() {},
};
</script>

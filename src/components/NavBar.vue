<template>
  <div
    class="fixed top-0 flex items-center justify-between w-screen bg-secondary-color rounded-b-lg"
  >
    <div class="pl-4 py-2">
      <img class="rounded-full" :src="logo" />
    </div>
    <button
      class="bg-primary-color mr-4 p-2 rounded-sm text-secondary-color font-semibold border border-black"
      @click="$emit('logoutButtonClicked')"
      v-if="userLoggedIn"
    >
      Log Out
    </button>
  </div>
</template>

<script>
import logo from "../assets/Smart Spend Logo.svg";
export default {
  props: {
    userLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {
      logo,
    };
  },
};
</script>

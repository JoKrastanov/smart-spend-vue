<template>
  <div class="fixed h-screen w-24 bg-secondary-color rounded-r-lg">
    <img class="rounded-full" :src="logo"/>
  </div>
</template>

<script>
import logo from '../assets/Smart Spend Logo.svg';
export default {
  setup() {
    return {
      logo
    }
  },
};
</script>

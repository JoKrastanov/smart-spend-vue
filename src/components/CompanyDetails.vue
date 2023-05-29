<template>
  <div
    class="border border-black flex flex-col justify-center items-center mt-8 ml-10 bg-secondary-color rounded-lg text-primary-color w-72 h-72"
  >
    <LoadingSpinner v-if="loading" />
    <div class="flex flex-col justify-center" v-else>
      <p class="font-bold">Compay Details:</p>
      <p>Company: {{ companyData.name }}</p>
      <p>Address: {{ companyData.address }}</p>
      <br />
      <p>License Purchased:</p>
      <p>{{ licenseData.datePurchased }}</p>
      <br />
      <p>Last License Payment:</p>
      <p>{{ licenseData.lastPayment }}</p>
      <button
        class="self-center w-18 bg-primary-color px-2 py-1 mt-4 rounded-sm text-secondary-color font-semibold border border-black"
        @click="$emit('edit')"
      >
        Settings
      </button>
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
    companyData: {
      type: Object,
      required: true,
      default: null,
    },
    licenseData: {
      type: Object,
      required: true,
      default: null,
    },
  },
  setup() {},
};
</script>

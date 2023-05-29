<template>
  <div
    class="flex flex-col justify-center items-center mt-8 ml-10 bg-secondary-color rounded-lg text-primary-color w-72 h-72"
  >
    <LoadingSpinner v-if="loading" />
    <div v-else>
      <p class="font-bold">Compay Details:</p>
      <p>Company: {{ companyData.name }}</p>
      <p>Address: {{ companyData.address }}</p>
      <br />
      <p>License Purchased:</p>
      <p>{{ licenseData.datePurchased }}</p>
      <br />
      <p>Last License Payment:</p>
      <p>{{ licenseData.lastPayment }}</p>
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

<template>
  <div class="flex">
    <div>
      <UserDetails :userData="userData" />
      <CompanyDetails :companyData="companyData" :licenseData="licenseData" />
    </div>
    <div
      class="flex flex-col justify-center items-center mt-24 ml-10 mr-10 bg-secondary-color rounded-lg text-primary-color w-full h-144"
    >
      TESTING
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { convertUnixToDate } from "../helpers/convertUnixToDate";
import UserDetails from "./UserDetails.vue";
import CompanyDetails from "./CompanyDetails.vue";
import { getLoggedUserDetails } from "../api/user";
import { getCompanyDetails, getLicenseDetails } from "../api/company";

export default {
  components: {
    UserDetails,
    CompanyDetails,
  },
  setup(props, { emit }) {
    const userData = ref({});
    const companyData = ref({});
    const licenseData = ref({});
    onMounted(async () => {
      userData.value = await getLoggedUserDetails(localStorage.getItem("id"));
      if (!userData.value) {
        emit("sessionExpired");
      }
      companyData.value = await getCompanyDetails(userData.value.companyId);
      licenseData.value = await getLicenseDetails(userData.value.companyId);
      licenseData.value.datePurchased = convertUnixToDate(
        licenseData.value.datePurchased
      );
      licenseData.value.lastPayment = convertUnixToDate(
        licenseData.value.lastPayment
      );
    });

    return {
      userData,
      companyData,
      licenseData,
    };
  },
};
</script>

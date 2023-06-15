<template>
  <div class="flex">
    <div>
      <UserDetails :loading="userLoading" :userData="userData" />
      <CompanyDetails
        :loading="companyLoading"
        :companyData="companyData"
        :licenseData="licenseData"
        @edit="editingLicense = !editingLicense"
      />
    </div>
    <CompanySettings
      v-if="editingLicense"
      :license="licenseData"
      @registeredUser="licenseData.registeredEmployees++"
    />
    <BankDetails
      v-else
      :companyAccounts="companyAccounts"
      :loading="bankLoading"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { convertUnixToDate } from "../helpers/convertUnixToDate";
import UserDetails from "./UserDetails.vue";
import CompanyDetails from "./CompanyDetails.vue";
import BankDetails from "./BankDetails.vue";
import CompanySettings from "./CompanySettings";
import { getLoggedUserDetails } from "../api/user";
import { getCompanyDetails, getLicenseDetails } from "../api/company";
import { getComapnyBankAccounts } from "../api/bank";
export default {
  components: {
    UserDetails,
    CompanyDetails,
    BankDetails,
    CompanySettings,
  },
  setup(props, { emit }) {
    const userData = ref({});
    const companyData = ref({});
    const licenseData = ref({});
    const companyAccounts = ref({});
    const loading = ref(true);
    const userLoading = ref(true);
    const companyLoading = ref(true);
    const bankLoading = ref(true);
    const editingLicense = ref(false);
    onMounted(async () => {
      loading.value = true;
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
      companyAccounts.value = await getComapnyBankAccounts(
        userData.value.companyId
      );
      if (userData.value) {
        userLoading.value = false;
      }
      if (companyData.value) {
        companyLoading.value = false;
      }
      if (companyAccounts.value) {
        bankLoading.value = false;
      }
    });

    return {
      userData,
      companyData,
      licenseData,
      loading,
      companyAccounts,
      editingLicense,
      userLoading,
      companyLoading,
      bankLoading,
    };
  },
};
</script>

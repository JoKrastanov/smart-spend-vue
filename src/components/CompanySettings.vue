<template>
  <div
    class="border border-black relative flex justify-center items-center mt-24 ml-10 mr-10 bg-secondary-color rounded-lg text-primary-color w-full h-144 pt-10"
  >
    <div class="absolute top-10 left-10">
      <p class="font-bold">License Details:</p>
      <p>License Status: {{ licenseStatus }}</p>
      <p>
        Employee Limit: {{ license.registeredEmployees }} /
        {{ license.maxEmployeeNumber }}
      </p>
      <p>
        Bank Account Limit: {{ license.registeredBankAccounts }} /
        {{ license.maxBankAccountsNumber }}
      </p>
      <button
        class="mt-1 w-48 bg-primary-color p-1 rounded-sm text-secondary-color font-semibold border border-black"
        @click="addForm = 'employee'"
      >
        Add Employee
      </button>
      <br />
      <button
        class="mt-1 w-48 bg-primary-color p-1 rounded-sm text-secondary-color font-semibold border border-black"
        @click="addForm = 'bankAccount'"
      >
        Add Bank Account
      </button>
    </div>
    <div class="max-h-[30rem] overflow-y-auto">
      <AddBankAccountForm
        v-if="addForm === 'bankAccount'"
        class=""
      ></AddBankAccountForm>
      <AddEmployeeForm
        v-else-if="addForm === 'employee'"
        :companyId="license.companyId"
        @registeredUser="$emit('registeredUser')"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import AddEmployeeForm from "./AddEmployeeForm";
import AddBankAccountForm from "./AddBankAccountForm";
export default {
  components: {
    AddEmployeeForm,
    AddBankAccountForm,
  },
  props: {
    license: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const addForm = ref("");
    const licenseStatus = computed(() => {
      return props.license.active ? "Active" : "Inactive";
    });

    return {
      licenseStatus,
      addForm,
    };
  },
};
</script>

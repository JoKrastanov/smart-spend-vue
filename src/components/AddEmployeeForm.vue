<template>
  <div class="w-82 text-center">
    <div class="grid grid-cols-4 items-center text-left px-64">
      <label class="pl-4">First Name:</label>
      <input v-model="firstName" type="text" class="text-black my-1 mr-4 p-1" />

      <label class="pl-4">Last Name:</label>
      <input v-model="lastName" type="text" class="text-black my-1 mr-4 p-1" />

      <label class="pl-4">Address:</label>
      <input v-model="address" type="text" class="text-black my-1 mr-4 p-1" />

      <label class="pl-4">Phone:</label>
      <input v-model="phone" type="text" class="text-black my-1 mr-4 p-1" />

      <label class="pl-4">Country:</label>
      <CountryDropdown
        v-model="country"
        :style="'text-black my-1 mr-4'"
        @selected="selectCountry"
      />

      <label class="pl-4">Email:</label>
      <input v-model="email" type="email" class="text-black my-1 mr-4 p-1" />

      <label class="pl-4">Password:</label>
      <input
        v-model="password"
        type="password"
        class="text-black my-1 mr-4 p-1"
      />

      <label class="pl-4">Department:</label>
      <input
        v-model="department"
        type="text"
        class="text-black my-1 mr-4 p-1"
      />

      <label class="pl-4">Account Type:</label>
      <select v-model="accountType" class="text-black my-1 mr-4 p-1">
        <option>Select account type</option>
        <option value="ADMIN">Admin</option>
        <option value="MANAGER">Manager</option>
        <option value="USER">User</option>
      </select>
    </div>
    <button
      class="mt-2 w-48 bg-primary-color p-1 rounded-sm text-secondary-color font-semibold border border-black"
      @click="registerEmployee"
    >
      Create employee
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { registerUser } from "../api/company";
import CountryDropdown from "./CountryDropdown";
export default {
  props: {
    companyId: {
      type: String,
      required: true,
    },
  },
  components: {
    CountryDropdown,
  },
  setup(props, { emit }) {
    const firstName = ref("");
    const lastName = ref("");
    const address = ref("");
    const phone = ref("");
    const country = ref("");
    const email = ref("");
    const password = ref("");
    const department = ref("");
    const accountType = ref("");

    const registerEmployee = async () => {
      if (
        firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        phone.value === "" ||
        country.value === "" ||
        email.value === "" ||
        password.value === "" ||
        department.value === "" ||
        accountType.value === ""
      ) {
        return;
      }
      const userStatus = await registerUser(
        props.companyId,
        firstName.value,
        lastName.value,
        address.value,
        phone.value,
        country.value,
        email.value,
        password.value,
        department.value,
        accountType.value
      );
      if (!userStatus) {
        console.warn("Error creating user");
        return;
      }
      emit("registeredUser");
    };

    const selectCountry = (value) => {
      country.value = value;
    };

    return {
      firstName,
      lastName,
      address,
      phone,
      country,
      email,
      password,
      department,
      accountType,
      registerEmployee,
      selectCountry,
    };
  },
};
</script>

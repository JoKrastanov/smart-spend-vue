<template>
  <div
    class="flex flex-col items-center justify-center absolute top-1/2 translate-y-[-50%] py-10 left-0 right-0 mx-auto bg-secondary-color w-2/5 h-auto rounded-lg text-white"
  >
    <div class="grid grid-cols-2 items-center justify-center">
      <div>
        <p>First Name</p>
        <input type="text" />
      </div>
      <div>
        <p>Last Name</p>
        <input type="text" />
      </div>
      <div>
        <p>Email</p>
        <input type="text" />
      </div>
      <div>
        <p>Country</p>
        <CountryDropdown />
      </div>
      <div>
        <p>Password</p>
        <input type="password" />
      </div>
      <div>
        <p>Repeat Password</p>
        <input type="password" />
      </div>
    </div>
    <button
      class="px-1 py-0.5 rounded-sm text-secondary-color font-semibold bg-primary-color"
    >
      Create account
    </button>
    <p>
      Already have an account?
      <a
        @click="$emit('loginButtonClicked')"
        class="underline text-accent-color cursor-pointer"
        >Log in here!</a
      >
    </p>
  </div>
</template>

<script>
import CountryDropdown from "./CountryDropdown.vue";

export default {
  components: {
    CountryDropdown,
  },
  setup() {
    const accountObj = {
      firstName: "Joan",
      lastName: "Krastanov",
      address: "Test address",
      phone: "+31487230423",
      country: "BG",
      companyId: "kfp3[qkr9jt9jtop[wpkfkd",
      email: "j.krastanov@student.fontys.nl",
      password: "123456abc",
      department: "Software",
      accountType: "ADMIN",
    };
    return {
      accountObj,
    };
  },
};
</script>

<style scoped>
input {
  margin: 0.25rem;
  color: #04080f;
}
</style>

<template>
  <div
    class="relative flex flex-col items-center mt-24 ml-10 mr-10 bg-secondary-color rounded-lg text-primary-color w-full h-144 pt-10"
  >
    <LoadingSpinner v-if="loading" />
    <div v-else class="absolute top-10 left-10">
      <div>
        <p class="font-bold">Select Bank account:</p>
        <select
          v-model="selectedBankAccount"
          class="text-black rounded-sm border border-black"
        >
          <option
            v-for="option in companyAccounts"
            :key="option.IBAN"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
      <div v-if="selectedBankAccountDetails" class="mt-4">
        <p class="font-bold">Bank account details:</p>
        <p>Name: {{ selectedBankAccountDetails.name }}</p>
        <p>Department: {{ selectedBankAccountDetails.department }}</p>
        <p>IBAN: {{ selectedBankAccountDetails.IBAN }}</p>
        <p>
          Balance: {{ selectedBankAccountDetails.balance.amount / 100 }}
          {{ selectedBankAccountDetails.balance.currency }}
        </p>
      </div>
    </div>
    <div class="max-h-[30rem] overflow-y-auto" v-if="showTransactions">
      <div v-if="transactionHistory">
        <table v-if="transactionHistory.length" class="rounded-lg">
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
          <tr v-for="transaction in transactionHistory" :key="transaction.id">
            <td>{{ transaction.senderIBAN }}</td>
            <td>{{ transaction.receiverIBAN }}</td>
            <td>{{ transaction.amount }} {{ transaction.currency }}</td>
            <td>{{ transaction.time }}</td>
          </tr>
        </table>
        <p class="font-bold" v-else>No transactions yet...</p>
      </div>
      <LoadingSpinner v-else />
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner.vue";
import { ref, watch } from "vue";
import { getBankAccountTransactions } from "@/api/bank";
export default {
  components: {
    LoadingSpinner,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    companyAccounts: {
      type: Object,
      required: true,
      default: null,
    },
  },
  setup(props) {
    const selectedBankAccount = ref(props.companyAccounts[0]);
    const selectedBankAccountDetails = ref(null);
    const showTransactions = ref(false);
    const transactionHistory = ref(null);

    watch(
      () => selectedBankAccount.value,
      async () => {
        transactionHistory.value = null;
        selectedBankAccountDetails.value = props.companyAccounts.find(
          (acc) => acc.name === selectedBankAccount.value
        );
        showTransactions.value = true;
        transactionHistory.value = await getBankAccountTransactions(
          selectedBankAccountDetails.value.IBAN
        );
      }
    );

    return {
      selectedBankAccount,
      selectedBankAccountDetails,
      transactionHistory,
      showTransactions,
    };
  },
};
</script>

<style scoped>
tr:nth-child(even) {
  background-color: #2b4263;
}

tr,
th,
td {
  border: 1px solid black;
  padding: 1rem;
}
</style>

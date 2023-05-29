<template>
  <div class="flex flex-col mt-4">
    <p v-if="transactionError">Error sending money, please try again</p>
    <label for="">Amount:</label>
    <input v-model="amountToSend" class="text-black my-1" type="number" />
    <label for="">To (IBAN):</label>
    <input v-model="ibanReceiver" class="text-black my-1" type="text" />
    <button
      @click="createTransaction"
      class="self-center mt-1 w-16 bg-primary-color p-1 rounded-sm text-secondary-color font-semibold border border-black"
    >
      Send
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { sendMoney } from "../api/bank";

export default {
  props: {
    iban: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const amountToSend = ref(0);
    const ibanReceiver = ref("");
    const transactionError = ref(false);

    const createTransaction = async () => {
      if (amountToSend.value === 0 || ibanReceiver.value === "") {
        return;
      }
      transactionError.value = false;
      const result = await sendMoney(
        props.iban,
        ibanReceiver.value,
        amountToSend.value
      );
      if (result === null) {
        transactionError.value = true;
        return;
      }
      emit("moneySent", amountToSend.value);
    };

    return {
      amountToSend,
      ibanReceiver,
      createTransaction,
      transactionError,
    };
  },
};
</script>

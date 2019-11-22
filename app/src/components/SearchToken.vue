<template>
  <div>
    <v-text-field clearable outlined shaped
      label="Digite o token que deseja validar"
      hint="Para validar, clique Espaço!"
      color="blue-grey darken-1"
      :counter="tokenMaxLength" :maxlength="tokenMaxLength"
      :value="token" @keyup="validateToken"
    ></v-text-field>
  </div>
</template>
 

<script>
import Bus from "@/Bus.js";

export default {
  name: 'SearchToken',

  props: {
    tokenMaxLength: {
      type: Number,
      default: 30
    },
  },

  data: () => ({
    token: "",
    isValid: false,
    isNonFinalState: false,
  }),

  methods: {
    validateToken(evt) {
      let obj = null;

      const keyCode = evt.keyCode;
      if (keyCode >= 65 && keyCode <= 90 || keyCode == 8) {
        this.token = evt.target.value;
        obj = {token: this.token, save: false};
      } else if (keyCode == 32) {
        obj = {token: this.token, save: true};
        this.token = "";
      }

      Bus.validateToken(obj);
    }
  }
};
</script>

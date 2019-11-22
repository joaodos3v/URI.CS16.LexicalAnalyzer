import Vue from "vue";

export default new Vue({
  methods: {
    validateToken(obj) {
      this.$emit("tokenValidated", obj);
    },
    onTokenValidate(cbk) {
      this.$on("tokenValidated", cbk);
    },
  }
});
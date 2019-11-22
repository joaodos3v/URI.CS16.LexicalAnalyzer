<template>
  <v-text-field
    label="Digite o token que deseja validar"
    hint="Para validar, clique Espaço!"
    :counter="tokenMaxLength"
    clearable
    color="blue-grey darken-1"
    outlined
    shaped
  ></v-text-field>
</template>

<script>
export default {
  name: 'SearchToken',

  data: () => ({
    maxLength: 20, 
  }),

  props: {
    tokenMaxLength: Number,
  },
};
</script>

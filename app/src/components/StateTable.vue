<template>
  <v-card :shaped="true">
    <v-card-title>Tabela de Estados</v-card-title>
    <v-card-text>
      <SearchToken :tokenMaxLength="tokenMaxLength" />
    </v-card-text>
  </v-card>
</template>

<script>
import SearchToken from './SearchToken';

export default {
  name: 'StateTable',

  components: {
    SearchToken
  },

  data: () => ({
    // 
  }),

  props: {
    tokenMaxLength: Number,
  },
};
</script>

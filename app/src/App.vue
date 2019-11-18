<template>
  <v-app>
    <v-app-bar app dark color="blue-grey darken-1">
      <h2 class="d-flex display-1">LexicalAnalyzer</h2>

      <v-spacer></v-spacer>
      
      <v-btn text href="https://github.com/joao-vieira/URI.CS16.LexicalAnalyzer" target="_blank">
        <span class="mr-2">REPOSITÓRIO</span>
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
      <v-btn text href="https://github.com/joao-vieira" target="_blank">
        <span class="mr-2">PERFIL</span>
        <v-icon>mdi-github-face</v-icon>
      </v-btn>
      <v-btn @click="overlay = !overlay" text>
        <span class="mr-2">AJUDA</span>
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-overlay :absolute="true" :value="overlay" opacity="0.7">
        <h1 class="display-4">LexicalAnalyzer HELP!</h1>
      </v-overlay>

      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <Token :tokenMaxLength="tokenMaxLength" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <StateTable :tokenMaxLength="tokenMaxLength" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Token from './components/Token';
import StateTable from './components/StateTable';

export default {
  name: 'App',

  components: {
    StateTable, Token
  },

  data: () => ({
    overlay: false,
    tokenMaxLength: 30,
  }),
};
</script>

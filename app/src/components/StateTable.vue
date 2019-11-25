<template>
  <v-card v-if="automaton.header && automaton.header.length" :shaped="true">
    <v-card-title>Tabela de Estados</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="1">
            <v-chip v-if="tokenIsValid" label large text-color="white" color="green darken-1">
              <v-icon left>mdi-check-circle</v-icon> VÁLIDO
            </v-chip>
            <v-chip v-else-if="!tokenIsValid && tokenIsNonFinal" label large text-color="white" color="amber accent-4">
              <v-icon left>mdi-alert-circle</v-icon> NÃO FINAL
            </v-chip>
            <v-chip v-else-if="!tokenIsValid && !tokenIsNonFinal" label large text-color="white" color="red accent-2">
              <v-icon left>mdi-close-circle</v-icon> INVÁLIDO
            </v-chip>
          </v-col>
          <v-col cols="11">
            <SearchToken :tokenMaxLength="tokenMaxLength" />
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-simple-table :dense="true">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left font-weight-black title">ESTADOS</th>
                    <th v-for="column in automaton.header" :key="column" class="text-center font-weight-black title">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, state) in automaton.body" :key="state">
                    <td class="title">{{ row.includes('-') ? `* ${state}` : state }}</td>
                    <td v-for="(column, i) in automaton.header" :key="column"
                      :class="[
                        {highlight: state == follow.currentState || column == follow.currentColumn},
                        {focus: state == follow.currentState && column == follow.currentColumn},
                      ]"
                      class="text-center subtitle-1 cell-border">
                      <span v-if="row.includes('-')">{{ row[column] ? row[column] : row[i] }}</span>
                      <span v-else>{{ row[column] ? row[column] : "" }}</span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <v-card v-else>
    <v-card-text>
      <p class="text-center headline">Se você não informar nenhum token, eu não posso gerar a tabela :)</p>
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

  props: {
    automaton: {
      type: Object,
      required: true
    },
    tokenIsValid: Boolean,
    tokenIsNonFinal: Boolean,
    follow: Object,
    tokenMaxLength: {
      type: Number,
      default: 30
    },
  },
};
</script>


<style>
.cell-border {
  border-left: 1px solid #CCC;
}

.highlight {
  background-color: #e3e6e6;
}

.focus {
  background-color: #abafaf;
}
</style>
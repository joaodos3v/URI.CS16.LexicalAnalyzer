<template>
  <v-card v-if="automaton.length" :shaped="true">
    <v-card-title>Tabela de Estados</v-card-title>
    <v-card-text>
      <SearchToken :tokenMaxLength="tokenMaxLength" />
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-simple-table :dense="true">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">ESTADOS</th>
                    <th class="text-left">p</th>
                    <th class="text-left">a</th>
                    <th class="text-left">l</th>
                    <th class="text-left">v</th>
                    <th class="text-left">r</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>q0</td>
                    <td>q1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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
      type: Array,
      required: true
    },
    tokenMaxLength: {
      type: Number,
      default: 0
    },
  },

  data: () => ({
    // 
  }),
};
</script>

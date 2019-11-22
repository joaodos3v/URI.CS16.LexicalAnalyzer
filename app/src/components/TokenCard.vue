<template>
  <v-card :shaped="true">
    <v-card-title>Tokens</v-card-title>
    <v-card-text>
      <v-tabs :grow="true">
        <v-tab>DICIONÁRIO DA FERRAMENTA</v-tab>
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="6">
                <v-text-field required clearable outlined shaped :counter="tokenMaxLength"
                  label="Digite o novo token aqui"
                  hint="Para adicionar, clique Espaço!"
                  color="blue-grey darken-1"
                  v-model="newToken" @keydown.space.prevent="add"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-chip-group v-if="tokens.length" column dark>
                  <v-chip v-for="(token, i) in tokens" :key="i" large pill class="ma-2"
                    text-color="white" color="blue-grey darken-1"
                    close close-icon="mdi-delete" @click:close="$emit('tokenDeleted', i)"
                  >
                    {{ token }}
                  </v-chip>
                </v-chip-group>
                <p v-else class="text-center">Por favor, informe um token para visualizar o funcionamento!</p>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <template v-if="attempts.length">
          <v-tab>TOKENS VALIDADOS</v-tab>
          <v-tab-item>
            <v-container fluid>
              <v-row>
                <TokenHistory title="Válidos" :list="validTokens" />
                <TokenHistory title="Não-Finais" :list="invalidTokens" />
                <TokenHistory title="Inválidos" :list="nonFinalTokens" />
              </v-row>
            </v-container>
          </v-tab-item>
        </template>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
import TokenHistory from "@/components/TokenHistory";

export default {
  name: 'TokenCark',

  components: {
    TokenHistory
  },

  props: {
    tokenMaxLength: {
      type: Number,
      default: 30
    },
    tokens: {
      type: Array,
      required: true
    },
    attempts: Array,
  },

  data: () => ({
    newToken: ""
  }),

  computed: {
    validTokens() {
      return this.attempts.filter(a => a.valid);
    },
    nonFinalTokens() {
      return this.attempts.filter(a => !a.valid && a.nonFinal);
    },
    invalidTokens() {
      return this.attempts.filter(a => !a.valid && !a.nonFinal);
    },
  },
  
  methods: {
    add() {
      this.$emit("tokenAdded", this.newToken);
      this.newToken = "";
    }
  }
};
</script>

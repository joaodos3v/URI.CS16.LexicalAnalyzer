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


        <v-tab>TOKENS VALIDADOS</v-tab>
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title><h4>Válidos</h4></v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content class="body-1">Cadeira</v-list-item-content>
                      <v-list-item-content class="align-end">
                        <v-chip color="teal lighten-2" text-color="white">
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          Aceito
                        </v-chip>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title><h4>Inválidos</h4></v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content class="body-1">Cadeira</v-list-item-content>
                      <v-list-item-content class="align-end">
                        <v-chip color="red lighten-2" text-color="white">
                          <v-avatar left>
                            <v-icon>mdi-close-circle</v-icon>
                          </v-avatar>
                          Rejeitado
                        </v-chip>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Token',

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
  
  methods: {
    add() {
      this.$emit("tokenAdded", this.newToken);
      this.newToken = "";
    },
    validToken() {
      // TODO: validar o token informado com uma regex
        /**
         * - não pode ter acento
         * - tem que ter, NO MÍNIMO, 5 símbolos
         * - [OK] não pode ter espaço
         */
    }
  }
};
</script>

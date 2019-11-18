<template>
  <v-card :shaped="true">
    <v-card-title>Tokens</v-card-title>
    <v-card-text>
      <v-tabs :grow="true">
        <v-tab>NOVO TOKEN</v-tab>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-row class="align-center">
                  <v-col cols="12">
                    <v-text-field
                      label="Diite o novo token aqui"
                      hint="Para adicionar, clique Enter!"
                      :counter="tokenMaxLength"
                      required
                      clearable
                      color="blue-grey darken-1"
                      outlined
                      shaped
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                aqui vai um v-chip com os tokens inseridos (v-group)
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab>TOKENS VALIDADOS</v-tab>
        <v-tab-item>
          <v-container>
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

  data: () => ({
    // 
  }),

  props: {
    tokenMaxLength: Number,
  },
};
</script>

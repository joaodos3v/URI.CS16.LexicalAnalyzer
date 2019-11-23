<template>
  <v-col cols="4">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <h4>{{ title }}</h4>
        <v-dialog v-model="dialog" width="500" >
          <template v-slot:activator="{ on }">
            <v-btn fab outlined small v-on="on">
              <v-icon>mdi-help</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>O que são?</v-card-title>
            <v-card-text>{{ help }}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                Eu entendi
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in list" :key="item.token">
          <v-list-item-content class="body-1">{{ item.token }}</v-list-item-content>
          <v-list-item-content class="align-end">
            <v-chip v-if="item.valid" color="teal lighten-2" text-color="white">
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>Aceito
            </v-chip>
            <v-chip v-else-if="!item.valid && item.nonFinal" color="amber accent-4" text-color="white">
              <v-avatar left>
                <v-icon>mdi-alert-circle</v-icon>
              </v-avatar>Rejeitado
            </v-chip>
            <v-chip v-else color="red lighten-2" text-color="white">
              <v-avatar left>
                <v-icon>mdi-close-circle</v-icon>
              </v-avatar>Rejeitado
            </v-chip>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "TokenCard",

  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },

  computed: {
    help() {
      const arrHelp = {
        "Válidos": "São todos aqueles token que foram digitados corretamente e possuíam um 'caminho válido' dentro da tabela de estados. Sendo assim, todos eles foram RECONHECIDOS e ACEITOS pelo autômato!",
        "Não-Finais": "São os tokens que poderiam ter sido reconhecidos, pois estavam sendo digitados corretamente (ex.: pal -> palavra). Porém, o usuário tentou realizar sua validação antes dele se encontrar em um ESTADO FINAL. Por isso, ele foi rejeitado!",
        "Inválidos": "Os tokens que não foram reconhecidos pelo autômato, ou seja, não possuem um 'caminho' dentro da tabela de estados.",
      };

      return arrHelp[this.title];
    }
  },

  data: () => ({
    dialog: false
  }),
};
</script>

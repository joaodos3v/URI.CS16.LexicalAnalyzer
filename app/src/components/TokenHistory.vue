<template>
  <v-col cols="4">
    <v-card>
      <v-card-title>
        <h4>{{ title }}</h4>
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
  name: "TokenCark",

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
};
</script>

<template>
  <v-menu
    id="benutzerinformation_menu"
    offset-y
    transition="slide-y-transition"
  >
    <template #activator="{ on }">
      <v-btn
        id="benutzerinformation_button"
        small
        icon
        fab
        v-on="on"
      >
        <v-icon> mdi-information </v-icon>
      </v-btn>
    </template>
    TESTT
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Benutzerinformationen extends Vue {}
</script>

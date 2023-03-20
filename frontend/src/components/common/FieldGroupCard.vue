<template>
  <v-card
    ref="vcard"
    outlined
    class="mx-0 my-6 px-3 pt-2 pb-3"
  >
    <v-card-title class="pt-0 pb-6 ma-0 grey--text">
      {{ cardTitle }}
    </v-card-title>
    <slot />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FieldGroupCard extends Vue {
  @Prop()
  cardTitle!: string;
}
</script>

<style></style>

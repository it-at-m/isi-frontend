<template>
  <v-card
    ref="vcard"
    outlined
    class="mx-0 my-6 px-3 pt-2 pb-3"
  >
    <v-card-title class="pt-0 pb-6 ma-0 grey--text">
      {{ cardTitle
      }}<span
        v-if="markCardTitleAsRequired"
        class="secondary--text"
      >
        &nbsp;*</span
      >
    </v-card-title>
    <slot />
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  cardTitle?: string;
  markCardTitleAsRequired?: boolean;
}

withDefaults(defineProps<Props>(), { cardTitle: "", markCardTitleAsRequired: false });
</script>

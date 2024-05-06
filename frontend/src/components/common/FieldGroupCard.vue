<template>
  <v-card
    ref="vcard"
    variant="outlined"
    class="mx-0 my-6 px-3 pt-2 pb-3"
  >
    <v-card-title class="pt-0 pb-6 ma-0 text-grey">
      {{ cardTitle
      }}<span
        v-if="markCardTitleAsMandatory"
        class="text-secondary"
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
  markCardTitleAsMandatory?: boolean;
}

withDefaults(defineProps<Props>(), { cardTitle: "", markCardTitleAsMandatory: false });
</script>

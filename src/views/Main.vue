<template>
  <startseite-personalisiert
    v-if="startseitenKonfiguration"
    :konfiguration="startseitenKonfiguration"
  />
  <startseite-standard v-else />
</template>

<script setup lang="ts">
import StartseitePersonalisiert from "@/views/startseite/StartseitePersonalisiert.vue";
import StartseiteStandard from "@/views/startseite/StartseiteStandard.vue";
import { useStartseitenKonfiguration } from "@/composables/startseite/useStartseitenKonfiguration";

/**
 * Rollen mit einer personalisierten Startseite erhalten diese, siehe StartseitenKonfiguration.
 * Für alle übrigen Rollen bleibt die bisherige Startseite unverändert.
 */
const startseitenKonfiguration = useStartseitenKonfiguration();

defineExpose({ startseitenKonfiguration });
</script>

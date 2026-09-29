<template>
  <startseite-abfrageerstellung v-if="hasRoleAbfrageerstellung" />
  <startseite-standard v-else />
</template>

<script setup lang="ts">
import { computed } from "vue";
import StartseiteAbfrageerstellung from "@/views/StartseiteAbfrageerstellung.vue";
import StartseiteStandard from "@/views/StartseiteStandard.vue";
import { useUserinfoStore } from "@/stores/Userinfostore";

const userinfoStore = useUserinfoStore();

/**
 * Nutzer mit der Rolle "abfrageerstellung" erhalten die personalisierte Startseite.
 * Für alle übrigen Rollen bleibt die bisherige Startseite unverändert.
 */
const hasRoleAbfrageerstellung = computed(() => userinfoStore.hasRoleAbfrageerstellung);

defineExpose({ hasRoleAbfrageerstellung });
</script>

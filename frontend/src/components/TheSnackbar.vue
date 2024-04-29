<template>
  <v-snackbar
    id="snackbar"
    v-model="show"
    :color="level"
    :timeout="timeout"
  >
    {{ message }}
    <v-btn
      v-if="level === 'error'"
      id="snackbar_schließen_button"
      class="text-wrap"
      color="primary"
      text
      @click="show = false"
      v-text="'Schließen'"
    />
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "@/stores/SnackbarStore";

const defaultTimeout = 5000;
const snackbarStore = useSnackbarStore();
const message = computed(() => snackbarStore.message);
const level = computed(() => snackbarStore.level);
const timeout = computed(() => (snackbarStore.level === "error" ? 0 : defaultTimeout));
const show = computed({
  get() {
    return snackbarStore.show;
  },
  set(value) {
    snackbarStore.setShow(value);
  },
});
</script>

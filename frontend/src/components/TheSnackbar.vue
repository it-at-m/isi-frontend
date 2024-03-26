<template>
  <v-snackbar
    id="snackbar"
    v-model="show"
    :color="color"
    :timeout="timeout"
  >
    {{ message }}
    <v-btn
      v-if="color === 'error'"
      id="snackbar_schließen_button"
      class="text-wrap"
      color="primary"
      text
      @click="show = false"
      v-text="'Schließen'"
    />
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import { useSnackbarStore } from "@/stores/SnackbarStore";
@Component
export default class TheSnackbar extends Vue {
  static defaultTimeout = 5000;

  show = false;
  timeout: number = TheSnackbar.defaultTimeout;
  message = "";
  color = "info";

  private snackbarStore = useSnackbarStore();

  @Watch("this.snackbarStore.message")
  setMessage(): void {
    this.message = this.snackbarStore.message as string;
  }

  @Watch("this.snackbarStore.level")
  setColor(): void {
    this.color = this.snackbarStore.level;
    if (this.color === "error") {
      this.timeout = 0;
    } else {
      this.timeout = TheSnackbar.defaultTimeout;
    }
  }

  @Watch("this.snackbarStore.show")
  showSnackbar(): void {
    if (this.snackbarStore.show) {
      this.show = false;
      setTimeout(() => {
        this.show = true;
        this.snackbarStore.setShow(false);
      }, 100);
    }
  }
}
</script>

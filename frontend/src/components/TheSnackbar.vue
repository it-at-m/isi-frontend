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
      class="text-wrap"
      color="primary"
      text
      @click="show = false"
      v-text="'Schließen'"
    />
  </v-snackbar>
</template>

<script lang="ts">
import {Component, Watch, Vue} from 'vue-property-decorator';

@Component
export default class TheSnackbar extends Vue {

  static defaultTimeout = 5000

  show = false
  timeout: number = TheSnackbar.defaultTimeout
  message = ''
  color = 'info'

  @Watch('$store.state.snackbar.message')
  setMessage(): void {
    this.message = this.$store.state.snackbar.message;
  }

  @Watch('$store.state.snackbar.level')
  setColor(): void {
    this.color = this.$store.state.snackbar.level;
    if (this.color === 'error') {
      this.timeout = 0;
    } else {
      this.timeout = TheSnackbar.defaultTimeout;
    }
  }

  @Watch('$store.state.snackbar.show')
  showSnackbar(): void {
    if (this.$store.state.snackbar.show) {
      this.show = false;
      setTimeout(() => {
        this.show = true;
        this.$store.dispatch('snackbar/updateShow', false);
      }, 100);
    }
  }
}
</script>


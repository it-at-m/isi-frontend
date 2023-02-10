<template>
  <div
    class="d-flex justify-center align-center"
    style="height: 100%; min-height: 50px"
  >
    <span
      v-if="success === true"
      class="text-h6"
    >Keine {{ name }} gefunden</span>
    <span
      v-else-if="success === false"
      class="text-h6"
    >Ein Fehler ist aufgetreten</span>
    <v-progress-circular
      v-else
      indeterminate
      color="grey lighten-1"
      size="50"
      width="5"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  
  @Prop({ type: Boolean })
  success: boolean | undefined;

  @Prop({ type: String, default: "Ergebnisse" })
  name!: string;

}
</script>
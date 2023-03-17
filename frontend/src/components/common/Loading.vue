<template>
  <div
    class="d-flex justify-center align-center"
    style="height: 100%; min-height: 50px"
  >
    <span
      v-if="success === true"
      class="text-h6"
      >Keine {{ name }} gefunden</span
    >
    <span
      v-else-if="success === false"
      class="text-h6"
      >Ein Fehler ist aufgetreten</span
    >
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
import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * Loading ist ein Platzhalter für Daten, welche im Moment per Request geholt werden.
 *
 * Abhängig vom Wert des Props success zeigt es eine von drei Sachen an:
 * - Bei false zeigt es den Text "Ein Fehler ist aufgetreten" an.
 * - Bei true zeigt es den Text "Keine {{ name }} gefunden" an, wobei {{ name }} aus dem Prop stammt.
 * - Ansonsten zeigt es ein animiertes Ladesymbol an.
 *
 * Hinweis: Wenn success=true ist, sollte es prinzipiell keinen Grund geben, die Komponente anzuzeigen.
 * Der Text dient nur für den Fall, dass die Request erfolgreich war, aber keine Ergebnisse geliefert wurden.
 *
 * Props:
 * - success (boolean | null, default=null): Der Wert, welche die oben beschriebene Logik steuert.
 * - name? (string, default="Ergebnisse"): Was bei "Keine {{ name }} gefunden" eingesetzt werden soll.
 */
@Component
export default class Loading extends Vue {
  @Prop({ type: Boolean, default: null })
  success!: boolean | null;

  @Prop({ type: String, default: "Ergebnisse" })
  name!: string;
}
</script>

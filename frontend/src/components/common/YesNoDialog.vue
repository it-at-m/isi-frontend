<template>
  <v-dialog
    :value="steuerflag"
    persistent
    width="50%"
    @input="changed"
  >
    <template #activator="{ on }">
      <template v-if="buttontext">
        <v-btn
          id="yes_no_dialog_buttontext"
          class="text-wrap"
          color="primary"
          v-on="on"
          v-text="buttontext"
        />
      </template>
      <template v-else-if="icontext">
        <v-btn
          text
          color="primary"
          v-on="on"
        >
          <v-icon large>
            {{ icontext }}
          </v-icon>
        </v-btn>
      </template>
    </template>
    <v-card class="overflow-x-hidden">
      <v-card-title>
        {{ dialogtitle }}
      </v-card-title>
      <v-card-text>
        {{ dialogtext }}
      </v-card-text>
      <v-textarea
        v-if="anmerkungMaxLength > 0"
        id="yes_no_dialog-text-area"
        ref="textarea"
        class="textarea"
        label="Anmerkung"
        auto-grow
        rows="1"
        :maxlength="anmerkungMaxLength"
        @input="anmerkung"
      >
      </v-textarea>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="yes_no_dialog-btn-no"
          class="text-wrap"
          text
          @click="no"
          v-text="noText"
        />
        <v-btn
          id="yes_no_dialog-btn-yes"
          class="text-wrap"
          color="primary"
          @click="yes"
          v-text="yesText"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

/**
 * Der YesNo-Dialog ist ein generischer Dialog zur binären Abfrage beim Nutzer.
 * So kann z.B. die Bestätigung für das Löschen einer Entität damit realisiert werden.
 *
 * Da das Bestätigen einer Aktion in der Regel mit einem Button zusammenhängt, bietet der
 * YesNoDialog diesen gleich mit an. Über `buttontext` und `icontext` kann dieser konfiguriert werden.
 *
 * Wenn sowohl kein `buttontext` als auch `icontext` nicht gesetzt sind, kann der YesNoDialog auch
 * als reiner Dialog verwendet werden. Hierzu wird das Value vom Dialog durchgereicht.
 *
 * Der Text des "Ja"- bzw. des "Nein"-Buttons kann über `yes-text` bzw. `no-text` gesetzt werden.
 *
 * Die Bestätigung des Dialogs wird über ein `yes` Event signalisiert. Analog erfolgt die
 * Signalisierung der Abweisung durch ein `no` Event.
 *
 * Beispiel:
 * <yes-no-dialog
 *    v-model="deleteDialog"
 *    buttontext="Löschen"
 *    dialogtitle="Löschen?"
 *    dialogtext="Wollen Sie die Entität wirklich löschen?"
 *    @no="deleteDialog = false"
 *    @yes="deleteSome"></yes-no-dialog>
 */
@Component
export default class YesNoDialog extends Vue {
  @Prop()
  buttontext: string | undefined;

  @Prop()
  icontext: string | undefined;

  @Prop()
  dialogtitle!: string;

  @Prop()
  dialogtext!: string;

  @Prop({ default: "Ja" })
  yesText!: string;

  @Prop({ default: "Nein" })
  noText!: string;

  @Prop({ default: 0, type: Number })
  anmerkungMaxLength!: number;

  /**
   * Steuerflag für den Dialog
   */
  @VModel({ type: Boolean })
  steuerflag!: boolean;

  no(): void {
    this.$emit("no");
  }

  yes(): void {
    this.$emit("yes");
  }

  anmerkung(val: string): void {
    this.$emit("anmerkung", val);
  }

  changed(val: boolean): void {
    this.$emit("input", val);
  }

  resetTextarea(): void {
    if (!_.isNil(this.$refs.textarea)) {
      this.$refs.textarea.reset();
    }
  }
}
</script>

<style scoped>
.textarea {
  max-width: 700px;
  margin-left: 25px;
}
</style>

<template>
  <v-row justify="center">
    <v-col
      cols="12"
      md="10"
    >
      <v-card class="mx-auto ma-4">
        <v-list
          v-if="abfragevarianten !== undefined && abfragevarianten.length > 0"
          id="abfragevariante_list"
        >
          <v-list-item
            v-for="(item, index) in abfragevarianten"
            :id="'abfragevariante_listitem_'+ index"
            :key="item.abfragevariantenNr"            
          >
            <v-list-item-content
              :id="'abfragevariante_listitem_'+ index + '_editieren'"
              @click="editAbfragevariante(item)"
            >
              <v-list-item-title v-text="displayZeile1(item)" />
              <v-list-item-subtitle v-text="displayZeile2(item)" />
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon
                :id="'abfragevariante_listitem_' + index + '_loeschen_icon'"
                @click="deleteAbfragevariante(item)"
              >
                mdi-delete
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <yes-no-dialog
          id="abfragevariante_yes_no_dialog_loeschen"
          v-model="deleteDialogOpen"
          icon="mdi-delete-forever"
          dialogtitle="Hinweis"
          dialogtext="Hiermit wird die Abfragevariante unwiderruflich gelöscht."
          no-text="Abbrechen"
          yes-text="Löschen"
          @no="yesNoDialogNo"
          @yes="yesNoDialogYes"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Mixins, Component, VModel } from "vue-property-decorator";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import _ from "lodash";

@Component({
  components: {
    YesNoDialog
  }
})
export default class AbfragevariantenListe extends Mixins (FieldPrefixesSuffixes) {
  @VModel({ type: Array }) abfragevarianten!: AbfragevarianteModel[];

  private selectedAbfragevariante: AbfragevarianteModel | undefined;

  private deleteDialogOpen = false;

  private displayZeile1(item: AbfragevarianteModel): string {
    return `Nr.: ${item.abfragevariantenNr} - Realisierung: ${item.realisierungVon} bis ${item.realisierungBis}`;
  }

  private displayZeile2(item: AbfragevarianteModel): string {
    let zeile2 = "";
    if (!_.isNil(item.geschossflaecheWohnen)) {
      zeile2 = `GF Wohnen: ${item.geschossflaecheWohnen} ${this.fieldPrefixesSuffixes.squareMeter}`;
    }
    if (!_.isNil(item.gesamtanzahlWe)) {
      if (zeile2.length > 0) {
        zeile2 += " - ";
      }
      zeile2 += `Anzahl WE: ${item.gesamtanzahlWe}`;
    }
    return zeile2;
  }


  private editAbfragevariante(selectedAbfragevariante: AbfragevarianteModel): void {
    this.$emit("onEditAbfragevariante", selectedAbfragevariante);
  }

  private deleteAbfragevariante(selectedAbfragevariante: AbfragevarianteModel): void {
    this.selectedAbfragevariante = selectedAbfragevariante;
    this.deleteDialogOpen = true;
  }

  private yesNoDialogYes(): void {
    if (this.selectedAbfragevariante !== undefined) {
      this.$emit("onDeleteAbfragevariante", this.selectedAbfragevariante);
    }
    this.reset();
    this.yesNoDialogNo();
  }

  private yesNoDialogNo(): void {
    this.deleteDialogOpen = false;
    this.reset();
  }

  public reset(): void {
    this.selectedAbfragevariante = undefined;
  }
}

</script>
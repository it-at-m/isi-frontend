<template>
  <div>
    <field-group-card :card-title="weitereBerechnungsgrundlagenTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevarianteSachbearbeitung_geschossflaecheWohnenPlanungsursaechlich"
            v-model="abfragevarianteSachbearbeitung.geschossflaecheWohnenPlanungsursaechlich"
            class="mx-3"
            label="Planungsursächliche Geschossfläche Wohnen"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="abfragevarianteSachbearbeitung_soBoNOrientierungswertJahr"
            v-model="abfragevarianteSachbearbeitung.soBoNOrientierungswertJahr"
            :items="sobonOrientierungswertJahrList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld]"
            @change="formChanged"
          >
            <template #label> Jahr für SoBoN-Orientierungwerte <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            id="abfragevarianteSachbearbeitung_anmerkung"
            v-model="abfragevarianteSachbearbeitung.anmerkung"
            label="Anmerkungen"
            auto-grow
            rows="3"
            maxlength="255"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="bedarfsmeldungenFachreferateTitle">
      <v-row justify="center">
        <v-col cols="12">
          <v-container class="table">
            <v-data-table
              :headers="bedarfsmeldungenHeaders"
              :items="abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate"
              :items-per-page="10"
              class="elevation-1"
              hide-default-footer
              @click:row="(item) => enterSelected(item)"
              @change="formChanged"
            >
              <template #header="{ text }">
                <span class="text-right">
                  {{ text }}
                </span>
              </template>
            </v-data-table>
            <v-row class="mt-4">
              <v-col
                cols="12"
                md="4"
              />
              <v-col
                cols="12"
                md="4"
                class="text-center"
              >
                <v-btn
                  class="text-wrap"
                  block
                  @click="bedarfsmeldungErfassen()"
                  v-text="'Bedarfsmeldung erfassen'"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              />
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </field-group-card>
    <bedarfsmeldung-fachabteilungen-dialog
      id="bedarfsmeldung_fachabteilungen"
      v-model="bedarfsmeldungFachabteilungenDialogOpen"
      @bedarfsmeldungUebernehmen="bedarfsmeldungUebernehmen($event)"
      @uebernahmeAbbrechen="bedarfsmeldungFachabteilungenDialogOpen = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import AbfragevarianteSachbearbeitungModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import BedarfsmeldungFachabteilungenDialog from "@/components/abfragevarianten/BedarfsmeldungFachabteilungenDialog.vue";
import BedarfsmeldungFachabteilungenModel from "@/types/model/abfragevariante/BedarfsmeldungFachabteilungenModel";

@Component({ components: { FieldGroupCard, NumField, BedarfsmeldungFachabteilungenDialog } })
export default class AbfragevarianteForm extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  @VModel({ type: AbfragevarianteSachbearbeitungModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteSachbearbeitungModel;

  get sobonOrientierungswertJahrList(): LookupEntryDto[] {
    return this.$store.getters["lookup/sobonOrientierungswertJahr"];
  }

  private weitereBerechnungsgrundlagenTitle = "Weitere Berechnungsgrundlagen";

  private bedarfsmeldungenFachreferateTitle = "Bedarfsmeldungen der Fachreferate";

  private bedarfsmeldungFachabteilungenDialogOpen = false;

  private bedarfsmeldungenHeaders = [
    {
      text: "Anzahl Einrichtungen",
      align: "start",
      sortable: false,
      value: "anzahlEinrichtungen",
    },
    { text: "Infrastruktureinrichtung Typ", value: "infrastruktureinrichtungTyp" },
    { text: "Anzahl der Kinderkrippengruppen", value: "anzahlKindergruppen" },
    { text: "Anzahl der Kindergartengruppen", value: "anzahlKindergartengruppen" },
    { text: "Anzahl der Hortgruppen", value: "anzahlHortgruppen" },
    { text: "Anzahl der Grundschulzüge", value: "anzahlGrundschulzuege" },
    { text: "Aktionen", value: "actions", sortable: false },
  ];

  private bedarfsmeldungUebernehmen(bedarfsmeldung: BedarfsmeldungFachabteilungenModel): void {
    bedarfsmeldung.anzahlEinrichtungen = undefined;
  }
}
</script>

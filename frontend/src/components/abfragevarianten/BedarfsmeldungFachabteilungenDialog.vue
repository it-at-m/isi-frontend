<template>
  <v-dialog
    :value="bedarfsmeldung"
    persistent
    width="60%"
  >
    <v-card class="overflow-x-hidden">
      <v-card-title
        class="text-wrap align-stretch"
        v-text="'Bedarfsmeldung'"
      />
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="bedarfsmeldung_anzahl_einrichtungen"
            v-model="bedarfsmeldung.anzahlEinrichtungen"
            class="mx-3"
            label="Anzahl der Einrichtungen einer Größe"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="bedarfsmeldung_infrastruktureinrichtung_typ"
            v-model="bedarfsmeldung.infrastruktureinrichtungTyp"
            class="mx-3"
            :items="infrastruktureinrichtungenTypList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label> Infrastruktureinrichtung Typ <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="bedarfsmeldung_anzahl_anzahlKinderkrippengruppen"
            v-model="bedarfsmeldung.anzahlKinderkrippengruppen"
            class="mx-3"
            label="Anzahl der Kinderkrippengruppen"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="bedarfsmeldung_anzahl_anzahlKindergartengruppen"
            v-model="bedarfsmeldung.anzahlKindergartengruppen"
            class="mx-3"
            label="Anzahl der Kindergartengruppen"
            integer
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="bedarfsmeldung_anzahl_anzahlHortgruppen"
            v-model="bedarfsmeldung.anzahlHortgruppen"
            class="mx-3"
            label="Anzahl der Hortgruppen"
            integer
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="bedarfsmeldung_anzahl_anzahlGrundschulzuege"
            v-model="bedarfsmeldung.anzahlGrundschulzuege"
            class="mx-3"
            label="Anzahl der Grundschulzüge"
            integer
          />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="bedarfsmeldung_abbrechen_button"
          class="text-wrap"
          text
          @click="bedarfsmeldungAbbrechen"
          v-text="'Abbrechen'"
        />
        <v-btn
          id="bedarfsmeldung_uebernehmen_button"
          class="text-wrap"
          color="primary"
          @click="bedarfsmeldungUebernehmen"
          v-text="'Übernehmen'"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Mixins, VModel } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import BedarfsmeldungFachabteilungenModel from "@/types/model/abfragevariante/BedarfsmeldungFachabteilungenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component
export default class BauvorhabenDataTransferDialog extends Mixins(SaveLeaveMixin, FieldValidationRulesMixin) {
  @VModel({ type: Boolean }) bedarfsmeldung!: BedarfsmeldungFachabteilungenModel;

  get infrastruktureinrichtungenTypList(): LookupEntryDto[] {
    return this.$store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  @Emit()
  private bedarfsmeldungUebernehmen(): BedarfsmeldungFachabteilungenModel {
    console.log("bedarfsmeldungUebernehmen 1");
    return this.bedarfsmeldung;
  }

  @Emit()
  private bedarfsmeldungAbbrechen(): void {
    console.log("bedarfsmeldungAbbrechen 1");
    return;
  }
}
</script>

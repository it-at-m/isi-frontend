<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="abfrage_name"
            v-model.trim="abfrage.nameAbfrage"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="70"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Name der Abfrage <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <adresse-component
      id="abfrage_adresse_component"
      :adresse-prop.sync="abfrage.adresse"
      :allgemeine-ortsangabe-prop.sync="abfrage.allgemeineOrtsangabe"
      :show-in-information-list-prop="true"
    />
    <verortung
      id="verortung_component"
      v-model="abfrage.verortung"
      :look-at="abfrage.adresse"
    />
    <field-group-card :card-title="allgemeineInfoCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
            id="abfrage_friststellungnahme"
            ref="fristStellungnahmeDatePicker"
            v-model="abfrage.fristStellungnahme"
            label="Termin der Stellungnahme"
            :rules="[fieldValidationRules.pflichtfeld]"
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="abfrage_status_dropdown"
            v-model="abfrage.statusAbfrage"
            :items="statusAbfrageList"
            item-value="key"
            item-text="value"
            readonly
            :rules="[fieldValidationRules.pflichtfeld]"
            :append-icon="null"
            @change="formChanged"
          >
            <template #label> Status der Abfrage </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="abfrage_standvorhaben_dropdown"
            v-model="abfrage.standVorhaben"
            :items="standVorhabenList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label> Stand des Vorhabens <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="abfrage_bauvorhaben_dropdown"
            v-model="abfrage.bauvorhaben"
            :items="bauvorhabenList"
            item-text="nameVorhaben"
            item-value="id"
            label="Bauvorhaben"
            clearable
            @focus="fetchBauvorhaben"
            @change="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="abfrage_bebauungsplannummer"
            v-model="abfrage.bebauungsplannummer"
            label="Bebauungsplannummer"
            maxlength="255"
            @input="formChanged"
          />
        </v-col>
        <!-- Slot für Aktenzeichen ProLBK Textfield  -->
        <v-col
          cols="12"
          md="6"
        >
          <slot name="aktenzeichenProLBK" />
        </v-col>
        <v-col cols="12">
          <v-textarea
            id="abfrage_anmerkung"
            v-model="abfrage.anmerkung"
            label="Anmerkungen"
            auto-grow
            rows="3"
            maxlength="255"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="dokumentCardTitle">
      <v-row>
        <v-col cols="12">
          <dokumente
            id="abfrage_dokumente_component"
            ref="abfrageDokumente"
            v-model="abfrage.dokumente"
            :name-root-folder="nameRootFolder"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import { BauvorhabenDto, LookupEntryDto } from "@/api/api-client/isi-backend";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import DatePicker from "@/components/common/DatePicker.vue";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import Verortung from "@/components/common/Verortung.vue";

@Component({
  components: {
    Verortung,
    DatePicker,
    Dokumente,
    FieldGroupCard,
    AdresseComponent,
  },
})
export default class AbfrageComponent extends Mixins(
  FieldValidationRulesMixin,
  BauvorhabenApiRequestMixin,
  SaveLeaveMixin
) {
  @VModel({ type: AbfrageModel }) abfrage!: AbfrageModel;

  private allgemeineInfoCardTitle = "Allgemeine Informationen zum Vorhaben";

  private dokumentCardTitle = "Dokumente";

  private nameRootFolder = "abfrage";

  mounted(): void {
    this.fetchBauvorhaben();
  }

  get standVorhabenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVorhaben"];
  }

  get bauvorhabenList(): BauvorhabenDto[] {
    return this.$store.getters["search/resultBauvorhaben"];
  }

  get statusAbfrageList(): LookupEntryDto[] {
    return this.$store.getters["lookup/statusAbfrage"];
  }

  /**
   * Holt alle Bauvorhaben vom Backend.
   */
  private async fetchBauvorhaben(): Promise<void> {
    await this.getBauvorhaben(true).then((bauvorhaben: BauvorhabenDto[]) => {
      this.$store.dispatch("search/resultBauvorhaben", bauvorhaben);
    });
  }
}
</script>

<style></style>

<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            v-model.trim="abfrage.nameAbfrage"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="70"
            @input="formChanged"
          >
            <template #label>
              Name der Abfrage <span class="secondary--text">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="adressCardTitle">
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            v-model="abfrage.allgemeineOrtsangabe"
            label="Allgemeine Ortsangabe"
            value="abfrage.allgemeineOrtsangabe"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="abfrage.adresse.strasse"
            label="Strasse"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="abfrage.adresse.hausnummer"
            :rules="[fieldValidationRules.hausnummer]"
            label="Hausnummer"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="abfrage.adresse.plz"
            label="Postleitzahl"
            :rules="[fieldValidationRules.digits, fieldValidationRules.min5]"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="abfrage.adresse.ort"
            label="Ort"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="allgemeineInfoCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
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
            v-model="abfrage.statusAbfrage"
            :items="statusAbfrageList"
            item-value="key"
            item-text="value"
            readonly
            :rules="[fieldValidationRules.pflichtfeld]"
            @change="formChanged"
          >
            <template #label>
              Status der Abfrage <span class="secondary--text">*</span>
            </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="abfrage.standVorhaben"
            :items="standVorhabenList"
            item-value="key"
            item-text="value"
            :rules="[
              fieldValidationRules.pflichtfeld,
              fieldValidationRules.notUnspecified,
            ]"
            @change="formChanged"
          >
            <template #label>
              Stand des Vorhabens <span class="secondary--text">*</span>
            </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
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
            v-model="abfrage.bebauungsplannummer"
            label="Bebauungsplannummer"
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
            v-model="abfrage.anmerkung"
            label="Anmerkungen"
            auto-grow
            rows="3"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="dokumentCardTitle">
      <v-row>
        <v-col cols="12">
          <dokumente
            ref="abfrageDokumente"
            v-model="abfrage.dokumente"
            :path-to-file="dokumentePathToFile"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>


<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import { BauvorhabenDto, LookupEntryDto } from "@/api/api-client";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import DatePicker from "@/components/common/DatePicker.vue";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import { createFilepathDtoFor } from "@/utils/Factories";
import _ from "lodash";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({
  components: {
    DatePicker,
    Dokumente,
    FieldGroupCard,
  },
})
export default class AbfrageComponent extends Mixins(
  FieldValidationRulesMixin,
  BauvorhabenApiRequestMixin,
  SaveLeaveMixin
) {
  @VModel({ type: AbfrageModel }) abfrage!: AbfrageModel;

  private adressCardTitle = "Adressinformationen";

  private allgemeineInfoCardTitle = "Allgemeine Informationen zum Vorhaben";

  private dokumentCardTitle = "Dokumente";

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

  get dokumentePathToFile(): string | undefined {
    if (!_.isNil(this.abfrage)) {
      return createFilepathDtoFor("abfrage", this.abfrage.dokumente);
    }
    return undefined;
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

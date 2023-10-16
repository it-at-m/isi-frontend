<template>
  <div>
    <statusleiste-component :abfrage="abfrage" />
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="abfrage_name"
            v-model.trim="abfrage.nameAbfrage"
            :disabled="!isEditableByAbfrageerstellung()"
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
      :is-editable-prop="isEditableByAbfrageerstellung()"
    />
    <verortung
      id="verortung_component"
      v-model="abfrage.verortung"
      :context="context"
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
            :disabled="!isEditableByAbfrageerstellung()"
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
            id="abfrage_standvorhaben_dropdown"
            v-model="abfrage.standVorhaben"
            :disabled="!isEditableByAbfrageerstellung()"
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
            :disabled="!isEditableByAbfrageerstellung()"
            :items="bauvorhaben"
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
            :disabled="!isEditableByAbfrageerstellung()"
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
        <!-- Platzhalter fuer Darstellung -->
        <v-col
          cols="12"
          md="6"
        >
        </v-col>
        <v-col cols="12">
          <v-textarea
            id="abfrage_anmerkung"
            v-model="abfrage.anmerkung"
            :disabled="!isEditableByAbfrageerstellung()"
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
            :is-dokumente-editable="isEditableByAbfrageerstellung()"
            @change="formchanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import {
  BauvorhabenSearchResultDto,
  LookupEntryDto,
  SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import DatePicker from "@/components/common/DatePicker.vue";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import Verortung from "@/components/common/Verortung.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import { Context } from "@/utils/Context";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import { Component, Mixins, VModel } from "vue-property-decorator";
import StatusleisteComponent from "./StatusleisteComponent.vue";

@Component({
  computed: {
    context() {
      return Context.ABFRAGE;
    },
  },
  components: {
    Verortung,
    DatePicker,
    Dokumente,
    FieldGroupCard,
    AdresseComponent,
    StatusleisteComponent,
  },
})
export default class AbfrageComponent extends Mixins(
  FieldValidationRulesMixin,
  BauvorhabenApiRequestMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
  SearchApiRequestMixin,
) {
  @VModel({ type: AbfrageModel }) abfrage!: AbfrageModel;

  private allgemeineInfoCardTitle = "Allgemeine Informationen zum Vorhaben";

  private dokumentCardTitle = "Dokumente";

  private nameRootFolder = "abfrage";

  private bauvorhaben: Array<BauvorhabenSearchResultDto> = [];

  mounted(): void {
    this.fetchBauvorhaben();
  }

  get standVorhabenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVorhaben"];
  }

  get statusAbfrageList(): LookupEntryDto[] {
    return this.$store.getters["lookup/statusAbfrage"];
  }

  /**
   * Holt alle Bauvorhaben vom Backend.
   */
  private async fetchBauvorhaben(): Promise<void> {
    const searchQueryAndSortingDto = {
      searchQuery: "",
      selectInfrastrukturabfrage: false,
      selectBauvorhaben: true,
      selectGrundschule: false,
      selectGsNachmittagBetreuung: false,
      selectHausFuerKinder: false,
      selectKindergarten: false,
      selectKinderkrippe: false,
      selectMittelschule: false,
      page: undefined,
      pageSize: undefined,
      sortBy: SearchQueryAndSortingDtoSortByEnum.LastModifiedDateTime,
      sortOrder: SearchQueryAndSortingDtoSortOrderEnum.Desc,
    } as SearchQueryAndSortingDto;
    this.searchForEntities(searchQueryAndSortingDto).then((searchResults) => {
      this.bauvorhaben = searchResults.searchResults?.map(
        (searchResults) => searchResults as BauvorhabenSearchResultDto,
      ) as Array<BauvorhabenSearchResultDto>;
    });
  }
}
</script>

<style></style>

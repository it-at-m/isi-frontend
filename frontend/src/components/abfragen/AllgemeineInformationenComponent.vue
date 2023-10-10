<template>
  <v-container>
    <field-group-card :card-title="allgemeineInfoCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="abfrage_bebauungsplannummer"
            v-model="infrastrukturabfrage.abfrage.bebauungsplannummer"
            :disabled="!isEditableByAbfrageerstellung()"
            label="Bebauungsplannummer"
            maxlength="255"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="abfrage_bauvorhaben_dropdown"
            v-model="infrastrukturabfrage.abfrage.bauvorhaben"
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
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <tri-switch
            id="abfrage_infrastrukturabfrage_sobonRelevant_triswitch"
            v-model="infrastrukturabfrage.sobonRelevant"
            :disabled="!isEditableByAbfrageerstellung()"
            off-text="Nein"
            on-text="Ja"
            :rules="[fieldValidationRules.notUnspecified]"
          >
            <template #label> SoBoN-relevant <span class="secondary--text">*</span> </template>
          </tri-switch>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-select
              v-if="sobonJahrVisible"
              id="abfrage_infrastrukturabfrage_sobonJahr_dropdown"
              v-model="infrastrukturabfrage.sobonJahr"
              :disabled="!isEditableByAbfrageerstellung()"
              :items="sobonVerfahrensgrundsaetzeJahrList"
              item-value="key"
              item-text="value"
              :rules="[fieldValidationRules.pflichtfeld]"
              @change="formChanged"
            >
              <template #label>
                Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN <span class="secondary--text">*</span>
              </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="12"
        >
          <v-select
            id="abfrage_standverfahren_dropdown"
            v-model="infrastrukturabfrage.abfrage.standVorhaben"
            :disabled="!isEditableByAbfrageerstellung()"
            :items="standVerfahrenList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label> Stand des Verfahrens <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Watch } from "vue-property-decorator";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import {
  BauvorhabenSearchResultDto,
  LookupEntryDto,
  UncertainBoolean,
  SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import TriSwitch from "@/components/common/TriSwitch.vue";

@Component({
  components: { TriSwitch },
})
export default class AllgemeineInformationenComponent extends Mixins(
  SaveLeaveMixin,
  SearchApiRequestMixin,
  FieldValidationRulesMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: InfrastrukturabfrageModel }) infrastrukturabfrage!: InfrastrukturabfrageModel;

  private allgemeineInfoCardTitle = "Allgemeine Informationen zum Verfahren / Vorhaben";

  private sobonJahrVisible = false;

  private bauvorhaben: Array<BauvorhabenSearchResultDto> = [];

  mounted(): void {
    this.fetchBauvorhaben();
  }

  get standVerfahrenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVorhaben"];
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

  @Watch("infrastrukturabfrage.sobonRelevant", { immediate: true })
  private sobonRelevantChanged(value: UncertainBoolean): void {
    if (value === UncertainBoolean.True) {
      this.sobonJahrVisible = true;
    } else {
      this.sobonJahrVisible = false;
      this.infrastrukturabfrage.sobonJahr = undefined;
    }
  }
}
</script>

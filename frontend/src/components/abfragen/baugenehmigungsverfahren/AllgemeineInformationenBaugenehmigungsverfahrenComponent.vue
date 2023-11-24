<template>
  <field-group-card :card-title="allgemeineInfoCardTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          id="aktenzeichen_pro_lbk_field"
          ref="aktenzeichenProLbkField"
          v-model="abfrage.aktenzeichenProLbk"
          :disabled="!isEditable"
          label="Aktenzeichen ProLBK"
          maxlength="255"
          @input="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          id="bebauungsplannummer_field"
          ref="bebauungsplannummerField"
          v-model="abfrage.bebauungsplannummer"
          :disabled="!isEditable"
          label="Bebauungsplannummer"
          maxlength="255"
          @input="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          id="bauvorhaben_dropdown"
          ref="bauvorhabenDropdown"
          v-model="abfrage.bauvorhaben"
          :disabled="!isEditable"
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
        <v-select
          id="stand_verfahren_dropdown"
          ref="standVerfahrenDropdown"
          v-model="abfrage.standVerfahren"
          :disabled="!isEditable"
          :items="standVerfahrenBaugenehmigungsverfahrenList"
          item-value="key"
          item-text="value"
          :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
          @change="formChanged"
        >
          <template #label> Stand des Verfahrens <span class="secondary--text">*</span> </template>
        </v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-slide-y-reverse-transition>
          <v-text-field
            v-if="standVerfahrenFreieEingabeVisible"
            id="stand_verfahren_freie_freie_eingabe_field"
            ref="standVerfahrenFreieEingabeField"
            v-model="abfrage.standVerfahrenFreieEingabe"
            :disabled="!isEditable"
            label="freie Eingabe"
            maxlength="255"
            @input="formChanged"
          />
        </v-slide-y-reverse-transition>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop, Watch } from "vue-property-decorator";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import {
  BauleitplanverfahrenDtoStandVerfahrenEnum,
  BauvorhabenSearchResultDto,
  LookupEntryDto,
  SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import TriSwitch from "@/components/common/TriSwitch.vue";

@Component({
  components: { TriSwitch },
})
export default class AllgemeineInformationenBaugenehmigungsverfahrenComponent extends Mixins(
  SaveLeaveMixin,
  SearchApiRequestMixin,
  FieldValidationRulesMixin,
) {
  @VModel({ type: BaugenehmigungsverfahrenModel }) abfrage!: BaugenehmigungsverfahrenModel;

  @Prop({ type: Boolean, default: true })
  private isEditableProp!: boolean;

  get isEditable(): boolean {
    return this.isEditableProp;
  }

  private allgemeineInfoCardTitle = "Allgemeine Informationen zum Verfahren / Bauvorhaben";

  private sobonJahrVisible = false;

  private standVerfahrenFreieEingabeVisible = false;

  private bauvorhaben: Array<BauvorhabenSearchResultDto> = [];

  mounted(): void {
    this.fetchBauvorhaben();
  }

  get standVerfahrenBaugenehmigungsverfahrenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVerfahrenBaugenehmigungsverfahren"];
  }

  /**
   * Holt alle Bauvorhaben vom Backend.
   */
  private async fetchBauvorhaben(): Promise<void> {
    const searchQueryAndSortingDto = {
      searchQuery: "",
      selectBauleitplanverfahren: false,
      selectBaugenehmigungsverfahren: false,
      selectWeiteresVerfahren: false,
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

  @Watch("abfrage.standVerfahren", { immediate: true })
  private standVerfahrenChanged(): void {
    if (this.abfrage.standVerfahren?.includes(BauleitplanverfahrenDtoStandVerfahrenEnum.FreieEingabe)) {
      this.standVerfahrenFreieEingabeVisible = true;
    } else {
      this.abfrage.standVerfahrenFreieEingabe = undefined;
      this.standVerfahrenFreieEingabeVisible = false;
    }
  }
}
</script>

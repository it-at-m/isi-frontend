<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="infrastruktureinrichtung_nameEinrichtung"
            v-model="infrastruktureinrichtung.nameEinrichtung"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="255"
            validate-on-blur
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label> Name der Einrichtung <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <adresse-component
      id="infrastruktureinrichtung_adresse_component"
      :adresse-prop.sync="infrastruktureinrichtung.adresse"
      :allgemeine-ortsangabe-prop.sync="infrastruktureinrichtung.allgemeineOrtsangabe"
      :show-in-information-list-prop="true"
      :is-editable-prop="isEditable"
    />
    <infrastruktureinrichtung-verortung
      v-model="infrastruktureinrichtung.adresse"
      :is-editable="isEditable"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="infrastruktureinrichtung_status_dropdown"
            v-model="infrastruktureinrichtung.status"
            :items="statusInfrastruktureinrichtungList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label>Status der Infrastruktureinrichtung <span class="secondary--text">*</span></template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_fertigstellungsjahr"
            v-model="infrastruktureinrichtung.fertigstellungsjahr"
            label="Fertigstellungsjahr (JJJJ)"
            class="mx-3"
            year
            :required="isFertigstellungsjahrRequired()"
            maxlength="4"
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="infrastruktureinrichtung_einrichtungstraeger_dropdown"
            v-model="infrastruktureinrichtung.einrichtungstraeger"
            :items="einrichtungstraegerList"
            item-value="key"
            item-text="value"
            :rules="
              isEinrichtungstraegerRequired()
                ? [fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]
                : []
            "
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label
              >Einrichtungsträger
              <span
                v-if="isEinrichtungstraegerRequired()"
                class="secondary--text"
                >*</span
              ></template
            >
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="infrastruktureinrichtung_bauvorhaben_dropdown"
            v-model="infrastruktureinrichtung.bauvorhaben"
            :items="bauvorhaben"
            item-text="nameVorhaben"
            item-value="id"
            label="Bauvorhaben"
            clearable
            :disabled="!isEditable"
            @focus="fetchBauvorhaben"
            @change="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="flaechenAngabenCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_flaecheGesamtgrundstueck"
            v-model="infrastruktureinrichtung.flaecheGesamtgrundstueck"
            class="mx-3"
            label="Fläche Gesamtgrundstück"
            :suffix="fieldPrefixesSuffixes.squareMeter"
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_flaecheTeilgrundstueck"
            v-model="infrastruktureinrichtung.flaecheTeilgrundstueck"
            class="mx-3"
            label="Fläche Teilgrundstück"
            :suffix="fieldPrefixesSuffixes.squareMeter"
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import {
  BauvorhabenSearchResultDto,
  InfrastruktureinrichtungDtoStatusEnum,
  LookupEntryDto,
  SearchQueryAndSortingDto,
  SearchQueryAndSortingDtoSortByEnum,
  SearchQueryAndSortingDtoSortOrderEnum,
} from "@/api/api-client/isi-backend";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import NumField from "@/components/common/NumField.vue";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import SecurityMixin from "@/mixins/security/SecurityMixin";
import SearchApiRequestMixin from "@/mixins/requests/search/SearchApiRequestMixin";
import InfrastruktureinrichtungVerortung from "./InfrastruktureinrichtungVerortung.vue";

@Component({
  components: {
    FieldGroupCard,
    NumField,
    AdresseComponent,
    InfrastruktureinrichtungVerortung,
  },
})
export default class InfrastruktureinrichtungComponent extends Mixins(
  FieldValidationRulesMixin,
  BauvorhabenApiRequestMixin,
  SaveLeaveMixin,
  FieldPrefixesSuffixes,
  SearchApiRequestMixin,
  SecurityMixin,
) {
  @VModel({ type: InfrastruktureinrichtungModel })
  infrastruktureinrichtung!: InfrastruktureinrichtungModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private flaechenAngabenCardTitle = "Flächenangaben zur Einrichtung";

  private bauvorhaben: Array<BauvorhabenSearchResultDto> = [];

  mounted(): void {
    this.fetchBauvorhaben();
  }

  get statusInfrastruktureinrichtungList(): LookupEntryDto[] {
    return this.$store.getters["lookup/statusInfrastruktureinrichtung"];
  }

  get einrichtungstraegerList(): LookupEntryDto[] {
    return this.$store.getters["lookup/einrichtungstraeger"];
  }

  private isFertigstellungsjahrRequired(): boolean {
    return this.infrastruktureinrichtung.status !== InfrastruktureinrichtungDtoStatusEnum.Bestand;
  }

  private isEinrichtungstraegerRequired(): boolean {
    return (
      this.infrastruktureinrichtung.status === InfrastruktureinrichtungDtoStatusEnum.Bestand ||
      this.infrastruktureinrichtung.status === InfrastruktureinrichtungDtoStatusEnum.GesichertePlanungErwPlaetzeBestEinr
    );
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

<template>
  <field-group-card :card-title="adressCardTitle">
    <div>
      <v-row justify="center">
        <v-col cols="12">
          <v-autocomplete
            id="adresse_adressSuche_dropdown"
            v-model="selectedAdresse"
            :items="searchResult"
            :loading="isLoading"
            :search-input.sync="searchForAdresse"
            dense
            clearable
            color="black"
            no-filter
            hide-no-data
            append-icon=""
            item-text="adresse"
            item-value="adressId"
            label="Adress-Suche"
            return-object
            placeholder="Suchtext mit Adressteilen"
            prepend-inner-icon="mdi-magnify"
            @keyup.enter="onBlurAdressSuche"
            @blur="onBlurAdressSuche"
          />
        </v-col>
      </v-row>
    </div>
    <div v-if="isAllgemeineOrtsangabeVisible">
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="adresse_allgemeineOrtsangabe"
            ref="allgemeineOrtsangabeField"
            v-model="allgemeineOrtsangabe"
            label="Allgemeine Ortsangabe"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </div>
    <div v-if="isAdresseVisible">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="adresse_strasse"
            ref="strasseField"
            v-model="adresse.strasse"
            label="Straße"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="adresse_hausnummer"
            v-model="adresse.hausnummer"
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
            id="adresse_postleitzahl"
            v-model="adresse.plz"
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
            id="adresse_ort"
            v-model="adresse.ort"
            label="Ort"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </div>
  </field-group-card>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import AdresseModel from "@/types/model/common/AdresseModel";
import { AdressSucheDto } from "@/api/api-client/isi-master-eai";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { MuenchenAdresseDto } from "@/api/api-client/isi-master-eai";
import MasterEaiApiRequestMixin from "@/mixins/requests/eai/MasterEaiApiRequestMixin";
import { createAdresseDto, createAdressSucheDto, createMuenchenAdresseDto } from "@/utils/Factories";
import CityMap from "@/components/map/CityMap.vue";
import _ from "lodash";
import { LatLngLiteral } from "leaflet";
import Verortung from "@/components/common/Verortung.vue";

@Component({
  components: { Verortung, CityMap },
})
export default class AdresseComponent extends Mixins(
  SaveLeaveMixin,
  FieldValidationRulesMixin,
  FieldGroupCard,
  MasterEaiApiRequestMixin
) {
  private adressCardTitle = "Adressinformationen";

  private loading = false;

  private adressSuche = "";

  private adressSucheOnBlur = ""; // Kopie von adressSuche bis zum Verlassen des Feldes

  private adressSucheItemSelected = false;

  private selectedAdresseOfAdressSuche: MuenchenAdresseDto = createMuenchenAdresseDto();

  private adressen: Array<MuenchenAdresseDto> = [];

  @Prop()
  private adresseProp!: AdresseModel;

  get adresse(): AdresseModel {
    return this.adresseProp;
  }

  set adresse(adresse: AdresseModel) {
    this.$emit("update:adresseProp", adresse);
  }

  @Prop()
  private allgemeineOrtsangabeProp!: string;

  get allgemeineOrtsangabe(): string {
    return this.allgemeineOrtsangabeProp;
  }

  set allgemeineOrtsangabe(allgemeineOrtsangabe: string) {
    this.$emit("update:allgemeineOrtsangabeProp", allgemeineOrtsangabe);
  }

  @Prop({ type: Boolean, default: true })
  private showInInformationListProp!: boolean;

  get showInInformationList(): boolean {
    return this.showInInformationListProp;
  }

  get selectedAdresse(): MuenchenAdresseDto {
    return this.selectedAdresseOfAdressSuche;
  }

  set selectedAdresse(dto: MuenchenAdresseDto) {
    this.selectedAdresseOfAdressSuche = dto;
    this.assumeAdresse(this.selectedAdresseOfAdressSuche);
  }

  get isLoading(): boolean {
    return this.loading;
  }

  get searchResult(): MuenchenAdresseDto[] {
    return this.adressen;
  }

  set searchResult(adressen: MuenchenAdresseDto[]) {
    this.adressen = adressen;
  }

  get searchForAdresse(): string {
    return this.adressSuche;
  }

  set searchForAdresse(adressSuche: string) {
    this.adressSuche = adressSuche;
    if (!_.isNil(adressSuche)) {
      this.adressSucheOnBlur = this.adressSuche;
      this.searchForAdressenWith(this.adressSuche);
    }
  }

  get isAllgemeineOrtsangabeVisible(): boolean {
    return !_.isEmpty(this.allgemeineOrtsangabe);
  }

  get isAdresseVisible(): boolean {
    return _.isEmpty(this.allgemeineOrtsangabe);
  }

  get coordinate(): LatLngLiteral | undefined {
    const lat = this.adresse.coordinate?.latitude;
    const lng = this.adresse.coordinate?.longitude;

    if (lat && lng) {
      return { lat, lng };
    }
    return undefined;
  }

  private assumeAllgemeineOrtsangabe(allgemeineOrtsangabe: string): void {
    this.allgemeineOrtsangabe = allgemeineOrtsangabe;
    this.resetAdresse();
    this.resetAdressSuche();
  }

  private assumeAdresse(dto: MuenchenAdresseDto): void {
    this.adressSucheItemSelected = true;
    this.assignAdresse(dto);
    this.allgemeineOrtsangabe = "";
    this.resetAdressSuche();
  }

  private assignAdresse(dto: MuenchenAdresseDto): void {
    this.adresse.plz = _.isNil(dto.geozuordnungen) ? "" : dto.geozuordnungen.postleitzahl;
    this.adresse.ort = dto.ortsname;
    this.adresse.strasse = dto.strassenname;
    this.adresse.hausnummer = _.isNil(dto.hausnummer) ? "" : dto.hausnummer.toLocaleString("de-DE");
    this.adresse.hausnummer = _.isNil(dto.hausnummer) ? "" : dto.hausnummer.toLocaleString("de-DE");
    if (!_.isNil(dto.buchstabe)) {
      this.adresse.hausnummer += dto.buchstabe;
    }

    const latitude = dto.position?.wgs?.lat;
    const longitude = dto.position?.wgs?.lon;
    if (latitude && longitude) {
      this.adresse.coordinate = { latitude, longitude };
    }
  }

  private resetAdresse(): void {
    this.adresse = new AdresseModel(createAdresseDto());
  }

  private resetAdressSuche(): void {
    this.adressSuche = "";
    this.adressSucheOnBlur = "";
    this.selectedAdresseOfAdressSuche = createMuenchenAdresseDto();
    this.searchResult = [];
    this.adressSucheItemSelected = false;
    this.formChanged();
  }

  private onBlurAdressSuche(): void {
    if (!this.adressSucheItemSelected && !_.isEmpty(this.adressSucheOnBlur)) {
      this.assumeAllgemeineOrtsangabe(this.adressSucheOnBlur);
    }
  }

  //
  // Aufruf der EAI zum Lesen der Münchner Adressen mit dem eingegebenen Suchtext mit Adressteilen
  //
  async searchForAdressenWith(searchFor: string): Promise<void> {
    if (!_.isEmpty(searchFor)) {
      const adressSuche: AdressSucheDto = createAdressSucheDto();
      adressSuche.query = searchFor;
      this.loading = true; // Anzeige des Cursorladekreis starten
      await this.getAdressen(adressSuche, this.showInInformationList)
        .then((dto) => {
          if (!_.isNil(dto)) {
            this.searchResult = dto;
          }
        })
        .finally(() => {
          // Anzeige des Cursorladekreises beenden
          this.loading = false;
        });
    }
  }
}
</script>
;

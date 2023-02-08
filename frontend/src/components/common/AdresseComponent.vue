<template>
  <v-container>
    <field-group-card :card-title="adressCardTitle">
      <v-row justify="center">
        <v-col cols="12">
          <v-autocomplete
            v-model="selectedAdresse"
            :items="searchResult"
            :loading="isLoading"
            :search-input.sync="searchForAdresse"
            hide-no-data
            hide-selected
            item-text="adresse"
            item-value="adressId"
            label="Adress-Suche"
            return-object
            placeholder="Suchtext mit Adressteilen"
            prepend-icon="mdi-magnify"
            @blur="onBlurAdressSuche"
          >
            <template #no-data>
              <v-list>
                <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>
              </v-list>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-text-field
            ref="allgemeineOrtsangabeField"
            v-model="allgemeineOrtsangabe"
            label="Allgemeine Ortsangabe"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            ref="strasseField"
            v-model="adresse.strasse"
            label="Strasse"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
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
            v-model="adresse.ort"
            label="Ort"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
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
import { createAdressSucheDto, createMuenchenAdresseDto } from "@/utils/Factories";
import _ from "lodash";

@Component( {
  components: {},
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

  private adresseEai: MuenchenAdresseDto = createMuenchenAdresseDto();

  private adressen: Array<MuenchenAdresseDto> = [];

  @Prop()
  private adresseProp!: AdresseModel;

  get adresse(): AdresseModel {
    return this.adresseProp;
  }

  set adresse(adresse: AdresseModel) {
    this.propagateAdresse(adresse);
  }

  private propagateAdresse(adresse: AdresseModel) {
    this.$emit("update:adresseProp", adresse);
  }

  @Prop()
  private allgemeineOrtsangabeProp!: string;

  get allgemeineOrtsangabe(): string {
    return this.allgemeineOrtsangabeProp;
  }

  set allgemeineOrtsangabe(allgemeineOrtsangabe: string) {
    this.propagateAllgemeineOrtsangabe(allgemeineOrtsangabe);
  }

  private propagateAllgemeineOrtsangabe(allgemeineOrtsangabe: string): void {
    this.$emit("update:allgemeineOrtsangabeProp", allgemeineOrtsangabe);
  }

  @Prop({ type: Boolean, default: true })
  private showInInformationListProp!: boolean;

  get showInInformationList(): boolean {
    return this.showInInformationListProp;
  }

  get selectedAdresse(): MuenchenAdresseDto {
    return this.adresseEai;
  }

  set selectedAdresse(dto: MuenchenAdresseDto) {
    this.adresseEai = dto;
    this.assumeAdresse(this.adresseEai);    
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

  private assumeAllgemeineOrtsangabe(allgemeineOrtsangabe: string): void {
    this.propagateAllgemeineOrtsangabe(allgemeineOrtsangabe);
    this.resetAdresse(this.adresse);
  }

  private assumeAdresse(dto: MuenchenAdresseDto): void {
    this.assignAdresse(dto);
    this.propagateAllgemeineOrtsangabe(""); // allgemeine Ortsangabe löschen
    this.resetAdressSuche();
    this.focusOnStrasseField();
  }

  private assignAdresse(dto: MuenchenAdresseDto): void {
    this.adresse.plz = _.isNil(dto.geozuordnungen) ? "" : dto.geozuordnungen.postleitzahl;
    this.adresse.ort = dto.ortsname;
    this.adresse.strasse = dto.strassenname;
    this.adresse.hausnummer = _.isNil(dto.hausnummer) ? "" : dto.hausnummer.toLocaleString('de-DE');
  }

  private resetAdresse(adresse: AdresseModel): void {
    adresse.plz = "";
    adresse.ort = "";
    adresse.strasse = "";
    adresse.hausnummer = "";
  }

  private resetAdressSuche(): void {
    this.adressSuche = "";
    this.adressSucheOnBlur = "";
    this.adresseEai = createMuenchenAdresseDto();
    this.searchResult = [];
  }
  
  private onBlurAdressSuche(): void {
    this.assumeAllgemeineOrtsangabe(this.adressSucheOnBlur);
    this.resetAdressSuche();
    this.focusOnAllgemeineOrtseingbeField();
  }

  private focusOnAllgemeineOrtseingbeField() {
    this.$nextTick(() => {
      const allgemeineOrtsangabeFieldRef = this.$refs.allgemeineOrtsangabeField;
      if (!_.isNil(allgemeineOrtsangabeFieldRef)) {
        allgemeineOrtsangabeFieldRef.$el.focus();
      }
    });
  }

  private focusOnStrasseField() {
     this.$nextTick(() => {
      const strasseFieldRef = this.$refs.strasseField;
      if (!_.isNil(strasseFieldRef)) {
        strasseFieldRef.$el.focus();
      }
    });
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
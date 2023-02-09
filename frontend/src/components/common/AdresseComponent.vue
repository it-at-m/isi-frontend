<template>
  <v-container>
    <field-group-card :card-title="adressCardTitle">
      <div>
        <v-row justify="center">
          <v-col cols="12">
            <v-autocomplete
              v-model="selectedAdresse"
              :items="searchResult"
              :loading="isLoading"
              :search-input.sync="searchForAdresse"
              dense    
              clearable    
              color="black"
              no-filter
              append-icon=""
              item-text="adresse"
              item-value="adressId"
              label="Adress-Suche"
              return-object
              placeholder="Suchtext mit Adressteilen"
              prepend-inner-icon="mdi-magnify"
              @blur="onBlurAdressSuche"
            >
              <template #no-data>
                <v-list>
                  <v-list-item-title> Keine Suchvorschläge... </v-list-item-title>
                </v-list>
              </template>
            </v-autocomplete>
          </v-col>        
        </v-row>
      </div>
      <div v-if="isAllgemeineOrtsangabeVisible">
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
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
      </div>
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
import { createAdresseDto, createAdressSucheDto, createMuenchenAdresseDto } from "@/utils/Factories";
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

  private adressSucheItemSelected = false;

  private adresseEai: MuenchenAdresseDto = createMuenchenAdresseDto();

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

  get isAllgemeineOrtsangabeVisible(): boolean {
    return !_.isEmpty(this.allgemeineOrtsangabe);
  }

  get isAdresseVisible(): boolean {
    return _.isEmpty(this.allgemeineOrtsangabe);
  }

  private assumeAllgemeineOrtsangabe(allgemeineOrtsangabe: string): void {
    this.allgemeineOrtsangabe = allgemeineOrtsangabe;
    this.resetAdresse();
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
    this.adresse.hausnummer = _.isNil(dto.hausnummer) ? "" : dto.hausnummer.toLocaleString('de-DE');
  }

  private resetAdresse(): void {
    this.adresse = new AdresseModel(createAdresseDto());
  }

  private resetAdressSuche(): void {
    this.adressSuche = "";
    this.adressSucheOnBlur = "";
    this.adresseEai = createMuenchenAdresseDto();
    this.searchResult = [];
    this.adressSucheItemSelected = false;
  }
  
  private onBlurAdressSuche(): void {
    if (!this.adressSucheItemSelected
        && !_.isEmpty(this.adressSucheOnBlur)) {
      this.assumeAllgemeineOrtsangabe(this.adressSucheOnBlur);
      this.resetAdressSuche();
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
</script>;
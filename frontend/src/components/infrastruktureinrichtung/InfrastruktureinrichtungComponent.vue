<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            v-model="infrastruktureinrichtung.nameEinrichtung"
            :rules="[fieldValidationRules.pflichtfeld]"
            @input="formChanged"
          >
            <template #label>
              Name der Einrichtung <span class="secondary--text">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="adressCardTitle">
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            v-model="infrastruktureinrichtung.allgemeineOrtsangabe"
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
            v-model="infrastruktureinrichtung.adresse.strasse"
            label="Strasse"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="infrastruktureinrichtung.adresse.hausnummer"
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
            v-model="infrastruktureinrichtung.adresse.plz"
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
            v-model="infrastruktureinrichtung.adresse.ort"
            label="Ort"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >          
          <num-field            
            v-model="infrastruktureinrichtung.fertigstellungsjahr"
            label="Fertigstellungsjahr (JJJJ)"
            class="mx-3"
            year
            required
            maxlength="4"
          />    
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="infrastruktureinrichtung.status"
            :items="statusInfrastruktureinrichtungList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld,fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label>
              Status der Infrastruktureinrichtung <span class="secondary--text">*</span>
            </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="infrastruktureinrichtung.einrichtungstraeger"
            :items="einrichtungstraegerList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld,fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label>
              Einrichtungsträger <span class="secondary--text">*</span>
            </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="infrastruktureinrichtung.bauvorhaben"
            :items="bauvorhabenList"
            item-text="nameVorhaben"
            item-value="id"
            label="Bauvorhaben"
            clearable
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
            v-model="infrastruktureinrichtung.flaecheGesamtgrundstueck"
            class="mx-3"
            label="Fläche Gesamtgrundstück"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />          
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            v-model="infrastruktureinrichtung.flaecheTeilgrundstueck"
            class="mx-3"
            label="Fläche Teilgrundstück"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />          
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import { BauvorhabenDto, LookupEntryDto } from "@/api/api-client";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin"; 
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import DisplayMode from "@/types/common/DisplayMode";
import NumField from "@/components/common/NumField.vue";

@Component({
  components: {
    FieldGroupCard,
    NumField
  },
})
export default class InfrastruktureinrichtungComponent extends Mixins(
  FieldValidationRulesMixin,
  BauvorhabenApiRequestMixin,
  SaveLeaveMixin,
  FieldPrefixesSuffixes
) {
  @VModel({ type: InfrastruktureinrichtungModel }) infrastruktureinrichtung!: InfrastruktureinrichtungModel;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode === undefined ? DisplayMode.UNDEFINED : this.mode;
  }

  get isNewInfrastruktureinrichtung(): boolean {
    return this.mode === DisplayMode.NEU;
  }

  private adressCardTitle = "Adressinformationen";

  private flaechenAngabenCardTitle = "Flächenangaben zur Einrichtung";

  mounted(): void {    
    this.fetchBauvorhaben();
  }

  get statusInfrastruktureinrichtungList(): LookupEntryDto[] {
    return this.$store.getters["lookup/statusInfrastruktureinrichtung"];
  }

  get einrichtungstraegerList(): LookupEntryDto[] {
    return this.$store.getters["lookup/einrichtungstraeger"];
  }

  get bauvorhabenList(): BauvorhabenDto[] {
    return this.$store.getters["search/resultBauvorhaben"];
  }

  /**
   * Holt alle Bauvorhaben vom Backend.
   */
  private async fetchBauvorhaben(): Promise<void> {
    await this.getBauvorhaben(true)
      .then((bauvorhaben: BauvorhabenDto[]) => {
        this.$store.dispatch("search/resultBauvorhaben", bauvorhaben);
      });
  }

}
</script>
<style></style>
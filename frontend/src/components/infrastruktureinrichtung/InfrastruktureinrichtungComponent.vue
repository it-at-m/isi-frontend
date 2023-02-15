<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            v-model="infrastruktureinrichtung.nameEinrichtung"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="255"
            validate-on-blur
            @input="formChanged"
          >
            <template #label>
              Name der Einrichtung <span class="secondary--text">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <adresse-component
      :adresse-prop.sync="infrastruktureinrichtung.adresse"
      :allgemeine-ortsangabe-prop.sync="infrastruktureinrichtung.allgemeineOrtsangabe"
      :show-in-information-list-prop="true"
    />
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
import { BauvorhabenDto, LookupEntryDto } from "@/api/api-client/isi-backend";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import BauvorhabenApiRequestMixin from "@/mixins/requests/BauvorhabenApiRequestMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin"; 
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import DisplayMode from "@/types/common/DisplayMode";
import NumField from "@/components/common/NumField.vue";
import AdresseComponent from "@/components/common/AdresseComponent.vue";

@Component({
  components: {
    FieldGroupCard,
    NumField,
    AdresseComponent
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
<template>
  <v-container>
    <field-group-card>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="bauvorhaben.eigentuemer"
            :rules="[fieldValidationRules.pflichtfeld]"
            @input="formChanged"
          >
            <template #label>
              Eigentümer <span class="secondary--text">*</span>
            </template>
          </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            v-model="bauvorhaben.grundstuecksgroesse"
            label="Grundstücksgröße"
            :suffix="fieldPrefixesSuffixes.squareMeter"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="bauvorhaben.standVorhaben"
            :items="standVorhabenList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
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
          <v-text-field
            v-model="bauvorhaben.bauvorhabenNummer"
            :rules="[fieldValidationRules.pflichtfeld]"
            @input="formChanged"
          >
            <template #label>
              Bauvorhabennummer <span class="secondary--text">*</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <adresse-component
      :adresse-prop.sync="bauvorhaben.adresse"
      :allgemeine-ortsangabe-prop.sync="bauvorhaben.allgemeineOrtsangabe"
    />
    <field-group-card :card-title="allgemeineInfoCardTitle">
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="bauvorhaben.planungsrecht"
            :items="planungsrechtList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label>
              Planungsrecht <span class="secondary--text">*</span>
            </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="bauvorhaben.zustaendigkeit"
            :items="zustaendigkeitList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label>
              Zuständigkeit <span class="secondary--text">*</span>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-autocomplete            
            v-model="bauvorhaben.artFnp"
            :items="baugebietTypList"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[fieldValidationRules.pflichtfeldMehrfachauswahl, fieldValidationRules.notUnspecified]"
            @input="formChanged"
          >        
            <template #label>
              Flächennutzung laut Flächennutzungsplan
              <span class="secondary--text">*</span>
            </template>
          </v-autocomplete>  
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <TriSwitch
            v-model="bauvorhaben.sobonRelevant"
            off-text="Nein"
            on-text="Ja"
            :rules="[fieldValidationRules.notUnspecified]"
          >
            <template #label>
              SoBoN-relevant <span class="secondary--text">*</span>
            </template>
          </TriSwitch>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="bauvorhaben.bebauungsplannummer"
            label="Bebauungsplannummer"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="bauvorhaben.fisNummer"
            label="FIS-Nummer"
            @input="formChanged"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="bauvorhaben.anmerkung"
            label="Anmerkung"
            rows="1"
            auto-grow
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="dokumentCardTitle">
      <v-row>
        <v-col cols="12">
          <Dokumente
            v-model="bauvorhaben.dokumente"
            :path-to-file="dokumentePathToFile"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import { LookupEntryDto } from "@/api/api-client";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import { createFilepathDtoFor } from "@/utils/Factories";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import TriSwitch from "@/components/common/TriSwitch.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AdresseComponent from "@/components/common/AdresseComponent.vue";

@Component({ components: { FieldGroupCard, Dokumente, NumField, TriSwitch } })
export default class BauvorhabenForm extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AdresseComponent
) {
  @VModel({type: BauvorhabenModel})
  bauvorhaben!: BauvorhabenModel;
  
  private dokumentCardTitle = "Dokumente";

  private allgemeineInfoCardTitle = "Allgemeine Informationen zum Bauvorhaben"

  get standVorhabenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVorhaben"];
  }

  get planungsrechtList(): LookupEntryDto[] {
    return this.$store.getters["lookup/planungsrecht"];
  }

  get zustaendigkeitList(): LookupEntryDto[] {
    return this.$store.getters["lookup/zustaendigeDienststelle"];
  }

  get baugebietTypList(): LookupEntryDto[] {
    return this.$store.getters["lookup/baugebietTyp"];
  }

  get dokumentePathToFile(): string {
    return createFilepathDtoFor("bauvorhaben", this.bauvorhaben.dokumente);
  }
}
</script>

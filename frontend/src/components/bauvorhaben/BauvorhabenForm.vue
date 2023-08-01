<template>
  <v-container>
    <field-group-card>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_eigentuemer"
            v-model="bauvorhaben.eigentuemer"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="255"
            validate-on-blur
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label> Eigentümer <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="bauvorhaben_grundstuecksgroesse"
            v-model="bauvorhaben.grundstuecksgroesse"
            label="Grundstücksgröße"
            :suffix="fieldPrefixesSuffixes.squareMeter"
            required
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="bauvorhaben_standVorhaben_dropdown"
            v-model="bauvorhaben.standVorhaben"
            :items="standVorhabenList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label> Stand des Vorhabens <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_bauvorhabenNummer"
            v-model="bauvorhaben.bauvorhabenNummer"
            :rules="[fieldValidationRules.pflichtfeld]"
            maxlength="255"
            validate-on-blur
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label> Bauvorhabennummer <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <adresse-component
      id="bauvorhaben_adresse_component"
      :adresse-prop.sync="bauvorhaben.adresse"
      :allgemeine-ortsangabe-prop.sync="bauvorhaben.allgemeineOrtsangabe"
      :show-in-information-list-prop="true"
      :is-editable-prop="isEditable"
    />
    <verortung
      id="verortung_component"
      v-model="bauvorhaben.verortung"
      :context="verortungContext"
      :look-at="bauvorhaben.adresse"
    />
    <field-group-card :card-title="allgemeineInfoCardTitle">
      <v-row>
        <v-col cols="12">
          <v-select
            id="bauvorhaben_planungsrecht_dropdown"
            v-model="bauvorhaben.planungsrecht"
            :items="planungsrechtList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label> Planungsrecht <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            id="bauvorhaben_artFnp_dropdown"
            v-model="bauvorhaben.artFnp"
            :items="baugebietArtList"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[fieldValidationRules.pflichtfeldMehrfachauswahl, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label>
              Flächennutzung laut Flächennutzungsplan
              <span class="secondary--text">*</span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_bebauungsplannummer"
            v-model="bauvorhaben.bebauungsplannummer"
            label="Bebauungsplannummer"
            maxlength="255"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_fisnummer"
            v-model="bauvorhaben.fisNummer"
            label="FIS-Nummer"
            maxlength="255"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            id="bauvorhaben_anmerkung"
            v-model="bauvorhaben.anmerkung"
            label="Anmerkung"
            rows="1"
            auto-grow
            maxlength="255"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="dokumentCardTitle">
      <v-row>
        <v-col cols="12">
          <dokumente
            id="bauvorhaben_dokumente_component"
            v-model="bauvorhaben.dokumente"
            :name-root-folder="nameRootFolder"
            :is-dokumente-editable="isEditable"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="sobonCardTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <tri-switch
            id="bauvorhaben_sobonRelevant_triswitch"
            v-model="bauvorhaben.sobonRelevant"
            off-text="Nein"
            on-text="Ja"
            :rules="[fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
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
              id="bauvorhaben_sobonJahr_dropdown"
              v-model="bauvorhaben.sobonJahr"
              :items="sobonVerfahrensgrundsaetzeJahrList"
              item-value="key"
              item-text="value"
              :rules="[fieldValidationRules.pflichtfeld]"
              :disabled="!isEditable"
              @change="formChanged"
            >
              <template #label>
                Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN <span class="secondary--text">*</span>
              </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import { LookupEntryDto, UncertainBoolean } from "@/api/api-client/isi-backend";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import TriSwitch from "@/components/common/TriSwitch.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { VerortungContext } from "@/components/common/Verortung.vue";
import SecurityMixin from "@/mixins/security/SecurityMixin";

@Component({
  computed: {
    verortungContext() {
      return VerortungContext.BAUVORHABEN;
    },
  },
  components: { FieldGroupCard, Dokumente, NumField, TriSwitch },
})
export default class BauvorhabenForm extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  SecurityMixin
) {
  @VModel({ type: BauvorhabenModel })
  bauvorhaben!: BauvorhabenModel;

  private dokumentCardTitle = "Dokumente";

  private sobonCardTitle = "SoBoN";

  private sobonJahrVisible = false;

  private nameRootFolder = "bauvorhaben";

  private allgemeineInfoCardTitle = "Allgemeine Informationen zum Bauvorhaben";

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get standVorhabenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVorhaben"];
  }

  get planungsrechtList(): LookupEntryDto[] {
    return this.$store.getters["lookup/planungsrecht"];
  }

  get baugebietArtList(): LookupEntryDto[] {
    return this.$store.getters["lookup/baugebietArt"];
  }

  get sobonVerfahrensgrundsaetzeJahrList(): LookupEntryDto[] {
    return this.$store.getters["lookup/sobonVerfahrensgrundsaetzeJahr"];
  }

  @Watch("bauvorhaben.sobonRelevant", { immediate: true })
  private sobonRelevantChanged(value: UncertainBoolean): void {
    if (value === UncertainBoolean.True) {
      this.sobonJahrVisible = true;
    } else {
      this.sobonJahrVisible = false;
      this.bauvorhaben.sobonJahr = undefined;
    }
  }
}
</script>

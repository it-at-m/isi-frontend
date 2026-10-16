<template>
  <infrastruktureinrichtung-name-component
    id="infrastruktureinrichtung_name_component"
    v-model="nachbarschaftstreff"
    :is-editable="isEditable"
  />
  <adresse-component
    id="infrastruktureinrichtung_adresse_component"
    v-model="nachbarschaftstreff.adresse"
    :is-editable="isEditable"
  />
  <infrastruktureinrichtung-verortung
    v-model="nachbarschaftstreff.verortung"
    :adresse="nachbarschaftstreff.adresse"
    :is-editable="isEditable"
    @form-changed="formChanged"
  />
  <field-group-card>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <infrastruktureinrichtung-status-component
          id="infrastruktureinrichtung_status_component"
          v-model="nachbarschaftstreff"
          :is-editable="isEditable"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <infrastruktureinrichtung-fertigstellungsjahr-component
          id="infrastruktureinrichtung_fertigstellungsjahr_component"
          v-model="nachbarschaftstreff"
          :is-editable="isEditable"
        />
      </v-col>
    </v-row>
    <infrastruktureinrichtung-kooperation-component
      id="infrastruktureinrichtung_kooperation_component"
      v-model="nachbarschaftstreff"
      :is-editable="isEditable"
    />
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <tri-switch
          id="sobon_relevant_triswitch"
          ref="sobonRelevantTriswitch"
          v-model="nachbarschaftstreff.sobonRelevant"
          :disabled="!isEditable"
          off-text="Nein"
          on-text="Ja"
          :rules="[notUnspecified]"
        >
          <template #label> SoBoN-relevant <span class="text-secondary">*</span></template>
        </tri-switch>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <infrastruktureinrichtung-vorhaben-component
          id="infrastruktureinrichtung_bauvorhaben_component"
          v-model="nachbarschaftstreff"
          :is-editable="isEditable"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import { watch } from "vue";
import InfrastruktureinrichtungNameComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungNameComponent.vue";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import InfrastruktureinrichtungVerortung from "./InfrastruktureinrichtungVerortung.vue";
import InfrastruktureinrichtungStatusComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungStatusComponent.vue";
import InfrastruktureinrichtungFertigstellungsjahrComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungFertigstellungsjahrComponent.vue";
import InfrastruktureinrichtungKooperationComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungKooperationComponent.vue";
import InfrastruktureinrichtungVorhabenComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungVorhabenComponent.vue";
import NachbarschaftstreffModel from "@/types/model/infrastruktureinrichtung/NachbarschaftstreffModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { notUnspecified } from "@/utils/FieldValidationRules";
import TriSwitch from "@/components/common/TriSwitch.vue";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const { formChanged } = useSaveLeave();
const nachbarschaftstreff = defineModel<NachbarschaftstreffModel>({ required: true });
const emit = defineEmits(["update:modelValue"]);

watch(
  () => nachbarschaftstreff.value.verortung,
  () => {
    emit("update:modelValue", nachbarschaftstreff.value);
  },
  { immediate: true, deep: true },
);
</script>

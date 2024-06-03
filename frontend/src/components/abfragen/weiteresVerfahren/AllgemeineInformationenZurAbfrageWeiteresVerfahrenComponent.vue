<template>
  <field-group-card card-title="Allgemeine Informationen zur Abfrage">
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <date-picker
          id="bearbeitungsfrist_datepicker"
          ref="bearbeitungsfristDatepicker"
          v-model="abfrage.fristBearbeitung"
          :disabled="!isEditable"
          label="Bearbeitungsfrist"
          :rules="[pflichtfeld]"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <tri-switch
          id="offizielle_mitzeichnung_triswitch"
          ref="offizielleMitzeichnungTriswitch"
          v-model="abfrage.offizielleMitzeichnung"
          :disabled="!isEditable"
          off-text="Nein"
          on-text="Ja"
          :rules="[notUnspecified]"
        >
          <template #label> Offizielle Mitzeichnung <span class="text-secondary">*</span> </template>
        </tri-switch>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-textarea
          id="anmerkung_field"
          ref="anmerkungField"
          v-model="abfrage.anmerkung"
          :disabled="!isEditable"
          label="Anmerkungen"
          variant="underlined"
          auto-grow
          rows="1"
          maxlength="1000"
          @update:model-value="formChanged"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <eakte
          id="eakte_component"
          ref="eakteComponent"
          v-model="abfrage.linkEakte"
          :is-editable="isEakteEditable"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import TriSwitch from "@/components/common/TriSwitch.vue";
import DatePicker from "@/components/common/DatePicker.vue";
import Eakte from "@/components/common/Eakte.vue";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
  isEakteEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const abfrage = defineModel<WeiteresVerfahrenModel>({ required: true });

withDefaults(defineProps<Props>(), { isEditable: false, isEakteEditable: false });
</script>

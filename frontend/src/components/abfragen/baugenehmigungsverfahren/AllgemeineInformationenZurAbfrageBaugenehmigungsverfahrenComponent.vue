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
          auto-grow
          rows="1"
          maxlength="1000"
          @input="formChanged"
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
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import { pflichtfeld } from "@/utils/FieldValidationRules";
import Eakte from "@/components/common/Eakte.vue";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
  isEakteEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const abfrage = defineModel<BaugenehmigungsverfahrenModel>({ required: true });

withDefaults(defineProps<Props>(), { isEditable: false, isEakteEditable: false });
</script>

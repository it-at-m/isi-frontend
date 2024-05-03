<template>
  <div>
    <statusleiste-component :abfrage="abfrage" />
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="name_field"
            ref="nameAbfrageField"
            v-model.trim="abfrage.name"
            :disabled="!isEditable"
            :rules="[pflichtfeld]"
            maxlength="70"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Name der Abfrage <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import { pflichtfeld } from "@/utils/FieldValidationRules";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import StatusleisteComponent from "./StatusleisteComponent.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { defineModel } from "@/utils/Vue";

interface Props {
  value: AbfrageModel;
  isEditable?: boolean;
  isNew?: boolean;
}

interface Emits {
  (event: "input", value: AbfrageModel): void;
}

const { formChanged } = useSaveLeave();
const props = withDefaults(defineProps<Props>(), { isEditable: false, isNew: false });
const emit = defineEmits<Emits>();
const abfrage = defineModel(props, emit);
</script>

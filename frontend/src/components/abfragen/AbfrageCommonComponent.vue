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
            validate-on="blur"
            @update:model-value="formChanged"
          >
            <template #label> Name der Abfrage <span class="text-secondary">*</span> </template>
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

interface Props {
  isEditable?: boolean;
  isNew?: boolean;
}

const { formChanged } = useSaveLeave();
const abfrage = defineModel<AbfrageModel>({ required: true });

withDefaults(defineProps<Props>(), { isEditable: false, isNew: false });
</script>

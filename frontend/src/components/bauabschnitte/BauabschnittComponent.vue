<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span
          class="text-h6 font-weight-bold"
          v-text="headline"
        />
      </v-col>
    </v-row>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="bauabschnitt_bezeichnung"
            v-model.trim="bauabschnitt.bezeichnung"
            :disabled="!isEditable"
            :rules="[pflichtfeld]"
            maxlength="255"
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Bezeichnung des Bauabschnitts <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <bauraten-aggregiert-component :aggregate-bauraten="bauabschnitt" />
  </v-container>
</template>

<script setup lang="ts">
import BauratenAggregiertComponent from "@/components/bauraten/BauratenAggregiertComponent.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import BauabschnittModel from "@/types/model/bauabschnitte/BauabschnittModel";
import { defineModel } from "@/utils/Vue";
import { pflichtfeld } from "@/utils/FieldValidationRules";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  value: BauabschnittModel;
  isEditable: boolean;
}

interface Emits {
  (event: "input", value: BauabschnittModel): void;
}
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const bauabschnitt = defineModel(props, emit);
const headline = computed(() => `Bauabschnitt ${bauabschnitt.value.bezeichnung}`);
const { formChanged } = useSaveLeave();
</script>

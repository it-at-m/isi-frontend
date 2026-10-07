<template>
  <field-group-card>
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          id="infrastruktureinrichtung_nameEinrichtung"
          v-model="infrastruktureinrichtung.nameEinrichtung"
          :rules="[pflichtfeld]"
          variant="underlined"
          maxlength="255"
          validate-on="blur"
          :readonly="!isEditable"
          @update:model-value="formChanged"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        >
          <template #label> Name der Einrichtung <span class="text-secondary">*</span> </template>
        </v-text-field>
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { pflichtfeld } from "@/utils/FieldValidationRules";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const { formChanged } = useSaveLeave();
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
</script>

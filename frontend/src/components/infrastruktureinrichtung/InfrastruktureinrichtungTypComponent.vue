<template>
  <div>
    <field-group-card>
      <v-row
        v-if="isNewInfrastruktureinrichtung"
        justify="center"
      >
        <v-col cols="12">
          <v-select
            id="infrastruktureinrichtung_infrastruktureinrichtungtyp_dropdown"
            v-model="infrastruktureinrichtungTyp"
            class="mx-3"
            :items="infrastruktureinrichtungList"
            variant="underlined"
            item-value="key"
            item-title="value"
            :rules="[pflichtfeld, notUnspecified]"
            :disabled="!isEditable"
            @update:model-value="formChanged"
          >
            <template #label> Infrastruktureinrichtung Typ <span class="text-secondary">*</span> </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row
        v-if="!isNewInfrastruktureinrichtung"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="infrastruktureinrichtung_infrastruktureinrichtungtyp_darstellung"
            v-model="infrastruktureinrichtungTypDisplay"
            label="Typ der Infrastruktureinrichtung"
            disabled
            maxlength="255"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="infrastruktureinrichtung_infrastruktureinrichtungtyp_ldfNr_darstellung"
            v-model="lfdNrInfrastruktureinrichtung"
            label="Lfd. Nr."
            disabled
            maxlength="255"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { LookupEntryDto } from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";
import _ from "lodash";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";

interface Props {
  lfdNr?: string;
  isEditable?: boolean;
  mode?: DisplayMode;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const infrastruktureinrichtungTyp = defineModel<string>({ required: true });
const lfdNrInfrastruktureinrichtung = computed(() => props.lfdNr);
const displaymode = computed(() => (props.mode === undefined ? DisplayMode.UNDEFINED : props.mode));
const isNewInfrastruktureinrichtung = computed(() => props.mode === DisplayMode.NEU);
const infrastruktureinrichtungList = computed(() => lookupStore.infrastruktureinrichtungTyp);

function getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isUndefined(list) && !_.isNil(key)
    ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
    : key;
}

const infrastruktureinrichtungTypDisplay = computed(() => {
  if (!_.isNil(infrastruktureinrichtungTyp)) {
    const lookupValue = getLookupValue(infrastruktureinrichtungTyp.value, infrastruktureinrichtungList.value);
    console.log(lookupValue);
    return !_.isNil(lookupValue) ? lookupValue : "";
  } else {
    return "";
  }
});
</script>

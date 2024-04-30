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
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label> Infrastruktureinrichtung Typ <span class="secondary--text">*</span> </template>
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
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import DisplayMode from "@/types/common/DisplayMode";
import _ from "lodash";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { defineModel } from "@/utils/Vue";

interface Props {
  value: string;
  lfdNr?: string;
  isEditable?: boolean;
  mode?: DisplayMode;
}

interface Emits {
  (event: "input", value: string): void;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const infrastruktureinrichtungTyp = defineModel(props, emit);
const lfdNrInfrastruktureinrichtung = computed(() => props.lfdNr);
const displaymode = computed(() => (props.mode === undefined ? DisplayMode.UNDEFINED : props.mode));
const isNewInfrastruktureinrichtung = computed(() => props.mode === DisplayMode.NEU);
const infrastruktureinrichtungList = computed(() => lookupStore.infrastruktureinrichtungTyp);

function getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isUndefined(list) && !_.isNil(key)
    ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
    : key;
}

function infrastruktureinrichtungTypDisplay(): string {
  if (!_.isNil(infrastruktureinrichtungTyp)) {
    const lookupValue = getLookupValue(props.value, infrastruktureinrichtungList.value);
    return !_.isNil(lookupValue) ? lookupValue : "";
  } else {
    return "";
  }
}
</script>

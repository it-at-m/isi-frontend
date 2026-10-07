<template>
  <div>
    <infrastruktureinrichtung-name-component
      id="infrastruktureinrichtung_name_component"
      v-model="nachbarschaftstreff"
      :is-editable="isEditable"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="infrastruktureinrichtung_kooperation_dropdown"
            v-model="nachbarschaftstreff.kooperation"
            :items="kooperationList"
            variant="underlined"
            item-value="key"
            item-title="value"
            :disabled="!isEditable"
            @update:model-value="formChanged"
          >
            <template #label>Kooperation mit <span class="text-secondary">*</span></template>
          </v-select>
          <v-col
            cols="12"
            md="4"
          >
            <v-slide-y-reverse-transition>
              <v-text-field
                v-if="kooperationFreieEingabeVisible"
                id="kooperation_freie_eingabe_field"
                ref="kooperationFreieEingabeField"
                v-model="nachbarschaftstreff.kooperationFreieEingabe"
                variant="underlined"
                :readonly="!isEditable"
                label="Freie Eingabe für Kooperation mit"
                maxlength="1000"
                @update:model-value="formChanged"
                :class="isEditable ? '' : 'text-grey-lighten-1'"
              />
            </v-slide-y-reverse-transition>
          </v-col>
        </v-col>
      </v-row>
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
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import InfrastruktureinrichtungNameComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungNameComponent.vue";
import NachbarschaftstreffModel from "@/types/model/infrastruktureinrichtung/NachbarschaftstreffModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { notUnspecified, pflichtfeld } from "@/utils/FieldValidationRules";
import TriSwitch from "@/components/common/TriSwitch.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { NachbarschaftstreffDtoKooperationEnum } from "@/api/api-client/isi-backend";
import _ from "lodash";
import AdresseComponent from "@/components/common/AdresseComponent.vue";

interface Props {
  isEditable: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });

const lookupStore = useLookupStore();
const { formChanged } = useSaveLeave();
const nachbarschaftstreff = defineModel<NachbarschaftstreffModel>({ required: true });
const kooperationList = computed(() => lookupStore.kooperation);
const kooperationFreieEingabeVisible = ref<boolean | null>();

watch(() => nachbarschaftstreff.value.kooperation, kooperationChanged, { immediate: true });

function kooperationChanged(): void {
  if (!_.isNil(nachbarschaftstreff.value.kooperation)) {
    if (nachbarschaftstreff.value.kooperation === NachbarschaftstreffDtoKooperationEnum.Sonstiges) {
      kooperationFreieEingabeVisible.value = true;
    } else {
      nachbarschaftstreff.value.kooperationFreieEingabe = undefined;
      kooperationFreieEingabeVisible.value = false;
    }
  }
}
</script>

<template>
  <div>
    <infrastruktureinrichtung-name-component
      id="infrastruktureinrichtung_name_component"
      v-model="infrastruktureinrichtung"
      :is-editable="isEditable"
    />
    <adresse-component
      id="infrastruktureinrichtung_adresse_component"
      v-model="infrastruktureinrichtung.adresse"
      :is-editable="isEditable"
    />
    <infrastruktureinrichtung-verortung
      v-model="infrastruktureinrichtung.verortung"
      :adresse="infrastruktureinrichtung.adresse"
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
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-anlass-planung-component
            id="infrastruktureinrichtung_anlass_planung_component"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-fertigstellungsjahr-component
            id="infrastruktureinrichtung_fertigstellungsjahr_component"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-vorhaben-component
            id="infrastruktureinrichtung_bauvorhaben_component"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
        </v-col>
      </v-row>
    </field-group-card>
    <infrastruktureinrichtung-flaechenangaben-component
      id="infrastruktureinrichtung_flaechenangaben_component"
      v-model="infrastruktureinrichtung"
      :is-editable="isEditable"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import InfrastruktureinrichtungNameComponent from "./InfrastruktureinrichtungNameComponent.vue";
import InfrastruktureinrichtungStatusComponent from "./InfrastruktureinrichtungStatusComponent.vue";
import InfrastruktureinrichtungAnlassPlanungComponent from "./InfrastruktureinrichtungAnlassPlanungComponent.vue";
import InfrastruktureinrichtungFertigstellungsjahrComponent from "./InfrastruktureinrichtungFertigstellungsjahrComponent.vue";
import InfrastruktureinrichtungVorhabenComponent from "./InfrastruktureinrichtungVorhabenComponent.vue";
import InfrastruktureinrichtungFlaechenangabenComponent from "./InfrastruktureinrichtungFlaechenangabenComponent.vue";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import InfrastruktureinrichtungVerortung from "./InfrastruktureinrichtungVerortung.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
withDefaults(defineProps<Props>(), { isEditable: false });
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
const emit = defineEmits(["update:modelValue"]);

watch(
  () => infrastruktureinrichtung.value.verortung,
  () => {
    emit("update:modelValue", infrastruktureinrichtung.value);
  },
  { immediate: true, deep: true },
);
</script>

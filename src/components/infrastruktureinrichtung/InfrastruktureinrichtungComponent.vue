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
          v-if="fertigstellungsmonatVisible"
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-fertigstellungsmonat-component
            id="infrastruktureinrichtung_fertigstellungsmonat_component"
            v-model="infrastruktureinrichtung as KinderkrippeModel"
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
          v-if="sobonRelevantVisible"
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-sobon-relevant-component
            id="infrastruktureinrichtung_sobon_relevant_component"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          v-if="kibigWebIdVisible"
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-kibig-web-id-component
            id="infrastruktureinrichtung_kibig_web_id_component"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          v-if="muenchnerKitafoerderungVisible"
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-muenchner-kitafoerderung-component
            id="infrastruktureinrichtung_muenchner_kitafoerderung_component"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          v-if="miniKitaVisible"
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-mini-kita-component
            id="infrastruktureinrichtung_mini_kita_component"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          v-if="integrationseinrichtungVisible"
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-integrationseinrichtung-component
            id="infrastruktureinrichtung_integrationseinrichtung_component"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          v-if="einrichtungstraegerVisible"
          cols="12"
          md="6"
        >
          <einrichtungstraeger-component
            v-model="infrastruktureinrichtung"
            :einrichtungstraeger-list="einrichtungstraegerList"
            :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          v-if="nameTraegerVisible"
          cols="12"
          md="6"
        >
          <infrastruktureinrichtung-name-traeger-component
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
        <v-col
          v-if="nameTraegerVisible"
          cols="12"
          md="6"
        >
        </v-col>
        <v-col
          cols="12"
          md="12"
        >
          <infrastruktureinrichtung-link-ke-plus-component
            id="infrastruktureinrichtung_link_ke_plus_component"
            v-if="linkKePlusVisible"
            v-model="infrastruktureinrichtung"
            :is-editable="isEditable"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import InfrastruktureinrichtungNameComponent from "./InfrastruktureinrichtungNameComponent.vue";
import InfrastruktureinrichtungStatusComponent from "./InfrastruktureinrichtungStatusComponent.vue";
import InfrastruktureinrichtungAnlassPlanungComponent from "./InfrastruktureinrichtungAnlassPlanungComponent.vue";
import InfrastruktureinrichtungFertigstellungsjahrComponent from "./InfrastruktureinrichtungFertigstellungsjahrComponent.vue";
import InfrastruktureinrichtungFertigstellungsmonatComponent from "./InfrastruktureinrichtungFertigstellungsmonatComponent.vue";
import InfrastruktureinrichtungVorhabenComponent from "./InfrastruktureinrichtungVorhabenComponent.vue";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import InfrastruktureinrichtungVerortung from "./InfrastruktureinrichtungVerortung.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import { InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum } from "@/api/api-client/isi-backend";
import InfrastruktureinrichtungSobonRelevantComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungSobonRelevantComponent.vue";
import InfrastruktureinrichtungMuenchnerKitafoerderungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungMuenchnerKitafoerderungComponent.vue";
import InfrastruktureinrichtungKibigWebIdComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungKibigWebIdComponent.vue";
import InfrastruktureinrichtungMiniKitaComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungMiniKitaComponent.vue";
import InfrastruktureinrichtungIntegrationseinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungIntegrationseinrichtungComponent.vue";
import InfrastruktureinrichtungNameTraegerComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungNameTraegerComponent.vue";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";
import InfrastruktureinrichtungLinkKePlusComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungLinkKePlusComponent.vue";
interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({ required: true });
const emit = defineEmits(["update:modelValue"]);

watch(
  () => infrastruktureinrichtung.value.verortung,
  () => {
    emit("update:modelValue", infrastruktureinrichtung.value);
  },
  { immediate: true, deep: true },
);

const isEinrichtungstraegerRequired = computed(() => false);
const einrichtungstraegerList = computed(() => lookupStore.einrichtungstraeger);
const isKinderkrippeOrKindergarten = computed(
  () =>
    infrastruktureinrichtung.value?.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Kinderkrippe ||
    infrastruktureinrichtung.value?.infrastruktureinrichtungTyp ===
      InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Kindergarten,
);
const fertigstellungsmonatVisible = computed(
  () =>
    infrastruktureinrichtung.value?.infrastruktureinrichtungTyp ===
    InfrastruktureinrichtungDtoInfrastruktureinrichtungTypEnum.Kinderkrippe,
);
const einrichtungstraegerVisible = isKinderkrippeOrKindergarten;
const nameTraegerVisible = isKinderkrippeOrKindergarten;
const sobonRelevantVisible = isKinderkrippeOrKindergarten;
const muenchnerKitafoerderungVisible = isKinderkrippeOrKindergarten;
const kibigWebIdVisible = isKinderkrippeOrKindergarten;
const miniKitaVisible = isKinderkrippeOrKindergarten;
const integrationseinrichtungVisible = isKinderkrippeOrKindergarten;
const linkKePlusVisible = isKinderkrippeOrKindergarten;
</script>

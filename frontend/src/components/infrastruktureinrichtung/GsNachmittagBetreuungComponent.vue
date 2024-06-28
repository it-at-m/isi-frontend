<template>
  <div>
    <einrichtungstraeger-component
      v-model="gsNachmittagBetreuung"
      :einrichtungstraeger-list="einrichtungstraegerList"
      :is-editable="isEditable"
      :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_gsNachmittagBetreuung_anzahlHortPlaetze"
            v-model="gsNachmittagBetreuung.anzahlHortPlaetze"
            class="mx-3"
            label="Anzahl der Hortplätze"
            integer
            required
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_gsNachmittagBetreuung_anzahlHortGruppen"
            v-model="gsNachmittagBetreuung.anzahlHortGruppen"
            class="mx-3"
            label="Anzahl der Hortgruppen"
            integer
            required
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_gsNachmittagBetreuung_wohnungsnaheHortPlaetze"
            v-model="gsNachmittagBetreuung.wohnungsnaheHortPlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Hortplätze"
            integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="infrastruktureinrichtung_gsNachmittagBetreuung_artGsNachmittagBetreuung"
            v-model="gsNachmittagBetreuung.artGsNachmittagBetreuung"
            :items="artGsNachmittagBetreuungList"
            variant="underlined"
            item-title="value"
            item-value="key"
            label="Art der Nachmittagsbetreuung für Grundschulkinder"
            :disabled="!isEditable"
            @update:model-value="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { computed } from "vue";
import NumField from "@/components/common/NumField.vue";

interface Props {
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });
const gsNachmittagBetreuung = defineModel<GsNachmittagBetreuungModel>({ required: true });
const artGsNachmittagBetreuungList = computed(() => lookupStore.artGsNachmittagBetreuung);
const einrichtungstraegerList = computed(() => lookupStore.einrichtungstraeger);
</script>

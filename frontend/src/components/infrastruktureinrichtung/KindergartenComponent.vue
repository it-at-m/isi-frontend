<template>
  <div>
    <einrichtungstraeger-component
      v-model="kindergarten"
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
            id="infrastruktureinrichtung_kindergarten_anzahlKindergartenPlaetze"
            v-model="kindergarten.anzahlKindergartenPlaetze"
            class="mx-3"
            label="Anzahl der Kindergartenplätze"
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
            id="infrastruktureinrichtung_kindergarten_anzahlKindergartenGruppen"
            v-model="kindergarten.anzahlKindergartenGruppen"
            class="mx-3"
            label="Anzahl der Kindergartengruppen"
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
            id="infrastruktureinrichtung_kindergarten_wohnungsnaheKindergartenPlaetze"
            v-model="kindergarten.wohnungsnaheKindergartenPlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Kindergartenplätze"
            integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-row />
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { defineModel } from "@/utils/Vue";

interface Props {
  value: KindergartenModel;
  isEditable: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

interface Emits {
  (event: "input", value: KindergartenModel): void;
}

const lookupStore = useLookupStore();
const props = withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });
const emit = defineEmits<Emits>();
const kindergarten = defineModel(props, emit);
const einrichtungstraegerList = computed(() => lookupStore.einrichtungstraeger);
</script>

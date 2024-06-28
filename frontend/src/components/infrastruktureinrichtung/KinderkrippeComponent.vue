<template>
  <div>
    <einrichtungstraeger-component
      v-model="kinderkrippe"
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
            id="infrastruktureinrichtung_kinderkrippe_anzahlKinderkrippePlaetze"
            v-model="kinderkrippe.anzahlKinderkrippePlaetze"
            class="mx-3"
            label="Anzahl der Kinderkrippenplätze"
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
            id="infrastruktureinrichtung_kinderkrippe_anzahlKinderkrippeGruppen"
            v-model="kinderkrippe.anzahlKinderkrippeGruppen"
            class="mx-3"
            label="Anzahl der Kinderkrippengruppen"
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
            id="infrastruktureinrichtung_kinderkrippe_wohnungsnaheKinderkrippePlaetze"
            v-model="kinderkrippe.wohnungsnaheKinderkrippePlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Kinderkrippenplätze"
            integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        />
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";
import { useLookupStore } from "@/stores/LookupStore";

interface Props {
  isEditable: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

const lookupStore = useLookupStore();
withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });
const kinderkrippe = defineModel<KinderkrippeModel>({ required: true });
const einrichtungstraegerList = computed(() => lookupStore.einrichtungstraeger);
</script>

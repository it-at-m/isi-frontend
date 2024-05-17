<template>
  <div>
    <einrichtungstraeger-component
      v-model="schule"
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
            id="infrastruktureinrichtung_schule_anzahlKlassen"
            v-model="schule.anzahlKlassen"
            class="mx-3"
            label="Anzahl der Klassen"
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
            id="infrastruktureinrichtung_schule_anzahlPlaetze"
            v-model="schule.anzahlPlaetze"
            class="mx-3"
            label="Anzahl der Plätze"
            integer
            required
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import SchuleModel from "@/types/model/infrastruktureinrichtung/SchuleModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { computed } from "vue";

interface Props {
  isEditable: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

const lookupStore = useLookupStore();
withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: true });
const schule = defineModel<SchuleModel>();
const einrichtungstraegerList = computed(() => lookupStore.einrichtungstraeger);
</script>

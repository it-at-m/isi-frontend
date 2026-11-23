<template>
  <field-group-card>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kinderkrippe_gesamtplaetze_nach_be"
          v-model="hausFuerKinder.gesamtplaetzeNachBE"
          class="mx-3"
          label="Gesamtplätze nach BE"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_kinderkrippenplaetze_nach_be"
          v-model="hausFuerKinder.kinderkrippenplaetzeNachBE"
          class="mx-3"
          label="Kinderkrippenplätze nach BE"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kinderkrippe_soll_belegung_kinderkrippenplaetze_ke_plus"
          v-model="hausFuerKinder.sollBelegungKinderkrippenplaetzeKePlus"
          class="mx-3"
          label="Soll-Belegung Kinderkrippenplätze lt. ke+"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kinderkrippe_soll_belegung_kinderkrippenplaetze"
          v-model="hausFuerKinder.sollBelegungKinderkrippenplaetze"
          class="mx-3"
          label="Soll-Belegung Kinderkrippenplätze"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kinderkrippe_belegung_kinderkrippenplaetze"
          v-model="hausFuerKinder.belegungKinderkrippenplaetze"
          class="mx-3"
          label="Belegung Kinderkrippenplätze"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kinderkrippe_ueberregionale_kinderkrippenplaetze"
          v-model="hausFuerKinder.ueberregionaleKinderkrippenplaetze"
          class="mx-3"
          label="Überregionale Kinderkrippenplätze"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kinderkrippe_integrationsplaetze_kinderkrippe_ke_plus"
          v-model="hausFuerKinder.integrationsplaetzeKinderkrippeKePlus"
          class="mx-3"
          label="Integrationsplätze Kinderkrippe lt. ke+"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kinderkrippe_integrationsplaetze_kinderkirppe"
          v-model="hausFuerKinder.integrationsplaetzeKinderkrippe"
          class="mx-3"
          label="Integrationsplätze Kinderkrippe"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kinderkrippe_belegung_integrationsplaetze_kinderkrippe_ke_plus"
          v-model="hausFuerKinder.belegungIntegrationsplaetzeKinderkrippe"
          class="mx-3"
          label="Belegung Integrationsplätze Kinderkrippe"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kindergarten_kindergartenplaetze_nach_be"
          v-model="hausFuerKinder.kindergartenplaetzeNachBE"
          class="mx-3"
          label="Kindergartenplätze nach BE"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kindergarten_soll_belegung_kindergartenplaetze_ke_plus"
          v-model="hausFuerKinder.sollBelegungKindergartenplaetzeKePlus"
          class="mx-3"
          label="Soll-Belegung Kindergartenplätze lt. ke+"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kindergarten_soll_belegung_kindergartenplaetze"
          v-model="hausFuerKinder.sollBelegungKindergartenplaetze"
          class="mx-3"
          label="Soll-Belegung Kindergartenplätze"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kindergarten_belegung_kindergartenplaetze"
          v-model="hausFuerKinder.belegungKindergartenplaetze"
          class="mx-3"
          label="Belegung Kindergartenplätze"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kindergarten_ueberregionale_kindergartenplaetze"
          v-model="hausFuerKinder.ueberregionaleKindergartenplaetze"
          class="mx-3"
          label="Überregionale Kindergartenplätze"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kindergarten_integrationsplaetze_kindergarten_ke_plus"
          v-model="hausFuerKinder.integrationsplaetzeKindergartenKePlus"
          class="mx-3"
          label="Integrationsplätze Kindergarten lt. ke+"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kindergarten_integrationsplaetze_kindergarten"
          v-model="hausFuerKinder.integrationsplaetzeKindergarten"
          class="mx-3"
          label="Integrationsplätze Kindergarten"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_kindergarten_belegung_integrationsplaetze_kindergarten_ke_plus"
          v-model="hausFuerKinder.belegungIntegrationsplaetzeKindergarten"
          class="mx-3"
          label="Belegung Integrationsplätze Kindergarten"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_hortlaetze_nach_be"
          v-model="hausFuerKinder.hortplaetzeNachBE"
          class="mx-3"
          label="Hortplätze nach BE"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_soll_belegung_hort_ke_plus"
          v-model="hausFuerKinder.sollBelegungHortKePlus"
          class="mx-3"
          label="Soll-Belegung Hort lt. ke+"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_soll_belegung_hort"
          v-model="hausFuerKinder.sollBelegungHort"
          class="mx-3"
          label="Soll-Belegung Hort"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_belegung_hort"
          v-model="hausFuerKinder.belegungHort"
          class="mx-3"
          label="Belegung Hort"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_ueberregionale_hortlaetze"
          v-model="hausFuerKinder.ueberregionaleHortplaetze"
          class="mx-3"
          label="Überregionale Hortlätze"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_integrationsplaetze_hort_ke_plus"
          v-model="hausFuerKinder.integrationsplaetzeHortKePlus"
          class="mx-3"
          label="Integrationsplätze Hort lt. ke+"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_integrationsplaetze_hort"
          v-model="hausFuerKinder.integrationsplaetzeHort"
          class="mx-3"
          label="Integrationsplätze Hort"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <num-field
          id="infrastruktureinrichtung_hausFuerKinder_belegung_integrationsplaetze_hort"
          v-model="hausFuerKinder.belegungIntegrationsplaetzeHort"
          class="mx-3"
          label="Belegung Integrationsplätze Hort"
          integer
          :readonly="!isEditable"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      />
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { useLookupStore } from "@/stores/LookupStore";
import NumField from "@/components/common/NumField.vue";

interface Props {
  isEditable?: boolean;
  isEinrichtungstraegerRequired?: boolean;
}

const lookupStore = useLookupStore();
withDefaults(defineProps<Props>(), { isEditable: false, isEinrichtungstraegerRequired: false });
const hausFuerKinder = defineModel<HausFuerKinderModel>({ required: true });
</script>

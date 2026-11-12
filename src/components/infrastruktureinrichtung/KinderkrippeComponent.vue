<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_kinderkrippe_gesamtplaetze_nach_be"
            v-model="kinderkrippe.gesamtplaetzeNachBE"
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
            id="infrastruktureinrichtung_kinderkrippe_kinderkrippenplaetze_nach_be"
            v-model="kinderkrippe.kinderkrippenplaetzeNachBE"
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
            v-model="kinderkrippe.sollBelegungKinderkrippenplaetzeKePlus"
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
            v-model="kinderkrippe.sollBelegungKinderkrippenplaetze"
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
            v-model="kinderkrippe.belegungKinderkrippenplaetze"
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
            v-model="kinderkrippe.ueberregionaleKinderkrippenplaetze"
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
            v-model="kinderkrippe.integrationsplaetzeKinderkrippeKePlus"
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
            v-model="kinderkrippe.integrationsplaetzeKinderkrippe"
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
            v-model="kinderkrippe.belegungIntegrationsplaetzeKinderkrippe"
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
        />
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";

interface Props {
  isEditable: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });
const kinderkrippe = defineModel<KinderkrippeModel>({ required: true });
</script>

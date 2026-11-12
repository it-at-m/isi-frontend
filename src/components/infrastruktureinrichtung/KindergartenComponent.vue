<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_kindergarten_gesamtplaetze_nach_be"
            v-model="kindergarten.gesamtplaetzeNachBE"
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
            id="infrastruktureinrichtung_kindergarten_kindergartenplaetze_nach_be"
            v-model="kindergarten.kindergartenplaetzeNachBE"
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
            v-model="kindergarten.sollBelegungKindergartenplaetzeKePlus"
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
            v-model="kindergarten.sollBelegungKindergartenplaetze"
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
            v-model="kindergarten.belegungKindergartenplaetze"
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
            v-model="kindergarten.ueberregionaleKindergartenplaetze"
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
            v-model="kindergarten.integrationsplaetzeKindergartenKePlus"
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
            v-model="kindergarten.integrationsplaetzeKindergarten"
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
            v-model="kindergarten.belegungIntegrationsplaetzeKindergarten"
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
        />
      </v-row>
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";

interface Props {
  isEditable: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false });
const kindergarten = defineModel<KindergartenModel>({ required: true });
</script>

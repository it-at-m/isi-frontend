<template>
  <field-group-card :card-title="geplanteAnzahlWohneinheitenTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="we_gesamt_field"
          ref="weGesamtField"
          v-model="abfragevariante.weGesamt"
          :disabled="!isEditable"
          class="mx-3"
          label="Gesamt"
          integer
        />
      </v-col>
      <!-- Space für Platzhalter -->
      <v-col
        cols="12"
        md="8"
      >
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-checkbox
          id="we_sonderwohnformen_checkbox"
          ref="weSonderwohnformenCheckbox"
          v-model="abfragevariante.weSonderwohnformen"
          :disabled="!isEditable"
          class="mx-3"
          label="Sonderwohnformen"
          color="primary"
        />
      </v-col>
      <!-- Space für Platzhalter -->
      <v-col
        cols="12"
        md="8"
      >
      </v-col>
    </v-row>
    <v-expand-transition>
      <div>
        <v-row
          v-if="abfragevariante.weSonderwohnformen"
          justify="center"
        >
          <v-col
            cols="12"
            md="2"
          />
          <v-col
            cols="12"
            md="2"
          >
            <span>davon</span>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="we_studentenwohnungen_field"
              ref="weStudentenwohnungenField"
              v-model="abfragevariante.weStudentischesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Studierendenwohnungen"
              integer
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="we_seniorInnen_wohnungen_field"
              ref="weSeniorInnenWohnungenField"
              v-model="abfragevariante.weSeniorinnenWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Senior*innenwohnungen"
              integer
            />
          </v-col>
        </v-row>
        <v-row
          v-if="abfragevariante.weSonderwohnformen"
          justify="center"
        >
          <v-col
            cols="12"
            md="4"
          />
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="we_genossenschaftswohnungen_field"
              ref="weGenossenschaftswohnungenField"
              v-model="abfragevariante.weGenossenschaftlichesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Genossenschaftswohnungen"
              integer
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="we_nicht_infrastruktur_relevante_wohnungen_field"
              ref="weNichtInfrastrukturRelevanteWohnungenField"
              v-model="abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen"
              :disabled="!isEditable"
              class="mx-3"
              label="Weitere nicht-infrastrukturrelevante Wohnungen"
              integer
            />
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
    <v-textarea
      id="we_anmerkung"
      v-model="abfragevariante.weAnmerkung"
      :disabled="!isEditable"
      label="Anmerkungen"
      variant="underlined"
      auto-grow
      rows="1"
      maxlength="200"
      @update:model-value="formChanged"
    >
    </v-textarea>
  </field-group-card>
</template>

<script setup lang="ts">
import { watch } from "vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();

const abfragevariante = defineModel<AbfragevarianteBauleitplanverfahrenModel>({ required: true });

const geplanteAnzahlWohneinheitenTitle = "Geplante Anzahl Wohneinheiten";

withDefaults(defineProps<Props>(), { isEditable: false });

watch(() => abfragevariante, clearSonderwohnformData, { immediate: true, deep: true });

function clearSonderwohnformData(): void {
  if (!abfragevariante.value.weSonderwohnformen) {
    abfragevariante.value.weStudentischesWohnen = undefined;
    abfragevariante.value.weSeniorinnenWohnen = undefined;
    abfragevariante.value.weGenossenschaftlichesWohnen = undefined;
    abfragevariante.value.weWeiteresNichtInfrastrukturrelevantesWohnen = undefined;
  }
}
</script>

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
          :readonly="!isEditable"
          class="mx-3"
          label="Gesamt"
          integer
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="we_baurechtlich_genehmigt_field"
          ref="weBaurechtlichGenehmigtField"
          v-model="abfragevariante.weBaurechtlichGenehmigt"
          :readonly="!isEditable"
          class="mx-3"
          label="Baurechtlich genehmigt"
          integer
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="we_baurechtlich_festgesetzt_field"
          ref="weBaurechtlichFestgesetztField"
          v-model="abfragevariante.weBaurechtlichFestgesetzt"
          :readonly="!isEditable"
          class="mx-3"
          label="Baurechtlich festgesetzt"
          integer
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <div class="d-flex align-center">
          <v-checkbox
            id="we_sonderwohnformen_checkbox"
            ref="weSonderwohnformenCheckbox"
            v-model="abfragevariante.weSonderwohnformen"
            :disabled="!isEditable"
            class="mx-3"
            color="primary"
            label="Zusätzlich Sonderwohnformen"
            hide-details
          />
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                @click.stop.prevent
                class="ml-4"
                :color="isEditable ? 'primary' : 'grey-lighten-1'"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
            <div v-html="helpTextSonderwohnform"></div>
          </v-tooltip>
        </div>
      </v-col>
      <!-- Space für Platzhalter -->
      <v-col
        cols="12"
        md="8"
      />
    </v-row>
    <v-expand-transition>
      <div>
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
              id="we_studentenwohnungen_field"
              ref="weStudentenwohnungenField"
              v-model="abfragevariante.weStudentischesWohnen"
              :readonly="!isEditable"
              class="mx-3"
              label="Studierendenwohnungen"
              integer
              :class="isEditable ? '' : 'text-grey-lighten-1'"
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
              :readonly="!isEditable"
              class="mx-3"
              label="Senior*innenwohnungen"
              integer
              :class="isEditable ? '' : 'text-grey-lighten-1'"
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
            md="8"
          >
            <num-field
              id="we_nicht_infrastruktur_relevante_wohnungen_field"
              ref="weNichtInfrastrukturRelevanteWohnungenField"
              v-model="abfragevariante.weWeiteresNichtInfrastrukturrelevantesWohnen"
              :readonly="!isEditable"
              class="mx-3"
              label="Weitere nicht-infrastrukturrelevante Wohnungen"
              integer
              :class="isEditable ? '' : 'text-grey-lighten-1'"
            />
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
    <v-textarea
      id="we_anmerkung"
      v-model="abfragevariante.weAnmerkung"
      :readonly="!isEditable"
      label="Anmerkungen"
      variant="underlined"
      auto-grow
      rows="1"
      maxlength="200"
      @update:model-value="formChanged"
      :class="isEditable ? '' : 'text-grey-lighten-1'"
    >
    </v-textarea>
  </field-group-card>
</template>

<script setup lang="ts">
import { watch } from "vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import { useSaveLeave } from "@/composables/SaveLeave";
import { helpTextSonderwohnform } from "@/utils/AbfragevarianteUtil";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();

const abfragevariante = defineModel<AbfragevarianteWeiteresVerfahrenModel>({ required: true });

const geplanteAnzahlWohneinheitenTitle = "Geplante Anzahl Wohneinheiten";

withDefaults(defineProps<Props>(), { isEditable: false });

watch(() => abfragevariante, clearSonderwohnformData, { immediate: true, deep: true });

function clearSonderwohnformData(): void {
  if (!abfragevariante.value.weSonderwohnformen) {
    abfragevariante.value.weStudentischesWohnen = undefined;
    abfragevariante.value.weSeniorinnenWohnen = undefined;
    abfragevariante.value.weWeiteresNichtInfrastrukturrelevantesWohnen = undefined;
  }
}
</script>

<template>
  <field-group-card :card-title="geplanteGeschossflaecheWohnenTitle">
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-row class="align-center">
          <v-col>
            <div
              :class="isEditable ? '' : 'text-grey-lighten-1'"
              class="d-flex align-center"
            >
              <num-field
                id="gf_wohnen_gesamt_field"
                ref="gfWohnenGesamtField"
                v-model="abfragevariante.gfWohnenGesamt"
                :readonly="!isEditable"
                class="mx-3"
                label="Gesamt"
                :suffix="SQUARE_METER"
              />
              <v-tooltip location="top">
                <template #activator="{ props }">
                  <v-icon v-bind="props"> mdi-help-circle-outline </v-icon>
                </template>
                <div v-html="helpTextGesamtflaecheWohnen"></div>
              </v-tooltip>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <!-- Space für Platzhalter -->
      <v-col
        cols="12"
        md="8"
      />
    </v-row>
    <v-row justify="center">
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
          id="gf_wohnen_baurechtlich_genehmigt_field"
          ref="gfWohnenBaurechtlichGenehmigtField"
          v-model="abfragevariante.gfWohnenBaurechtlichGenehmigt"
          :readonly="!isEditable"
          class="mx-3"
          label="Baurechtlich genehmigt"
          :suffix="SQUARE_METER"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_baurechtlich_festgesetzt_field"
          ref="gfWohnenBaurechtlichFestgesetztField"
          v-model="abfragevariante.gfWohnenBaurechtlichFestgesetzt"
          :readonly="!isEditable"
          class="mx-3"
          label="Baurechtlich festgesetzt"
          :suffix="SQUARE_METER"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <!-- Space für Platzhalter -->
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <num-field
          id="gf_wohnen_bestandswohnbaurecht_field"
          ref="gfWohnenBestandswohnbaurechtField"
          v-model="abfragevariante.gfWohnenBestandswohnbaurecht"
          :readonly="!isEditable"
          class="mx-3"
          label="Bestandswohnbaurecht"
          :suffix="SQUARE_METER"
          :class="isEditable ? '' : 'text-grey-lighten-1'"
          :help="helpTextBestandwohnbaurecht"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <!-- Space für Platzhalter -->
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <div class="d-flex align-center">
          <v-checkbox
            id="gf_sonderwohnformen_checkbox"
            ref="gfSonderwohnformenCheckbox"
            v-model="abfragevariante.gfWohnenSonderwohnformen"
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
                :color="isEditable ? '' : 'grey-lighten-1'"
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
          v-if="abfragevariante.gfWohnenSonderwohnformen"
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
              id="gf_studentisches_wohnen_field"
              ref="gfStudentischesWohnenField"
              v-model="abfragevariante.gfWohnenStudentischesWohnen"
              :readonly="!isEditable"
              class="mx-3"
              label="Studentisches Wohnen"
              :suffix="SQUARE_METER"
              :class="isEditable ? '' : 'text-grey-lighten-1'"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              id="gf_seniorInnen_wohnen_field"
              ref="gfSeniorInnenWohnenField"
              v-model="abfragevariante.gfWohnenSeniorinnenWohnen"
              :readonly="!isEditable"
              class="mx-3"
              label="Senior*innenwohnen"
              :suffix="SQUARE_METER"
              :class="isEditable ? '' : 'text-grey-lighten-1'"
            />
          </v-col>
        </v-row>
        <v-row
          v-if="abfragevariante.gfWohnenSonderwohnformen"
          justify="center"
        >
          <v-col
            cols="12"
            md="4"
          >
            <!-- Space für Platzhalter -->
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <num-field
              id="gf_nicht_infrastruktur_relevantes_wohnen_field"
              ref="gfNichtInfrastrukturRelevantesWohnenField"
              v-model="abfragevariante.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen"
              :readonly="!isEditable"
              class="mx-3"
              label="Weiteres nicht-infrastrukturrelevantes Wohnen"
              :suffix="SQUARE_METER"
              :class="isEditable ? '' : 'text-grey-lighten-1'"
            />
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
    <v-textarea
      id="gf_wohnen_anmerkung"
      v-model="abfragevariante.gfAnmerkung"
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
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";
import { useSaveLeave } from "@/composables/SaveLeave";
import {
  helpTextBestandwohnbaurecht,
  helpTextGesamtflaecheWohnen,
  helpTextSonderwohnform,
} from "@/utils/AbfragevarianteUtil";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();

const abfragevariante = defineModel<AbfragevarianteBaugenehmigungsverfahrenModel>({ required: true });

const geplanteGeschossflaecheWohnenTitle = "Geplante Geschossfläche Wohnen";

withDefaults(defineProps<Props>(), { isEditable: false });

watch(() => abfragevariante, clearSonderwohnformData, { immediate: true, deep: true });

function clearSonderwohnformData(): void {
  if (!abfragevariante.value.gfWohnenSonderwohnformen) {
    abfragevariante.value.gfWohnenStudentischesWohnen = undefined;
    abfragevariante.value.gfWohnenSeniorinnenWohnen = undefined;
    abfragevariante.value.gfWohnenWeiteresNichtInfrastrukturrelevantesWohnen = undefined;
  }
}
</script>

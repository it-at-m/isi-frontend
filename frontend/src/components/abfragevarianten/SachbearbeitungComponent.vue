<template>
  <div>
    <field-group-card :card-title="weitereBerechnungsgrundlagenTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-select
              id="sobon_orientierungswert_jahr_dropdown"
              ref="sobonOrientierungswertJahrDropdown"
              v-model="abfragevarianteSachbearbeitung.sobonOrientierungswertJahr"
              :disabled="!isEditableBySachbearbeitung()"
              :items="sobonOrientierungswertJahrList"
              item-value="key"
              item-text="value"
              :rules="sobonOrientierungswertJahrValidator"
              @change="formChanged"
            >
              <template #label> Jahr für SoBoN-Orientierungwerte <span class="secondary--text">*</span> </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
            id="stammdaten_gueltig_ab"
            ref="stammdatenGueltigAb"
            v-model="abfragevarianteSachbearbeitung.stammdatenGueltigAb"
            :disabled="!isEditableBySachbearbeitung()"
            label="Stammdatum gültig ab"
            :rules="[pflichtfeld]"
            required
          />
        </v-col>
      </v-row>
      <sobon-berechnung v-model="abfragevarianteSachbearbeitung.sobonBerechnung"></sobon-berechnung>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-textarea
            id="abfragevarianteSachbearbeitung_anmerkung"
            v-model="abfragevarianteSachbearbeitung.anmerkung"
            :disabled="!isEditableBySachbearbeitung()"
            label="Anmerkungen"
            auto-grow
            rows="1"
            maxlength="1000"
            @input="formChanged"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <reports-planungsursaechlichkeit-component v-model="abfragevarianteSachbearbeitung" />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <reports-sobonursaechlichkeit-component
            v-if="showSobonReport()"
            v-model="abfragevarianteSachbearbeitung"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="bauratenDateiInputTitle">
      <bauratendatei-input
        v-model="abfragevarianteSachbearbeitung"
        :is-editable="isEditableBySachbearbeitung()"
      />
      <dokumente
        id="dokumente_component"
        ref="dokumenteComponent"
        v-model="abfragevarianteSachbearbeitung.dokumente"
        :name-root-folder="nameRootFolder"
        :is-dokumente-editable="isEditableBySachbearbeitung()"
        @change="formChanged"
      />
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import {
  AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum,
  UncertainBoolean,
} from "@/api/api-client/isi-backend";
import BauratendateiInput from "@/components/abfragevarianten/BauratendateiInput.vue";
import {
  default as ReportsPlanungsursaechlichkeitComponent,
  default as ReportsSobonursaechlichkeitComponent,
} from "@/components/abfragevarianten/ReportsPlanungsursaechlichkeitComponent.vue";
import SobonBerechnung from "@/components/abfragevarianten/SobonBerechnung.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import { useAbfrageSecurity } from "@/composables/security/AbfrageSecurity";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import { useLookupStore } from "@/stores/LookupStore";
import { useSearchStore } from "@/stores/SearchStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { pflichtfeld } from "@/utils/FieldValidationRules";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import { defineModel } from "@/utils/Vue";
import _ from "lodash";

interface Props {
  value: AbfragevarianteBauleitplanverfahrenModel;
  isEditable?: boolean;
}

interface Emits {
  (event: "input", value: AbfragevarianteBauleitplanverfahrenModel): void;
}
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const abfragevarianteSachbearbeitung = defineModel(props, emit);

const weitereBerechnungsgrundlagenTitle = "Weitere Berechnungsgrundlagen";

const nameRootFolder = "schuelerpotentialprognose";

const bauratenDateiInputTitle = "Bauratendatei und Schülerpotentialprognose";

const lookupStore = useLookupStore();

const searchStore = useSearchStore();

const { formChanged } = useSaveLeave();

const { isEditableBySachbearbeitung } = useAbfrageSecurity();

const sobonOrientierungswertJahrList = computed(() => {
  if (
    abfragevarianteSachbearbeitung.value.artAbfragevariante ===
    AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren
  ) {
    return lookupStore.sobonOrientierungswertJahr;
  } else {
    return lookupStore.sobonOrientierungswertJahrWithoutStandortabfrage;
  }
});

const sobonOrientierungswertJahrValidator = computed(() => {
  if (isEditableBySachbearbeitung()) {
    const usedRules: unknown[] = [];
    // Objekte der benötigten Rules anlegen, um daraus eine Liste von Rules anlegen zu können
    const rules = new FieldValidationRulesMixin().fieldValidationRules as {
      notUnspecified: (v: string) => boolean | string;
      pflichtfeld: (v: string) => boolean | string;
    };
    usedRules.push(rules.notUnspecified);
    usedRules.push(rules.pflichtfeld);
    return usedRules;
  }
  return [];
});

/**
 * Überprüfung ob alle Kriterien stimmen um die Sobon Report anzuzeigen.
 */
function showSobonReport(): boolean {
  const abfrage = searchStore.selectedAbfrage as BauleitplanverfahrenModel | WeiteresVerfahrenModel;
  return (
    (abfragevarianteSachbearbeitung.value.artAbfragevariante ===
      AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren ||
      abfragevarianteSachbearbeitung.value.artAbfragevariante ===
        AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren) &&
    !_.isNil(abfragevarianteSachbearbeitung.value.sobonBerechnung) &&
    abfrage.sobonRelevant === UncertainBoolean.True &&
    (abfragevarianteSachbearbeitung.value.sobonBerechnung.isASobonBerechnung as boolean) &&
    !_.isNil(abfragevarianteSachbearbeitung.value.sobonBerechnung?.sobonFoerdermix) &&
    !_.isNil(abfragevarianteSachbearbeitung.value.sobonBerechnung?.sobonFoerdermix?.bezeichnungJahr) &&
    !_.isNil(abfragevarianteSachbearbeitung.value.sobonBerechnung?.sobonFoerdermix?.bezeichnung) &&
    !_.isNil(abfragevarianteSachbearbeitung.value.sobonBerechnung?.sobonFoerdermix?.foerderarten) &&
    !_.isNil(abfragevarianteSachbearbeitung.value.gfWohnenSobonUrsaechlich)
  );
}
</script>

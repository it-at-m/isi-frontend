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
              variant="underlined"
              :disabled="!isEditableBySachbearbeitung"
              :items="sobonOrientierungswertJahrList"
              item-value="key"
              item-title="value"
              :rules="sobonOrientierungswertJahrValidator"
              @update:model-value="formChanged"
            >
              <template #label> Jahr für SoBoN-Orientierungwerte <span class="text-secondary">*</span> </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
        <!-- Das Datum wird in ISI 2.0 relevant werden
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
            id="stammdaten_gueltig_ab"
            ref="stammdatenGueltigAb"
            v-model="abfragevarianteSachbearbeitung.stammdatenGueltigAb"
            :disabled="!isEditableBySachbearbeitung"
            label="Stammdatum gültig ab"
            :rules="[pflichtfeld]"
            required
          />
        </v-col>
        -->
      </v-row>
      <sobon-berechnung
        v-if="isBauleitplanverfahrenOrWeiteresVerfahren"
        v-model="abfragevarianteSachbearbeitung.sobonBerechnung"
      ></sobon-berechnung>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-textarea
            id="abfragevarianteSachbearbeitung_anmerkung"
            v-model="abfragevarianteSachbearbeitung.anmerkung"
            :disabled="!isEditableBySachbearbeitung"
            label="Anmerkungen"
            variant="underlined"
            auto-grow
            rows="1"
            maxlength="1000"
            @update:model-value="formChanged"
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
        :is-editable="isEditableBySachbearbeitung"
      />
      <dokumente
        v-if="componentSercurity.areDokumenteVisible(Context.ABFRAGEVARIANTE_SACHBEARBEITUNG)"
        id="dokumente_component"
        ref="dokumenteComponent"
        v-model="abfragevarianteSachbearbeitung.dokumente"
        :name-root-folder="nameRootFolder"
        :is-dokumente-editable="isEditableBySachbearbeitung"
        @change="formChanged"
      />
    </field-group-card>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
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
import { useLookupStore } from "@/stores/LookupStore";
import { useSearchStore } from "@/stores/SearchStore";
import { useSaveLeave } from "@/composables/SaveLeave";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import _ from "lodash";
import type { VSelect } from "vuetify/components";
import { useComponentSecurity } from "@/composables/security/ComponentSecurity";
import { Context } from "@/utils/Context";

// Workaround um den Validation Rule Type zu bekommen
// https://stackoverflow.com/questions/77201639/how-to-import-typescript-types-in-vuetify-3
type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
type ValidationRule = UnwrapReadonlyArray<VSelect["rules"]>;

interface Props {
  isEditable?: boolean;
}

const abfragevarianteSachbearbeitung = defineModel<AbfragevarianteBauleitplanverfahrenModel>({ required: true });

const weitereBerechnungsgrundlagenTitle = "Weitere Berechnungsgrundlagen";

const nameRootFolder = "schuelerpotentialprognose";

const bauratenDateiInputTitle = "Bauratendatei und Schülerpotentialprognose";

const lookupStore = useLookupStore();

const searchStore = useSearchStore();

const componentSercurity = useComponentSecurity();

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
  if (isEditableBySachbearbeitung.value) {
    const usedRules: ValidationRule[] = [];
    // Objekte der benötigten Rules anlegen, um daraus eine Liste von Rules anlegen zu können
    usedRules.push(notUnspecified);
    usedRules.push(pflichtfeld);
    return usedRules;
  }
  return [];
});

const isBauleitplanverfahrenOrWeiteresVerfahren = computed(() => {
  return (
    abfragevarianteSachbearbeitung.value?.artAbfragevariante ===
      AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren ||
    abfragevarianteSachbearbeitung.value?.artAbfragevariante ===
      AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren
  );
});

withDefaults(defineProps<Props>(), { isEditable: false });

watch(
  () => abfragevarianteSachbearbeitung.value.stammdatenGueltigAb,
  () => {
    if (
      _.isNil(abfragevarianteSachbearbeitung.value.stammdatenGueltigAb) ||
      abfragevarianteSachbearbeitung.value.stammdatenGueltigAb.getTime() === 0
    ) {
      abfragevarianteSachbearbeitung.value.stammdatenGueltigAb = new Date();
    }
  },
  { immediate: true },
);

/**
 * Überprüfung ob alle Kriterien stimmen um die Sobon Report anzuzeigen.
 */
function showSobonReport(): boolean {
  const abfrage = searchStore.selectedAbfrage as BauleitplanverfahrenModel | WeiteresVerfahrenModel;
  return (
    isBauleitplanverfahrenOrWeiteresVerfahren.value &&
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

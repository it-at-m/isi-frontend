<template>
  <v-container>
    <field-group-card>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="name_field"
            ref="nameField"
            v-model.trim="abfragevariante.name"
            :disabled="!isEditable"
            :rules="[pflichtfeld]"
            maxlength="30"
            validate-on="blur"
            @update:model-value="formChanged"
          >
            <template #label> Name der Abfragevariante <span class="text-secondary">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
            id="satzungsbeschluss_datepicker"
            ref="satzungsbeschlussDatePicker"
            v-model="abfragevariante.satzungsbeschluss"
            :disabled="!isEditable"
            label="Datum Satzungsbeschluss"
            month-picker
            @blur="datumSatzungsbeschlussChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-autocomplete
            id="wesentliche_rechtsgrundlage_dropdown"
            ref="wesentlicheRechtsgrundlageDropdown"
            v-model="abfragevariante.wesentlicheRechtsgrundlage"
            :items="wesentlicheRechtsgrundlageBauleitplanverfahrenList"
            item-value="key"
            item-title="value"
            multiple
            chips
            :rules="[pflichtfeldMehrfachauswahl, notUnspecified]"
            :disabled="!isEditable"
            @update:model-value="formChanged"
          >
            <template #label>
              Wesentliche Rechtsgrundlage
              <span class="text-secondary">*</span>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-text-field
              v-if="wesentlicheRechtsgrundlageFreieEingabeVisible"
              id="wesentliche_rechtsgrundlage_freie_eingabe_field"
              ref="wesentlicheRechtsgrundlageFreieEingabeField"
              v-model="abfragevariante.wesentlicheRechtsgrundlageFreieEingabe"
              :disabled="!isEditable"
              label="Freie Eingabe"
              maxlength="1000"
              @update:model-value="formChanged"
            />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungvon"
            v-model="abfragevariante.realisierungVon"
            :disabled="!isEditable"
            label="Realisierung von (JJJJ)"
            year
            maxlength="4"
            required
            help="Erfolgt bei Datum Satzungsbeschluss eine Eingabe, wird das Datum 'Realisierung von' neu berechnet. 'Realisierung von' kann jedoch weiterhin geändert werden."
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevariante_realisierungBis"
            v-model="calcRealisierungBis"
            :disabled="true"
            label="Realisierung bis (JJJJ)"
            year
            maxlength="4"
            help="Nach Angabe bzw. Berechnung der Bauraten wird das Feld automatisch befüllt."
          />
        </v-col>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum } from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import { notUnspecified, pflichtfeld, pflichtfeldMehrfachauswahl } from "@/utils/FieldValidationRules";
import _ from "lodash";

interface Props {
  isEditable?: boolean;
}

const abfragevariante = defineModel<AbfragevarianteBauleitplanverfahrenModel>({ required: true });

const wesentlicheRechtsgrundlageFreieEingabeVisible = ref<boolean | null>();

const lookupStore = useLookupStore();

const { formChanged } = useSaveLeave();

const wesentlicheRechtsgrundlageBauleitplanverfahrenList = computed(
  () => lookupStore.wesentlicheRechtsgrundlageBauleitplanverfahren,
);

const calcRealisierungBis = computed(() => {
  const jahre: Array<number> | undefined = abfragevariante.value.bauabschnitte
    ?.flatMap((bauabschnitt) => bauabschnitt.baugebiete)
    .flatMap((baugebiet) => baugebiet.bauraten)
    .map((baurate) => baurate.jahr);
  return _.max(jahre);
});

function datumSatzungsbeschlussChanged(datumSatzungsbeschluss: Date): void {
  if (!_.isNil(datumSatzungsbeschluss)) {
    abfragevariante.value.realisierungVon =
      datumSatzungsbeschluss.getMonth() + 1 < 7
        ? datumSatzungsbeschluss.getFullYear() + 3
        : datumSatzungsbeschluss.getFullYear() + 4;
  }
}

withDefaults(defineProps<Props>(), { isEditable: false });

watch(() => abfragevariante.value.wesentlicheRechtsgrundlage, wesentlicheRechtsgrundlageChanged, { immediate: true });

function wesentlicheRechtsgrundlageChanged(): void {
  if (
    abfragevariante.value.wesentlicheRechtsgrundlage?.includes(
      AbfragevarianteBauleitplanverfahrenDtoWesentlicheRechtsgrundlageEnum.FreieEingabe,
    )
  ) {
    wesentlicheRechtsgrundlageFreieEingabeVisible.value = true;
  } else {
    abfragevariante.value.wesentlicheRechtsgrundlageFreieEingabe = undefined;
    wesentlicheRechtsgrundlageFreieEingabeVisible.value = false;
  }
}
</script>

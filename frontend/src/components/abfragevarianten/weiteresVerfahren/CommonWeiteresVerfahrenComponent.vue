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
            validate-on-blur
            @input="formChanged"
          >
            <template #label> Name der Abfragevariante <span class="secondary--text">*</span> </template>
          </v-text-field>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="12"
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
            :items="wesentlicheRechtsgrundlageList"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[pflichtfeldMehrfachauswahl, notUnspecified]"
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label>
              Wesentliche Rechtsgrundlage
              <span class="secondary--text">*</span>
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
              @input="formChanged"
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
import { AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum } from "@/api/api-client/isi-backend";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import { notUnspecified, pflichtfeld, pflichtfeldMehrfachauswahl } from "@/utils/FieldValidationRules";
import { defineModel } from "@/utils/Vue";
import _ from "lodash";

interface Props {
  value: AbfragevarianteWeiteresVerfahrenModel;
  isEditable: false;
}

interface Emits {
  (event: "input", value: AbfragevarianteWeiteresVerfahrenModel): void;
}
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const abfragevariante = defineModel(props, emit);

let wesentlicheRechtsgrundlageFreieEingabeVisible = ref<boolean | null>();

const lookupStore = useLookupStore();

const { formChanged } = useSaveLeave();

const wesentlicheRechtsgrundlageList = computed(() => lookupStore.wesentlicheRechtsgrundlage);

const calcRealisierungBis = computed(() => {
  let jahre: Array<number> | undefined = abfragevariante.value.bauabschnitte
    ?.flatMap((bauabschnitt) => bauabschnitt.baugebiete)
    .flatMap((baugebiet) => baugebiet.bauraten)
    .map((baurate) => baurate.jahr);
  return _.max(jahre);
});

watch(() => abfragevariante.value.wesentlicheRechtsgrundlage, wesentlicheRechtsgrundlageChanged, { immediate: true });

function wesentlicheRechtsgrundlageChanged(): void {
  if (
    abfragevariante.value.wesentlicheRechtsgrundlage?.includes(
      AbfragevarianteWeiteresVerfahrenDtoWesentlicheRechtsgrundlageEnum.FreieEingabe,
    )
  ) {
    wesentlicheRechtsgrundlageFreieEingabeVisible.value = true;
  } else {
    abfragevariante.value.wesentlicheRechtsgrundlageFreieEingabe = undefined;
    wesentlicheRechtsgrundlageFreieEingabeVisible.value = false;
  }
}
</script>

<style></style>

<template>
  <v-dialog
    :model-value="showBedarfsmeldungDialog"
    persistent
    width="60%"
  >
    <v-form ref="bedarfsmeldungDialogForm">
      <v-card class="overflow-x-hidden">
        <v-card-title class="align-stretch">Bedarfsmeldung</v-card-title>
        <v-row justify="center">
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_einrichtungen"
              v-model="bedarfsmeldung.anzahlEinrichtungen"
              class="mx-3"
              label="Anzahl der Einrichtungen einer Größe"
              integer
              required
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              id="bedarfsmeldung_infrastruktureinrichtung_typ"
              v-model="bedarfsmeldung.infrastruktureinrichtungTyp"
              class="mx-3"
              :items="infrastruktureinrichtungenTypList"
              item-value="key"
              item-title="value"
              variant="underlined"
              :rules="[pflichtfeld, notUnspecified]"
              @update:model-value="formChanged"
            >
              <template #label> Infrastruktureinrichtung Typ <span class="text-secondary">*</span> </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_anzahlKinderkrippengruppen"
              v-model="bedarfsmeldung.anzahlKinderkrippengruppen"
              class="mx-3"
              label="Anzahl der Kinderkrippengruppen"
              integer
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_anzahlKindergartengruppen"
              v-model="bedarfsmeldung.anzahlKindergartengruppen"
              class="mx-3"
              label="Anzahl der Kindergartengruppen"
              integer
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_anzahlHortgruppen"
              v-model="bedarfsmeldung.anzahlHortgruppen"
              class="mx-3"
              label="Anzahl der Hortgruppen"
              integer
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <num-field
              id="bedarfsmeldung_anzahl_anzahlGrundschulzuege"
              v-model="bedarfsmeldung.anzahlGrundschulzuege"
              class="mx-3"
              label="Anzahl der Grundschulzüge"
              integer
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            id="bedarfsmeldung_abbrechen_button"
            color="secondary"
            block
            style="width: 200px"
            @click="abbrechenBedarfsmeldung"
          >
            Abbrechen
          </v-btn>
          <v-btn
            id="bedarfsmeldung_uebernehmen_button"
            color="primary"
            block
            style="width: 200px"
            @click="uebernehmenBedarfsmeldung"
          >
            Übernehmen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { VForm } from "vuetify/components";
import { useToast } from "vue-toastification";
import { useLookupStore } from "@/stores/LookupStore";
import BedarfsmeldungModel from "@/types/model/abfragevariante/BedarfsmeldungModel";
import { findFaultInBedarfsmeldung } from "@/utils/Validators";
import _ from "lodash";
import { useSaveLeave } from "@/composables/SaveLeave";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import NumField from "@/components/common/NumField.vue";

interface Props {
  showBedarfsmeldungDialog?: boolean;
}

interface Emits {
  (event: "uebernehmen-bedarfsmeldung", value: BedarfsmeldungModel): void;
  (event: "abbrechen-bedarfsmeldung"): void;
}

const props = withDefaults(defineProps<Props>(), { showBedarfsmeldungDialog: false });
const emit = defineEmits<Emits>();
const bedarfsmeldung = defineModel<BedarfsmeldungModel>({ required: true });
const { formChanged } = useSaveLeave();
const lookupStore = useLookupStore();
const toast = useToast();

const infrastruktureinrichtungenTypList = computed(() => lookupStore.infrastruktureinrichtungTyp);
const bedarfsmeldungDialogForm = ref<VForm | null>(null);

watch(() => props.showBedarfsmeldungDialog, resetValidation);

/**
 * Die Methode setzt die Validierung der Dialog-Form zurück, wenn sich der Wert von showBedarfsmeldungDialog ändert.
 * Dies verhindert, dass Validator-Fehlermeldungen schon beim Öffnen des Dialogs angezeigt werden.
 * Siehe: https://v2.vuetifyjs.com/en/components/forms/#validation-with-submit-26-clear
 */

function resetValidation(): void {
  if (!_.isNil(bedarfsmeldungDialogForm.value)) {
    bedarfsmeldungDialogForm.value.resetValidation();
  }
}

async function uebernehmenBedarfsmeldung(): Promise<void> {
  const validationMessage: string | null = findFaultInBedarfsmeldung(bedarfsmeldung.value);
  if (_.isNil(validationMessage)) {
    if (await validateDialogForm()) {
      emit("uebernehmen-bedarfsmeldung", bedarfsmeldung.value);
    } else {
      toast.error("Es gibt noch Validierungsfehler");
    }
  } else {
    toast.error(validationMessage, { timeout: false });
  }
}

async function validateDialogForm(): Promise<boolean> {
  return !_.isNil(bedarfsmeldungDialogForm.value) ? (await bedarfsmeldungDialogForm.value.validate()).valid : false;
}

function abbrechenBedarfsmeldung(): void {
  emit("abbrechen-bedarfsmeldung");
}
</script>

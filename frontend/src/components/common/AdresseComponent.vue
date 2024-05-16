<template>
  <field-group-card
    card-title="Adressinformationen"
    :mark-card-title-as-required="true"
  >
    <div>
      <v-row justify="center">
        <v-col cols="11">
          <v-autocomplete
            id="adresse_suchen_dropdown"
            ref="adresseSuchenDropdown"
            v-model="selected"
            v-model:search="searchQuery"
            :disabled="!isEditable"
            :items="searchResults"
            :loading="loading"
            density="compact"
            clearable
            color="black"
            no-filter
            hide-no-data
            append-icon=""
            item-title="adresse"
            item-value="adressId"
            label="Adress-Suche"
            return-object
            placeholder="Suchtext mit Adressteilen"
            prepend-inner-icon="mdi-magnify"
            :rules="[adressSucheValidationRule]"
            validate-on="blur"
          />
        </v-col>
        <v-col cols="1">
          <v-tooltip location="bottom">
            <template #activator="{ props: activatorProps }">
              <v-btn
                id="adresse_loeschen_button"
                ref="adresseLoeschenButton"
                :disabled="!isEditable"
                icon
                v-bind="activatorProps"
                @click="resetAdresse"
              >
                <v-icon> mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>ausgewählte Adresse und ergänzende Information löschen</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </div>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          id="strasse_field"
          ref="strasseField"
          v-model="adresse.strasse"
          label="Straße"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          id="hausnummer_field"
          ref="hausnummerField"
          v-model="adresse.hausnummer"
          :rules="[hausnummer]"
          label="Hausnummer"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          id="postleitzahl_field"
          ref="postleitzahlField"
          v-model="adresse.plz"
          label="Postleitzahl"
          :rules="[digits, min5]"
          disabled
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          id="ort_field"
          ref="ortField"
          v-model="adresse.ort"
          label="Ort"
          disabled
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          id="angabe_lage_ergaenzende_adressinformation_field"
          ref="angabeLageErgaenzendeAdressinformationField"
          v-model="adresse.angabeLageErgaenzendeAdressinformation"
          :disabled="!isEditable"
          label="Angabe zur Lage und ergänzende Adressinformationen"
          maxlength="255"
          :rules="[angabeLageErgaenzendeAdressinformationValidationRule]"
          validate-on="blur"
          @update:model-value="formChanged"
        />
      </v-col>
    </v-row>
  </field-group-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { MuenchenAdresseDto } from "@/api/api-client/isi-master-eai";
import { hausnummer, digits, min5 } from "@/utils/FieldValidationRules";
import AdresseModel from "@/types/model/common/AdresseModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { createAdresseDto, createAdressSucheDto, createMuenchenAdresseDto } from "@/utils/Factories";
import _ from "lodash";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useMasterEaiApi } from "@/composables/requests/eai/MasterEaiApi";

interface Props {
  isEditable?: boolean;
}

const { formChanged } = useSaveLeave();
const { getAdressen } = useMasterEaiApi();
withDefaults(defineProps<Props>(), { isEditable: false });
const adresse = defineModel<AdresseModel>({ required: true });
const loading = ref(false);
const searchQuery = ref("");
const searchResults = ref<MuenchenAdresseDto[]>([]);
const selectedSearchResult = ref(createMuenchenAdresseDto());

const selected = computed({
  get() {
    return selectedSearchResult.value;
  },
  set(value) {
    selectedSearchResult.value = value;
    assumeAdresse(selectedSearchResult.value);
  },
});

watch(searchQuery, (value) => searchForAdressenWith(value));

function assumeAdresse(dto: MuenchenAdresseDto): void {
  assignAdresse(dto);
  resetAdressSuche();
}

function assignAdresse(dto: MuenchenAdresseDto): void {
  const newAdresse = new AdresseModel(createAdresseDto());

  newAdresse.plz = _.isNil(dto.geozuordnungen) ? "" : dto.geozuordnungen.postleitzahl;
  newAdresse.ort = dto.ortsname;
  newAdresse.strasse = dto.strassenname;
  newAdresse.hausnummer = _.isNil(dto.hausnummer) ? "" : dto.hausnummer.toLocaleString("de-DE");
  if (!_.isNil(dto.buchstabe)) {
    newAdresse.hausnummer += dto.buchstabe;
  }

  const latitude = dto.position?.wgs?.lat;
  const longitude = dto.position?.wgs?.lon;
  if (latitude && longitude) {
    newAdresse.coordinate = { latitude, longitude };
  }

  adresse.value = newAdresse;
}

function resetAdresse(): void {
  adresse.value = new AdresseModel(createAdresseDto());
  formChanged();
}

function resetAdressSuche(): void {
  searchQuery.value = "";
  selectedSearchResult.value = createMuenchenAdresseDto();
  searchResults.value = [];
  formChanged();
}

function adressSucheValidationRule(): boolean | string {
  return (
    !!adresse.value.strasse ||
    !!adresse.value.angabeLageErgaenzendeAdressinformation ||
    "Pflichtfeld, wenn Angabe zur Lage leer ist"
  );
}

function angabeLageErgaenzendeAdressinformationValidationRule(): boolean | string {
  return (
    !!adresse.value.strasse ||
    !!adresse.value.angabeLageErgaenzendeAdressinformation ||
    "Pflichtfeld, wenn Adresse leer ist"
  );
}

//
// Aufruf der EAI zum Lesen der Münchner Adressen mit dem eingegebenen Suchtext mit Adressteilen
//
async function searchForAdressenWith(searchFor: string): Promise<void> {
  if (!_.isEmpty(searchFor)) {
    const adressSuche = createAdressSucheDto();
    adressSuche.query = searchFor;
    loading.value = true; // Anzeige des Cursorladekreis starten

    try {
      const dto = await getAdressen(adressSuche);
      if (!_.isNil(dto)) {
        searchResults.value = dto;
      }
    } finally {
      loading.value = false; // Anzeige des Cursorladekreises beenden
    }
  }
}
</script>

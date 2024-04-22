<template>
  <v-container>
    <field-group-card>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="bauvorhaben_standVerfahren_dropdown"
            v-model="bauvorhaben.standVerfahren"
            :items="standVerfahren"
            item-value="key"
            item-text="value"
            :rules="[pflichtfeld, notUnspecified]"
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label> Stand des Verfahrens <span class="secondary--text">*</span> </template>
          </v-select>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-text-field
              v-if="standVerfahrenFreieEingabeVisible"
              id="stand_verfahren_freie_eingabe_field"
              ref="standVerfahrenFreieEingabeField"
              v-model="bauvorhaben.standVerfahrenFreieEingabe"
              :disabled="!isEditable"
              label="Freie Eingabe für Stand des Verfahrens"
              maxlength="1000"
              @input="formChanged"
            />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="bauvorhaben_grundstuecksgroesse"
            v-model="calcGrundstuecksgroesse"
            label="Grundstücksgröße"
            :suffix="SQUARE_METER"
            :disabled="true"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_bauvorhabenNummer"
            v-model="bauvorhaben.bauvorhabenNummer"
            disabled
            label="Bauvorhabennummer"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <adresse-component
      id="bauvorhaben_adresse_component"
      :adresse-prop.sync="bauvorhaben.adresse"
      :show-in-information-list-prop="true"
      :is-editable-prop="isEditable"
    />
    <verortung
      id="verortung_component"
      v-model="bauvorhaben.verortung"
      :context="Context.BAUVORHABEN"
      :look-at="bauvorhaben.adresse"
    />
    <field-group-card card-title="Allgemeine Informationen zum Bauvorhaben">
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-autocomplete
            id="bauvorhaben_wesentliche_rechtsgrundlage_dropdown"
            v-model="bauvorhaben.wesentlicheRechtsgrundlage"
            :items="wesentlicheRechtsgrundlage"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[pflichtfeldMehrfachauswahl, notUnspecified]"
            :disabled="!isEditable"
            @change="formChanged"
          >
            <template #label> Wesentliche Rechtsgrundlage <span class="secondary--text">*</span> </template>
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
              v-model="bauvorhaben.wesentlicheRechtsgrundlageFreieEingabe"
              :disabled="!isEditable"
              label="Freie Eingabe für Wesentliche Rechtsgrundlage"
              maxlength="1000"
              @input="formChanged"
            />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            id="bauvorhaben_artFnp_dropdown"
            v-model="bauvorhaben.artFnp"
            :items="artBaulicheNutzungBauvorhaben"
            item-value="key"
            item-text="value"
            multiple
            chips
            :rules="[pflichtfeldMehrfachauswahl, notUnspecified]"
            :disabled="!isEditable"
            @input="formChanged"
          >
            <template #label>
              Art der baulichen Nutzung
              <span class="secondary--text">*</span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-slide-y-reverse-transition>
            <v-text-field
              v-if="artFnpFreieEingabeVisible"
              id="art_fnp_freie_eingabe_field"
              ref="artFnpFreieEingabeField"
              v-model="bauvorhaben.artFnpFreieEingabe"
              :disabled="!isEditable"
              label="Freie Eingabe für Art der baulichen Nutzung"
              maxlength="1000"
              @input="formChanged"
            />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_bebauungsplannummer"
            v-model="bauvorhaben.bebauungsplannummer"
            label="Bebauungsplannummer"
            maxlength="255"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            id="bauvorhaben_fisnummer"
            v-model="bauvorhaben.fisNummer"
            label="FIS-Nummer"
            maxlength="255"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            id="bauvorhaben_anmerkung"
            v-model="bauvorhaben.anmerkung"
            label="Anmerkung"
            rows="1"
            auto-grow
            maxlength="1000"
            :disabled="!isEditable"
            @input="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <dokumente
      id="bauvorhaben_dokumente_component"
      v-model="bauvorhaben.dokumente"
      :name-root-folder="nameRootFolder"
      :is-dokumente-editable="isEditable"
      @change="formChanged"
    />
    <field-group-card card-title="SoBoN">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <tri-switch
            id="bauvorhaben_sobonRelevant_triswitch"
            v-model="bauvorhaben.sobonRelevant"
            off-text="Nein"
            on-text="Ja"
            :rules="[notUnspecified]"
            :disabled="!isEditable"
          >
            <template #label> SoBoN-relevant <span class="secondary--text">*</span> </template>
          </tri-switch>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-select
              v-if="sobonJahrVisible"
              id="bauvorhaben_sobonJahr_dropdown"
              v-model="bauvorhaben.sobonJahr"
              :items="sobonVerfahrensgrundsaetzeJahr"
              item-value="key"
              item-text="value"
              :rules="[pflichtfeld]"
              :disabled="!isEditable"
              @change="formChanged"
            >
              <template #label>
                Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN <span class="secondary--text">*</span>
              </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card card-title="Zugehörige Infrastruktureinrichtungen und Abfragen">
      <referenced-items-list />
    </field-group-card>
  </v-container>
</template>

<script setup lang="ts">
import _ from "lodash";
import {
  UncertainBoolean,
  GemarkungDto,
  FlurstueckDto,
  BauvorhabenDtoWesentlicheRechtsgrundlageEnum,
  BauvorhabenDtoStandVerfahrenEnum,
  BauvorhabenDtoArtFnpEnum,
} from "@/api/api-client/isi-backend";
import { pflichtfeld, pflichtfeldMehrfachauswahl, notUnspecified } from "@/utils/FieldValidationRules";
import { SQUARE_METER } from "@/utils/FieldPrefixesSuffixes";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import BauvorhabenModel from "@/types/model/bauvorhaben/BauvorhabenModel";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import TriSwitch from "@/components/common/TriSwitch.vue";
import ReferencedItemsList from "@/components/bauvorhaben/ReferencedItemsList.vue";
import { Context } from "@/utils/Context";
import Verortung from "@/components/common/Verortung.vue";
import AdresseComponent from "@/components/common/AdresseComponent.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { defineModel } from "@/utils/Vue";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  value: BauvorhabenModel;
  isEditable?: boolean;
}

interface Emits {
  (event: "input", value: BauvorhabenModel): void;
}

const { standVerfahren, wesentlicheRechtsgrundlage, artBaulicheNutzungBauvorhaben, sobonVerfahrensgrundsaetzeJahr } =
  useLookupStore();
const { formChanged } = useSaveLeave();
const props = withDefaults(defineProps<Props>(), { isEditable: false });
const emit = defineEmits<Emits>();
const bauvorhaben = defineModel(props, emit);
const sobonJahrVisible = ref(false);
const standVerfahrenFreieEingabeVisible = ref(false);
const artFnpFreieEingabeVisible = ref(false);
const wesentlicheRechtsgrundlageFreieEingabeVisible = ref(false);
const nameRootFolder = "bauvorhaben";

const calcGrundstuecksgroesse = computed({
  get() {
    let grundstuecksgroesse = Number.NaN;

    if (bauvorhaben.value.verortung?.gemarkungen) {
      grundstuecksgroesse = 0;
      bauvorhaben.value.verortung.gemarkungen.forEach((gemarkung: GemarkungDto) => {
        gemarkung.flurstuecke.forEach((flurstueck: FlurstueckDto) => {
          if (!_.isNil(flurstueck.flaecheQm)) {
            grundstuecksgroesse += flurstueck.flaecheQm;
          }
        });
      });
    }

    bauvorhaben.value.grundstuecksgroesse = grundstuecksgroesse;
    return grundstuecksgroesse;
  },
  set() {
    // do nothing
  },
});

watch(
  () => bauvorhaben.value.sobonRelevant,
  (value) => {
    if (value === UncertainBoolean.True) {
      sobonJahrVisible.value = true;
    } else {
      sobonJahrVisible.value = false;
      bauvorhaben.value.sobonJahr = undefined;
    }
  },
  { immediate: true },
);

watch(
  () => bauvorhaben.value.wesentlicheRechtsgrundlage,
  () => {
    if (
      bauvorhaben.value.wesentlicheRechtsgrundlage?.includes(BauvorhabenDtoWesentlicheRechtsgrundlageEnum.FreieEingabe)
    ) {
      wesentlicheRechtsgrundlageFreieEingabeVisible.value = true;
    } else {
      bauvorhaben.value.wesentlicheRechtsgrundlageFreieEingabe = undefined;
      wesentlicheRechtsgrundlageFreieEingabeVisible.value = false;
    }
  },
  { immediate: true, deep: true },
);

watch(
  () => bauvorhaben.value.standVerfahren,
  () => {
    if (bauvorhaben.value.standVerfahren?.includes(BauvorhabenDtoStandVerfahrenEnum.FreieEingabe)) {
      standVerfahrenFreieEingabeVisible.value = true;
    } else {
      bauvorhaben.value.standVerfahrenFreieEingabe = undefined;
      standVerfahrenFreieEingabeVisible.value = false;
    }
  },
  { immediate: true },
);

watch(
  () => bauvorhaben.value.artFnp,
  () => {
    if (bauvorhaben.value.artFnp?.includes(BauvorhabenDtoArtFnpEnum.FreieEingabe)) {
      artFnpFreieEingabeVisible.value = true;
    } else {
      bauvorhaben.value.artFnpFreieEingabe = undefined;
      artFnpFreieEingabeVisible.value = false;
    }
  },
  { immediate: true, deep: true },
);
</script>

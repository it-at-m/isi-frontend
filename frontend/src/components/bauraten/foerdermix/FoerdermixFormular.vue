<template>
  <v-container>
    <field-group-card :card-title="anteileFMCardTitle">
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-select
            id="foerdermix_stammdaten_dropdown"
            v-model="selectedItem"
            :disabled="!isEditable"
            :items="groupedStammdaten"
            label="Fördermix"
            item-title="foerdermix.bezeichnung"
            return-object
            variant="underlined"
            @update:model-value="foerdermixSelected"
            @update:menu="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            id="foerdermix_gesamtsumme"
            v-model="gesamtsumme"
            label="Summe"
            variant="underlined"
            readonly
            :rules="[nichtGleich100Prozent(foerdermix)]"
            :suffix="PERCENT"
          />
        </v-col>
      </v-row>
      <v-row>
        <template
          v-for="(foerderart, foerderartIndex) in foerdermix.foerderarten"
          :key="foerderartIndex"
        >
          <v-col
            cols="12"
            md="4"
          >
            <num-field
              :id="'foerdermix_foerderart_' + foerderartIndex"
              :key="foerderartIndex"
              v-model="foerderart.anteilProzent"
              :disabled="!isFreieEingabe"
              :label="foerderart.bezeichnung"
              :suffix="PERCENT"
            />
          </v-col>
        </template>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import { useStammdatenStore } from "@/stores/StammdatenStore";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { addiereAnteile } from "@/utils/CalculationUtil";
import { createFoerdermixStammDto } from "@/utils/Factories";
import { mapFoerdermixStammModelToFoerderMix } from "@/utils/MapperUtil";
import _ from "lodash";
import { nichtGleich100Prozent } from "@/utils/FieldValidationRules";
import { PERCENT } from "@/utils/FieldPrefixesSuffixes";
import { useSaveLeave } from "@/composables/SaveLeave";
import { FoerdermixStammDto } from "@/api/api-client/isi-backend";

interface Props {
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false });
const foerdermix = defineModel<FoerdermixModel>({ required: true });
const anteileFMCardTitle = "Anteile Fördermix";
const freieEingabe = "Freie Eingabe";

let isFreie = false;
let stammdaten: FoerdermixStammModel[] = [];
const selectedItem = ref<FoerdermixStammModel>(createFoerdermixStammDto());
const groupedStammdaten = ref<FoerdermixStammDto[]>([]);

const stammdatenStore = useStammdatenStore();
const { formChanged } = useSaveLeave();

onMounted(() => {
  setGroupedStammdatenList();
});

watch(() => foerdermix, watchFoerdermix, { immediate: true, deep: true });

function watchFoerdermix(): void {
  stammdaten = stammdatenStore.foerdermixStammdaten;
  const stammdatumMatchingWithFoerdermix = stammdaten.find(
    (stammdatum) =>
      _.isEqual(stammdatum.foerdermix.bezeichnung, foerdermix.value.bezeichnung) &&
      _.isEqual(stammdatum.foerdermix.bezeichnungJahr, foerdermix.value.bezeichnungJahr),
  );
  if (_.isNil(stammdatumMatchingWithFoerdermix)) {
    selectedItem.value = createFoerdermixStammDto();
  } else {
    selectedItem.value = stammdatumMatchingWithFoerdermix;
  }
}

const gesamtsumme = computed(() => {
  const sum: number = addiereAnteile(foerdermix.value);
  return sum;
});

const isFreieEingabe = computed(() => {
  isFreie = selectedItem.value.foerdermix.bezeichnung === freieEingabe && props.isEditable;
  return isFreie;
});

function foerdermixSelected(item: FoerdermixStammModel): void {
  foerdermix.value = mapFoerdermixStammModelToFoerderMix(item);
}

function setGroupedStammdatenList(): void {
  stammdaten = stammdatenStore.foerdermixStammdaten;
  groupedStammdaten.value = _.sortBy(stammdaten, ["foerdermix.bezeichnungJahr"]);
  selectedItem.value.foerdermix.bezeichnung = foerdermix.value.bezeichnung;
}
</script>

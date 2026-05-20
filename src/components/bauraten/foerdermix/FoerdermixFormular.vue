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
            item-title="foerdermix.bezeichnung"
            return-object
            variant="underlined"
            @update:model-value="foerdermixSelected"
            @update:menu="formChanged"
          >
            <template #label> Fördermix<span class="text-secondary">&nbsp;*</span> </template>
          </v-select>
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
              :readonly="!isFreieEingabe"
              :label="foerderart.bezeichnung"
              :suffix="PERCENT"
              :class="isFreieEingabe ? '' : 'text-grey-lighten-1'"
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
import { FoerdermixStammdaten } from "@/types/common/FördermixStammdatenEnum";

const BGV_FOERDERMIX_WERTE = [
  "Nachverdichtung (§34 und §35 BauGB)",
  "Stadibau",
  "Werkswohnungsmodell",
  FoerdermixStammdaten.FREIE_EINGABE,
];

interface Props {
  isEditable?: boolean;
  isBaugenehmigungsverfahren?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false, isBaugenehmigungsverfahren: false });
const foerdermix = defineModel<FoerdermixModel>({ required: true });
const anteileFMCardTitle = "Anteile Fördermix";
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
  const matchedDatum = findMatchingStammdatum();
  selectedItem.value = matchedDatum || createFoerdermixStammDto();
}

function findMatchingStammdatum(): FoerdermixStammModel | undefined {
  return stammdaten.find(
    (stammdatum) =>
      stammdatum.foerdermix.bezeichnung === foerdermix.value.bezeichnung &&
      stammdatum.foerdermix.bezeichnungJahr === foerdermix.value.bezeichnungJahr,
  );
}

const gesamtsumme = computed(() => {
  return addiereAnteile(foerdermix.value);
});

const isFreieEingabe = computed(() => {
  isFreie = selectedItem.value.foerdermix.bezeichnung === FoerdermixStammdaten.FREIE_EINGABE && props.isEditable;
  return isFreie;
});

function foerdermixSelected(item: FoerdermixStammModel): void {
  foerdermix.value = mapFoerdermixStammModelToFoerderMix(item);
}

function setGroupedStammdatenList(): void {
  stammdaten = stammdatenStore.foerdermixStammdaten;
  groupedStammdaten.value = getFilteredAndSortedStammdaten();

  handleOldEntries();
}

function getFilteredAndSortedStammdaten(): FoerdermixStammDto[] {
  if (props.isBaugenehmigungsverfahren) {
    const filtered = stammdaten.filter((stammdatum) =>
      BGV_FOERDERMIX_WERTE.includes(stammdatum.foerdermix.bezeichnung ?? ""),
    );
    return _.sortBy(filtered, [(s) => BGV_FOERDERMIX_WERTE.indexOf(s.foerdermix.bezeichnung ?? "")]);
  }
  return _.sortBy(
    stammdaten.filter(
      (stammdatum) =>
        stammdatum.foerdermix.bezeichnung !== FoerdermixStammdaten.BESCHLUSS_40 &&
        stammdatum.foerdermix.bezeichnung !== FoerdermixStammdaten.BEFREIUNG_31_BAUGB,
    ),
    ["foerdermix.bezeichnungJahr"],
  );
}

function handleOldEntries(): void {
  if (isOldEntry()) {
    const matchedDatum = findMatchingStammdatum();
    selectedItem.value = matchedDatum || createFoerdermixStammDto();
  }
}

function isOldEntry(): boolean {
  if (props.isBaugenehmigungsverfahren) {
    return !BGV_FOERDERMIX_WERTE.includes(foerdermix.value.bezeichnung ?? "");
  }
  return [FoerdermixStammdaten.BESCHLUSS_40, FoerdermixStammdaten.BEFREIUNG_31_BAUGB].includes(
    foerdermix.value.bezeichnung as FoerdermixStammdaten,
  );
}
</script>

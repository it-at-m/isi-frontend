<template>
  <div id="startseiten_einstellungen">
    <v-divider class="my-2" />
    <span class="userinfo-subtitles">
      <v-icon>mdi-home-outline</v-icon>
      Startseite
    </span>
    <v-select
      id="startseiten_einstellungen_standard_filter"
      v-model="standardFilterId"
      :items="standardFilterOptionen"
      item-title="name"
      item-value="id"
      label="Standard-Filter der Übersicht"
      variant="outlined"
      density="compact"
      hide-details
      class="mt-2"
      @update:menu="onStandardFilterMenu"
    />
    <template v-if="schnellfilterOptionen">
      <v-select
        id="startseiten_einstellungen_schnellfilter"
        v-model="schnellfilter"
        :items="schnellfilterOptionen"
        label="Standard-Schnellfilter"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      />
      <v-select
        id="startseiten_einstellungen_sortierung"
        v-model="sortierung"
        :items="sortierungOptionen"
        label="Standard-Sortierung"
        variant="outlined"
        density="compact"
        hide-details
        class="mt-2"
      />
    </template>
    <v-btn
      id="startseiten_einstellungen_speichern"
      color="primary"
      variant="outlined"
      size="small"
      class="mt-2"
      :loading="saving"
      @click="speichern"
    >
      Speichern
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { StartseitenEinstellungDto } from "@/api/api-client/isi-backend";
import { useStartseitenEinstellungApi } from "@/composables/requests/startseite/StartseitenEinstellungApi";
import { useFilterPersistence } from "@/composables/requests/filter/useFilterPersistence";
import { useStandardFilter } from "@/composables/requests/filter/useStandardFilter";
import {
  type AuswahlOption,
  DEFAULT_SCHNELLFILTER,
  DEFAULT_SORTIERUNG,
  SORTIERUNG_OPTIONEN,
  getGueltigenSchnellfilter,
  getSortOrderForSortierung,
  type SchnellfilterVorgaenge,
  type SortierungVorgaenge,
} from "@/utils/StartseiteUtil";
import { useToast } from "vue-toastification";
import { useStartseitenEinstellungStore } from "@/stores/StartseitenEinstellungStore";

const emit = defineEmits<{ (e: "gespeichert"): void }>();

interface Props {
  /**
   * Die Schnellfilter des Startseitenbereichs "Meine Vorgänge". Ohne personalisierte Startseite entfallen
   * die Einstellungen für "Meine Vorgänge".
   */
  schnellfilterOptionen?: Array<AuswahlOption<SchnellfilterVorgaenge>>;
}

const props = defineProps<Props>();

const toast = useToast();
const { getStartseitenEinstellung, saveStartseitenEinstellung } = useStartseitenEinstellungApi();
const { savedFilters, loadFilters } = useFilterPersistence();
const { uebernehmeStandardFilter } = useStandardFilter();

const startseitenEinstellungStore = useStartseitenEinstellungStore();

const sortierungOptionen = SORTIERUNG_OPTIONEN;

const schnellfilter = ref<SchnellfilterVorgaenge>(DEFAULT_SCHNELLFILTER);
const sortierung = ref<SortierungVorgaenge>(DEFAULT_SORTIERUNG);
const standardFilterId = ref<string | null>(null);
const gespeicherteStandardFilterId = ref<string | null>(null);
const saving = ref(false);

// Ohne gewählten Standard-Filter gilt beim Laden der Anwendung die Standardeinstellung des Filtermenüs.
const standardFilterOptionen = computed(() => [
  { id: null, name: "Standardeinstellung" },
  ...savedFilters.value.map((filter) => ({ id: filter.id, name: filter.name })),
]);

async function speichern(): Promise<void> {
  saving.value = true;
  try {
    // Gespeichert wird der angezeigte Schnellfilter, also auch ein angezeigter Ersatzwert.
    const zuSpeichernderSchnellfilter = schnellfilter.value;
    // Die Werte entsprechen den Backend-Enums SchnellfilterVorgaenge, SortAttribute und SortOrder.
    await saveStartseitenEinstellung({
      schnellfilter: zuSpeichernderSchnellfilter,
      sortBy: sortierung.value,
      sortOrder: getSortOrderForSortierung(sortierung.value),
      standardFilterId: standardFilterId.value ?? undefined,
    } as unknown as StartseitenEinstellungDto);
    // Erst nach erfolgreichem Speichern übernehmen, damit die Vorgangsliste keine verworfene
    // Einstellung anzeigt.
    startseitenEinstellungStore.setEinstellung(zuSpeichernderSchnellfilter, sortierung.value);
    toast.success("Die Startseiteneinstellungen wurden gespeichert.");
    // Ein geänderter Standard-Filter wirkt sofort und nicht erst beim nächsten Laden der Anwendung.
    if (standardFilterId.value !== gespeicherteStandardFilterId.value) {
      gespeicherteStandardFilterId.value = standardFilterId.value;
      await uebernehmeStandardFilter(standardFilterId.value);
    }
    emit("gespeichert");
  } finally {
    saving.value = false;
  }
}

async function ladePersoenlicheFilter(): Promise<void> {
  try {
    await loadFilters();
  } catch {
    // handleError already provides user feedback.
  }
}

/**
 * Persönliche Filter können jederzeit über das Filtermenü angelegt werden. Damit diese zur Auswahl stehen,
 * werden sie beim Öffnen der Auswahl neu geladen.
 */
function onStandardFilterMenu(geoeffnet: boolean): void {
  if (geoeffnet) {
    ladePersoenlicheFilter();
  }
}

onMounted(async () => {
  ladePersoenlicheFilter();
  try {
    const einstellung = await getStartseitenEinstellung();
    standardFilterId.value = einstellung.standardFilterId ?? null;
    gespeicherteStandardFilterId.value = standardFilterId.value;
  } catch {
    // Ohne gespeicherte Einstellungen bleiben die Standardwerte bestehen.
  }
  await startseitenEinstellungStore.initialize();
  zeigeGueltigenSchnellfilter(false);
  sortierung.value = startseitenEinstellungStore.sortierung;
});

/**
 * Zeigt einen von der Startseite angebotenen Schnellfilter an, damit beim Speichern kein nicht angebotener Wert
 * übernommen wird. Nicht angebotene Werte werden durch die gespeicherte Voreinstellung oder einen Ersatzwert ersetzt.
 * Ohne angebotene Schnellfilter bleibt die gespeicherte Voreinstellung unverändert erhalten.
 *
 * @param behalteAuswahl ob der aktuell angezeigte Schnellfilter erhalten bleibt, solange er angeboten wird.
 */
function zeigeGueltigenSchnellfilter(behalteAuswahl: boolean): void {
  const optionen = props.schnellfilterOptionen;
  if (!optionen) {
    schnellfilter.value = startseitenEinstellungStore.schnellfilter;
    return;
  }
  if (behalteAuswahl && optionen.some((option) => option.value === schnellfilter.value)) {
    return;
  }
  schnellfilter.value = getGueltigenSchnellfilter(startseitenEinstellungStore.schnellfilter, optionen);
}

// Die Schnellfilter stehen erst fest, wenn die Rollen der Person geladen sind. Eine noch nicht gespeicherte
// Auswahl der Person bleibt dabei erhalten, solange sie angeboten wird.
watch(
  () => props.schnellfilterOptionen,
  () => zeigeGueltigenSchnellfilter(true),
);

defineExpose({ schnellfilter, sortierung, standardFilterId, standardFilterOptionen, speichern });
</script>

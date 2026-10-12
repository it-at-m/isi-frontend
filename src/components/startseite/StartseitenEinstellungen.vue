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
    <template v-if="showMeineVorgaenge">
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
import { computed, onMounted, ref } from "vue";
import type { StartseitenEinstellungDto } from "@/api/api-client/isi-backend";
import { useStartseitenEinstellungApi } from "@/composables/requests/startseite/StartseitenEinstellungApi";
import { useFilterPersistence } from "@/composables/requests/filter/useFilterPersistence";
import {
  DEFAULT_SCHNELLFILTER,
  DEFAULT_SORTIERUNG,
  SCHNELLFILTER_OPTIONEN,
  SORTIERUNG_OPTIONEN,
  getSortOrderForSortierung,
  type SchnellfilterVorgaenge,
  type SortierungVorgaenge,
} from "@/utils/StartseiteUtil";
import { useToast } from "vue-toastification";

interface Props {
  /**
   * Die Einstellungen für den Startseitenbereich "Meine Vorgänge" sind nur für Abfrageersteller relevant.
   */
  showMeineVorgaenge?: boolean;
}

withDefaults(defineProps<Props>(), {
  showMeineVorgaenge: false,
});

const toast = useToast();
const { getStartseitenEinstellung, saveStartseitenEinstellung } = useStartseitenEinstellungApi();
const { savedFilters, loadFilters } = useFilterPersistence();

const schnellfilterOptionen = SCHNELLFILTER_OPTIONEN;
const sortierungOptionen = SORTIERUNG_OPTIONEN;

const schnellfilter = ref<SchnellfilterVorgaenge>(DEFAULT_SCHNELLFILTER);
const sortierung = ref<SortierungVorgaenge>(DEFAULT_SORTIERUNG);
const standardFilterId = ref<string | null>(null);
const saving = ref(false);

// Ohne gewählten Standard-Filter gilt beim Laden der Anwendung die Standardeinstellung des Filtermenüs.
const standardFilterOptionen = computed(() => [
  { id: null, name: "Standardeinstellung" },
  ...savedFilters.value.map((filter) => ({ id: filter.id, name: filter.name })),
]);

async function speichern(): Promise<void> {
  saving.value = true;
  try {
    // Die Werte entsprechen den Backend-Enums SchnellfilterVorgaenge, SortAttribute und SortOrder.
    await saveStartseitenEinstellung({
      schnellfilter: schnellfilter.value,
      sortBy: sortierung.value,
      sortOrder: getSortOrderForSortierung(sortierung.value),
      standardFilterId: standardFilterId.value ?? undefined,
    } as unknown as StartseitenEinstellungDto);
    toast.success("Die Startseiteneinstellungen wurden gespeichert.");
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
    schnellfilter.value = (einstellung.schnellfilter as unknown as SchnellfilterVorgaenge) ?? DEFAULT_SCHNELLFILTER;
    sortierung.value = (einstellung.sortBy as unknown as SortierungVorgaenge) ?? DEFAULT_SORTIERUNG;
    standardFilterId.value = einstellung.standardFilterId ?? null;
  } catch {
    // Ohne gespeicherte Einstellungen bleiben die Standardwerte bestehen.
  }
});

defineExpose({ schnellfilter, sortierung, standardFilterId, standardFilterOptionen, speichern });
</script>

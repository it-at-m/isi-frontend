<template>
  <div id="startseiten_einstellungen">
    <v-divider class="my-2" />
    <span class="userinfo-subtitles">
      <v-icon>mdi-home-outline</v-icon>
      Startseite "Meine Vorgänge"
    </span>
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
import { onMounted, ref } from "vue";
import type { StartseitenEinstellungDto } from "@/api/api-client/isi-backend";
import { useStartseitenEinstellungApi } from "@/composables/requests/startseite/StartseitenEinstellungApi";
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

const toast = useToast();
const { getStartseitenEinstellung, saveStartseitenEinstellung } = useStartseitenEinstellungApi();

const schnellfilterOptionen = SCHNELLFILTER_OPTIONEN;
const sortierungOptionen = SORTIERUNG_OPTIONEN;

const schnellfilter = ref<SchnellfilterVorgaenge>(DEFAULT_SCHNELLFILTER);
const sortierung = ref<SortierungVorgaenge>(DEFAULT_SORTIERUNG);
const saving = ref(false);

async function speichern(): Promise<void> {
  saving.value = true;
  try {
    // Die Werte entsprechen den Backend-Enums SchnellfilterVorgaenge, SortAttribute und SortOrder.
    await saveStartseitenEinstellung({
      schnellfilter: schnellfilter.value,
      sortBy: sortierung.value,
      sortOrder: getSortOrderForSortierung(sortierung.value),
    } as unknown as StartseitenEinstellungDto);
    toast.success("Die Startseiteneinstellungen wurden gespeichert.");
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  try {
    const einstellung = await getStartseitenEinstellung();
    schnellfilter.value = (einstellung.schnellfilter as unknown as SchnellfilterVorgaenge) ?? DEFAULT_SCHNELLFILTER;
    sortierung.value = (einstellung.sortBy as unknown as SortierungVorgaenge) ?? DEFAULT_SORTIERUNG;
  } catch {
    // Ohne gespeicherte Einstellungen bleiben die Standardwerte bestehen.
  }
});

defineExpose({ schnellfilter, sortierung, speichern });
</script>

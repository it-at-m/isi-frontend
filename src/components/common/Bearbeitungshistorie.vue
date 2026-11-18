<template>
  <v-menu
    v-if="bearbeitungshistorieAvailable"
    id="benutzerinformation_menu"
    location="bottom"
    transition="slide-y-transition"
    :close-on-content-click="false"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        id="benutzerinformation_button"
        variant="plain"
        icon="mdi-information"
        v-bind="activatorProps"
      >
      </v-btn>
    </template>
    <v-card flat>
      <v-card-title>Bearbeitungsinformationen</v-card-title>
      <v-data-table
        :headers="bearbeitungshistorieHeaders"
        :items="eintraege"
        density="compact"
        disable-sort
      >
        <template #item.zeitpunkt="{ item }">
          {{ zeitpunktFormatted(item.zeitpunkt) }}
        </template>
        <template #item.art="{ item }">
          {{ aktionText(item) }}
        </template>
      </v-data-table>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  BearbeitungsArt,
  type BearbeitungshistorieDto,
  type LookupEntryDto,
  type StatusAbfrage,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import moment from "moment/moment";
import { useLookupStore } from "@/stores/LookupStore";

const DISPLAY_FORMAT = "DD.MM.YYYY HH:mm";
const lookupStore = useLookupStore();
const bearbeitungshistorie = defineModel<Array<BearbeitungshistorieDto>>({ required: false });
const bearbeitungshistorieHeaders = ref<Array<any>>([
  { title: "Name", key: "bearbeitendePerson.name", sortable: false },
  { title: "Email", key: "bearbeitendePerson.email", sortable: false },
  { title: "Organisationseinheit", key: "bearbeitendePerson.organisationseinheit", sortable: false },
  { title: "Datum der Änderung", key: "zeitpunkt", sortable: false },
  { title: "Aktion", key: "art", sortable: false },
]);
const bearbeitungshistorieAvailable = computed(() => !_.isEmpty(bearbeitungshistorie.value));
// Die Historie wächst mit jeder Bearbeitung, die aktuellsten Einträge stehen deshalb oben.
// Einträge ohne Zeitpunkt bleiben sichtbar und stehen am Ende.
const eintraege = computed(() =>
  _.orderBy(
    bearbeitungshistorie.value,
    [(eintrag: BearbeitungshistorieDto) => _.isNil(eintrag.zeitpunkt), "zeitpunkt"],
    ["asc", "desc"],
  ),
);

function zeitpunktFormatted(zeitpunkt: Date | undefined): string {
  // Das Backend liefert den Zeitpunkt ohne Zeitzone, der Client liest ihn deshalb als lokale Zeit ein.
  return _.isNil(zeitpunkt) ? "" : moment(zeitpunkt).format(DISPLAY_FORMAT);
}

function aktionText(eintrag: BearbeitungshistorieDto): string | undefined {
  switch (eintrag.art) {
    case BearbeitungsArt.Erstellt:
      return "Erstellt";
    case BearbeitungsArt.Aktualisiert:
      return "Aktualisiert";
    case BearbeitungsArt.Statusaenderung:
      return _.isNil(eintrag.zielStatus) ? "Statusänderung" : `Statusänderung: ${zielstatusText(eintrag.zielStatus)}`;
    default:
      // Ältere Einträge ohne Art enthalten nur den Zielstatus. Dieser wird ohne Einordnung als Statusänderung angezeigt.
      return _.isNil(eintrag.zielStatus) ? "" : zielstatusText(eintrag.zielStatus);
  }
}

/**
 * Liefert die Bezeichnung des Status. Ist (noch) keine Bezeichnung verfügbar, wird der Status selbst angezeigt.
 */
function zielstatusText(status: StatusAbfrage): string {
  const bezeichnung = lookupStore.statusAbfrage?.find(
    (lookupEntry: LookupEntryDto) => lookupEntry.key === status,
  )?.value;
  return _.isEmpty(bezeichnung) ? status : (bezeichnung as string);
}

defineExpose({ eintraege, aktionText, zeitpunktFormatted });
</script>

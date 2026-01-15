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
        :items="bearbeitungshistorie"
        density="compact"
        disable-sort
      >
        <template #item.zeitpunkt="{ item }">
          {{ zeitpunktFormatted(item.zeitpunkt) }}
        </template>
        <template #item.zielStatus="{ item }">
          {{ zielstatusText(item.zielStatus) }}
        </template>
      </v-data-table>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { BearbeitungshistorieDto, LookupEntryDto, StatusAbfrage } from "@/api/api-client/isi-backend";
import _ from "lodash";
import moment from "moment/moment";
import { useLookupStore } from "@/stores/LookupStore";

const DISPLAY_FORMAT = "DD.MM.YYYY";
const lookupStore = useLookupStore();
const bearbeitungshistorie = defineModel<Array<BearbeitungshistorieDto>>({ required: false });
const bearbeitungshistorieHeaders = ref<Array<any>>([
  { title: "Name", key: "bearbeitendePerson.name", sortable: false },
  { title: "Email", key: "bearbeitendePerson.email", sortable: false },
  { title: "Organisationseinheit", key: "bearbeitendePerson.organisationseinheit", sortable: false },
  { title: "Datum der Änderung", key: "zeitpunkt", sortable: false },
  { title: "Zielstatus", key: "zielStatus", sortable: false },
]);
const bearbeitungshistorieAvailable = computed(() => !_.isEmpty(bearbeitungshistorie.value));

function zeitpunktFormatted(zeitpunkt: Date | undefined): string {
  return _.isNil(zeitpunkt) ? "" : moment.utc(zeitpunkt, true).format(DISPLAY_FORMAT);
}

function zielstatusText(status: StatusAbfrage | undefined): string | undefined {
  return !_.isEmpty(lookupStore.statusAbfrage)
    ? lookupStore.statusAbfrage.find((lookupEntry: LookupEntryDto) => lookupEntry.key === status)?.value
    : "";
}
</script>

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
        size="small"
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
        dense
        disable-sort
        disable-filtering
        :footer-props="{
          itemsPerPageOptions: [5, 10],
        }"
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
import _ from "lodash";
import { BearbeitungshistorieDto, LookupEntryDto, StatusAbfrage } from "@/api/api-client/isi-backend";
import moment from "moment/moment";
import { useLookupStore } from "@/stores/LookupStore";

interface Props {
  bearbeitungshistorie?: BearbeitungshistorieDto[];
}

const DISPLAY_FORMAT = "DD.MM.YYYY";
const props = defineProps<Props>();
const { statusAbfrage } = useLookupStore();
const bearbeitungshistorieHeaders = [
  { text: "Name", value: "bearbeitendePerson.name", sortable: false },
  { text: "Email", value: "bearbeitendePerson.email", sortable: false },
  { text: "Organisationseinheit", value: "bearbeitendePerson.organisationseinheit", sortable: false },
  { text: "Datum der Änderung", value: "zeitpunkt", sortable: false },
  { text: "Zielstatus", value: "zielStatus", sortable: false },
];
const bearbeitungshistorieAvailable = computed(() => !_.isEmpty(props.bearbeitungshistorie));

function zeitpunktFormatted(zeitpunkt: Date | undefined): string {
  return _.isNil(zeitpunkt) ? "" : moment.utc(zeitpunkt, true).format(DISPLAY_FORMAT);
}

function zielstatusText(status: StatusAbfrage | undefined): string | undefined {
  return !_.isEmpty(statusAbfrage)
    ? statusAbfrage.find((lookupEntry: LookupEntryDto) => lookupEntry.key === status)?.value
    : "";
}
</script>

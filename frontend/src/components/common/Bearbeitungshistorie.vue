<template>
  <v-menu
    v-if="bearbeitungshistorieAvailable"
    id="benutzerinformation_menu"
    offset-y
    transition="slide-y-transition"
  >
    <template #activator="{ on }">
      <v-btn
        id="benutzerinformation_button"
        small
        icon
        fab
        v-on="on"
      >
        <v-icon> mdi-information </v-icon>
      </v-btn>
    </template>
    <v-data-table
      :headers="bearbeitungshistorieHeaders"
      :items="bearbeitungshistorie"
      :items-per-page="-1"
      dense
      hide-default-footer
      disable-sort
    >
      <template #item.zeitpunkt="{ item }">
        {{ zeitpunktFormatted(item.zeitpunkt) }}
      </template>
      <template #item.zielStatus="{ item }">
        {{ zielstatusText(item.zielStatus) }}
      </template>
    </v-data-table>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import _ from "lodash";
import { BearbeitungshistorieDto, LookupEntryDto, StatusAbfrage } from "@/api/api-client/isi-backend";
import moment from "moment/moment";

@Component({})
export default class Bearbeitungshistorie extends Vue {
  static readonly DISPLAY_FORMAT = "DD.MM.YYYY";

  @VModel({ type: AbfrageModel })
  private abfrage!: AbfrageModel;

  private bearbeitungshistorieHeaders = [
    { text: "Name", value: "bearbeitendePerson.name", sortable: false },
    { text: "Email", value: "bearbeitendePerson.email", sortable: false },
    { text: "Organisationseinheit", value: "bearbeitendePerson.organisationseinheit", sortable: false },
    { text: "Änderung", value: "zeitpunkt", sortable: false },
    { text: "Zielstatus", value: "zielStatus", sortable: false },
  ];

  get bearbeitungshistorieAvailable(): boolean {
    return !_.isEmpty(this.abfrage?.bearbeitungshistorie);
  }

  get bearbeitungshistorie(): Array<BearbeitungshistorieDto> {
    return _.toArray(this.abfrage?.bearbeitungshistorie);
  }

  private zeitpunktFormatted(zeitpunkt: Date | undefined): string {
    return _.isNil(zeitpunkt) ? "" : moment.utc(zeitpunkt, true).format(Bearbeitungshistorie.DISPLAY_FORMAT);
  }

  private zielstatusText(status: StatusAbfrage): string | undefined {
    const lookupEntries = this.$store.getters["lookup/statusAbfrage"] as Array<LookupEntryDto>;
    return !_.isEmpty(lookupEntries)
      ? lookupEntries.find((lookupEntry: LookupEntryDto) => lookupEntry.key === status)?.value
      : "";
  }
}
</script>

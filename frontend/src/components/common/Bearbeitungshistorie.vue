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
    />
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, VModel } from "vue-property-decorator";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import _ from "lodash";
import { BearbeitungshistorieDto } from "@/api/api-client/isi-backend";

@Component({})
export default class Bearbeitungshistorie extends Vue {
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
}
</script>

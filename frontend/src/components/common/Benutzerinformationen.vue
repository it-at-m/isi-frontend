<template>
  <v-menu
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
        :disabled="noBenutzerinformationenAvailable"
        v-on="on"
      >
        <v-icon> mdi-information </v-icon>
      </v-btn>
    </template>
    TESTT
  </v-menu>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import { BearbeitendePersonDto } from "@/api/api-client/isi-backend";
import _ from "lodash";

export class BenutzerinformationenModel {
  constructor(bearbeitendePerson?: BearbeitendePersonDto, lastModifiedDateTime?: Date) {
    this.bearbeitendePerson = bearbeitendePerson;
    this.lastModifiedDateTime = lastModifiedDateTime;
  }

  public bearbeitendePerson?: BearbeitendePersonDto;

  public lastModifiedDateTime?: Date;
}

@Component({
  components: {},
})
export default class Benutzerinformationen extends Vue {
  @VModel({ type: BenutzerinformationenModel })
  benutzerinformationen!: BenutzerinformationenModel;

  get noBenutzerinformationenAvailable(): boolean {
    return (
      _.isNil(this.benutzerinformationen?.lastModifiedDateTime) ||
      _.isNil(this.benutzerinformationen?.bearbeitendePerson)
    );
  }
}
</script>

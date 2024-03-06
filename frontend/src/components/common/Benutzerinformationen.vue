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
    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Name:</v-list-item-title>
          <v-list-item-subtitle>{{ name }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Email:</v-list-item-title>
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Organisationseinheit:</v-list-item-title>
          <v-list-item-subtitle>{{ organisationseinheit }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Letzte Änderung:</v-list-item-title>
          <v-list-item-subtitle>{{ letzteAenderung }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import { BearbeitendePersonDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import moment from "moment";

export class BenutzerinformationenModel {
  constructor(bearbeitendePerson?: BearbeitendePersonDto, lastModifiedDateTime?: Date) {
    this.bearbeitendePerson = bearbeitendePerson;
    this.lastModifiedDateTime = lastModifiedDateTime;
  }

  public bearbeitendePerson?: BearbeitendePersonDto;

  public lastModifiedDateTime?: Date;
}

@Component
export default class Benutzerinformationen extends Vue {
  static readonly DISPLAY_FORMAT = "DD.MM.YYYY";

  @VModel({ type: BenutzerinformationenModel })
  benutzerinformationen!: BenutzerinformationenModel;

  get noBenutzerinformationenAvailable(): boolean {
    return (
      _.isNil(this.benutzerinformationen?.lastModifiedDateTime) ||
      _.isNil(this.benutzerinformationen?.bearbeitendePerson)
    );
  }

  get name(): string {
    if (
      _.isNil(this.benutzerinformationen?.bearbeitendePerson) ||
      _.isNil(this.benutzerinformationen?.bearbeitendePerson?.name)
    ) {
      return "";
    } else {
      return this.benutzerinformationen.bearbeitendePerson.name;
    }
  }

  get email(): string {
    if (
      _.isNil(this.benutzerinformationen?.bearbeitendePerson) ||
      _.isNil(this.benutzerinformationen?.bearbeitendePerson?.email)
    ) {
      return "";
    } else {
      return this.benutzerinformationen.bearbeitendePerson.email;
    }
  }

  get organisationseinheit(): string {
    if (
      _.isNil(this.benutzerinformationen?.bearbeitendePerson) ||
      _.isNil(this.benutzerinformationen?.bearbeitendePerson?.organisationseinheit)
    ) {
      return "";
    } else {
      return this.benutzerinformationen.bearbeitendePerson.organisationseinheit;
    }
  }

  get letzteAenderung(): string {
    if (_.isNil(this.benutzerinformationen?.lastModifiedDateTime)) {
      return "";
    } else {
      return moment
        .utc(this.benutzerinformationen.lastModifiedDateTime, true)
        .format(Benutzerinformationen.DISPLAY_FORMAT);
    }
  }
}
</script>

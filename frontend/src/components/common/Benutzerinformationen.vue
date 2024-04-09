<template>
  <v-menu
    v-if="benutzerinformationenAvailable"
    id="benutzerinformation_menu"
    offset-y
    transition="slide-y-transition"
    :close-on-content-click="false"
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
    <v-card flat>
      <v-card-title>Bearbeitungsinformationen</v-card-title>
      <v-list>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Name:</v-list-item-subtitle>
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Email:</v-list-item-subtitle>
            <v-list-item-title>{{ email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Organisationseinheit:</v-list-item-subtitle>
            <v-list-item-title>{{ organisationseinheit }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Letzte Änderung:</v-list-item-subtitle>
            <v-list-item-title>{{ letzteAenderung }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
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

  get benutzerinformationenAvailable(): boolean {
    return (
      !_.isNil(this.benutzerinformationen?.lastModifiedDateTime) ||
      !_.isNil(this.benutzerinformationen?.bearbeitendePerson)
    );
  }

  get name(): string {
    return _.isNil(this.benutzerinformationen?.bearbeitendePerson) ||
      _.isNil(this.benutzerinformationen?.bearbeitendePerson?.name)
      ? ""
      : this.benutzerinformationen.bearbeitendePerson.name;
  }

  get email(): string {
    return _.isNil(this.benutzerinformationen?.bearbeitendePerson) ||
      _.isNil(this.benutzerinformationen?.bearbeitendePerson?.email)
      ? ""
      : this.benutzerinformationen.bearbeitendePerson.email;
  }

  get organisationseinheit(): string {
    return _.isNil(this.benutzerinformationen?.bearbeitendePerson) ||
      _.isNil(this.benutzerinformationen?.bearbeitendePerson?.organisationseinheit)
      ? ""
      : this.benutzerinformationen.bearbeitendePerson.organisationseinheit;
  }

  get letzteAenderung(): string {
    return _.isNil(this.benutzerinformationen?.lastModifiedDateTime)
      ? ""
      : moment.utc(this.benutzerinformationen.lastModifiedDateTime, true).format(Benutzerinformationen.DISPLAY_FORMAT);
  }
}
</script>

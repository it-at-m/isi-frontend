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

<script setup lang="ts">
import _ from "lodash";
import moment from "moment";
import { defineModel } from "@/utils/Vue";
import BenutzerinformationenModel from "@/types/model/common/Benutzerinformationen";

interface Props {
  value: BenutzerinformationenModel;
}

interface Emits {
  (event: "input", value: BenutzerinformationenModel): void;
}

const DISPLAY_FORMAT = "DD.MM.YYYY";
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const benutzerinformationen = defineModel(props, emit);

const benutzerinformationenAvailable = computed(() => {
  return (
    !_.isNil(benutzerinformationen.value?.lastModifiedDateTime) ||
    !_.isNil(benutzerinformationen.value?.bearbeitendePerson)
  );
});

const name = computed(() => {
  return _.isNil(benutzerinformationen.value?.bearbeitendePerson) ||
    _.isNil(benutzerinformationen.value?.bearbeitendePerson?.name)
    ? ""
    : benutzerinformationen.value.bearbeitendePerson.name;
});

const email = computed(() => {
  return _.isNil(benutzerinformationen.value?.bearbeitendePerson) ||
    _.isNil(benutzerinformationen.value?.bearbeitendePerson?.email)
    ? ""
    : benutzerinformationen.value.bearbeitendePerson.email;
});

const organisationseinheit = computed(() => {
  return _.isNil(benutzerinformationen.value?.bearbeitendePerson) ||
    _.isNil(benutzerinformationen.value?.bearbeitendePerson?.organisationseinheit)
    ? ""
    : benutzerinformationen.value.bearbeitendePerson.organisationseinheit;
});

const letzteAenderung = computed(() => {
  return _.isNil(benutzerinformationen.value?.lastModifiedDateTime)
    ? ""
    : moment.utc(benutzerinformationen.value.lastModifiedDateTime, true).format(DISPLAY_FORMAT);
});
</script>

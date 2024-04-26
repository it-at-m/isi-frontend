<template>
  <div>
    <v-row>
      <v-col cols="12">
        <span
          v-if="isEditable"
          class="v-label theme--light"
          >{{ title }}</span
        >
        <span
          v-else
          class="v-label grey--text text--lighten-1"
          >{{ title }}</span
        >
      </v-col>
    </v-row>
    <v-row v-if="editModeTextFieldLinkEakte">
      <v-col
        cols="12"
        md="11"
      >
        <v-textarea
          id="e_akte_field"
          ref="eAkteField"
          v-model="textFieldLinkEakte"
          auto-grow
          rows="1"
          maxlength="8000"
          :disabled="!isEditable"
          @input="formChanged"
        />
      </v-col>
      <v-col
        cols="12"
        md="1"
      >
        <v-row class="justify-center">
          <v-btn
            id="link_eakte_uebernehmen_button"
            class="mt-3 mb-14"
            icon
            :disabled="!isEditable"
            @click="uebernehmenLinkEakte"
          >
            <v-icon>mdi-checkbox-marked</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="!editModeTextFieldLinkEakte">
      <v-col
        cols="12"
        md="11"
      >
        <a
          v-show="linkEakteNotEmpty"
          target="_blank"
          :href="linkEakteFormatted"
        >
          {{ linkEakte }}<span class="mdi mdi-launch" />
        </a>
      </v-col>
      <v-col
        cols="12"
        md="1"
      >
        <v-row class="justify-center">
          <v-btn
            id="link_eakte_bearbeiten_button"
            class="mt-3 mb-14"
            icon
            :disabled="!isEditable"
            @click="editLinkEakte"
          >
            <v-icon>mdi-pencil-box</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { defineModel } from "@/utils/Vue";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  value?: string;
  isEditable?: boolean;
}

interface Emits {
  (event: "input", value?: string): void;
}

const { formChanged } = useSaveLeave();
const title = "Link eAkte";
const props = withDefaults(defineProps<Props>(), { isEditable: false, value: undefined });
const emit = defineEmits<Emits>();
const linkEakte = defineModel(props, emit);
const textFieldLinkEakte = ref("");
const editModeTextFieldLinkEakte = ref(false);
const linkEakteNotEmpty = computed(() => !_.isEmpty(linkEakte.value));

const linkEakteFormatted = computed(() => {
  if (linkEakteNotEmpty.value) {
    const link = linkEakte.value as string;
    return link.toLowerCase().startsWith("http://") || link.toLowerCase().startsWith("https://")
      ? link
      : `https://${link}`;
  }
  return "";
});

function uebernehmenLinkEakte(): void {
  linkEakte.value = textFieldLinkEakte.value;
  textFieldLinkEakte.value = "";
  editModeTextFieldLinkEakte.value = false;
}

function editLinkEakte(): void {
  textFieldLinkEakte.value = _.isNil(linkEakte.value) ? "" : linkEakte.value;
  editModeTextFieldLinkEakte.value = true;
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <span
        v-if="isEditable"
        class="v-label theme--light"
      >
        {{ title }}
      </span>
      <span
        v-else
        class="v-label text-grey-lighten-1"
      >
        {{ title }}
      </span>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      cols="12"
      md="11"
    >
      <v-textarea
        v-if="editMode"
        id="e_akte_field"
        ref="eAkteField"
        v-model="linkEakte"
        variant="underlined"
        auto-grow
        rows="1"
        maxlength="8000"
        :disabled="!isEditable"
        @update:model-value="formChanged"
      />
      <a
        v-else
        v-show="linkEakteNotEmpty"
        target="_blank"
        :href="linkEakteFormatted"
      >
        {{ linkEakteFormatted }}<span class="mdi mdi-launch" />
      </a>
    </v-col>
    <v-col
      cols="12"
      md="1"
    >
      <v-row class="justify-center">
        <v-btn
          v-if="isEditable && linkEakteNotEmpty"
          id="link_eakte_toggle_button"
          class="mt-3 mb-14"
          variant="plain"
          :icon="editMode ? 'mdi-eye-outline' : 'mdi-pencil-outline'"
          @click="editMode = !editMode"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import _ from "lodash";
import { useSaveLeave } from "@/composables/SaveLeave";

interface Props {
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false, value: undefined });
const { formChanged } = useSaveLeave();
const title = "Link eAkte";
const linkEakte = defineModel<string | undefined>();
const linkEakteNotEmpty = computed(() => !_.isEmpty(linkEakte.value));
const editMode = ref(props.isEditable && _.isEmpty(linkEakte.value));

const linkEakteFormatted = computed(() => {
  if (linkEakteNotEmpty.value) {
    const link = linkEakte.value as string;
    return link.toLowerCase().startsWith("http://") || link.toLowerCase().startsWith("https://")
      ? link
      : `https://${link}`;
  }
  return "";
});
</script>

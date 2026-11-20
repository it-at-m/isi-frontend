<template>
  <v-row v-if="!editMode">
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
        v-model="infrastruktureinrichtung.linkKePlus"
        :label="title"
        :aria-label="title"
        variant="underlined"
        auto-grow
        rows="1"
        maxlength="8000"
        :readonly="!isEditable"
        @update:model-value="formChanged"
        :class="isEditable ? '' : 'text-grey-lighten-1'"
      />
      <a
        v-else
        v-show="linkKePlusNotEmpty"
        target="_blank"
        :href="linkKePlusFormatted"
      >
        {{ linkKePlusFormatted }}<span class="mdi mdi-launch" />
      </a>
    </v-col>
    <v-col
      cols="12"
      md="1"
    >
      <v-row class="justify-center">
        <v-btn
          v-if="isEditable"
          id="link_ke_plus_toggle_button"
          class="mt-3 mb-14"
          variant="plain"
          :icon="editMode ? 'mdi-eye-outline' : 'mdi-pencil-outline'"
          :aria-label="editMode ? 'ke+-Link anzeigen' : 'ke+-Link bearbeiten'"
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
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";

interface Props {
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), { isEditable: false, value: undefined });
const { formChanged } = useSaveLeave();
const title = "Link zur Einrichtung ke+";
const infrastruktureinrichtung = defineModel<InfrastruktureinrichtungModel>({
  required: true,
});
// Trim the optional link once for all checks and preview. Do not mutate the original model value here.
const linkKePlusTrimmed = computed(() => {
  const raw = infrastruktureinrichtung.value.linkKePlus ?? "";
  return typeof raw === "string" ? raw.trim() : "";
});

const linkKePlusNotEmpty = computed(() => !_.isEmpty(linkKePlusTrimmed.value));
const editMode = ref(false);

const linkKePlusFormatted = computed(() => {
  const trimmed = linkKePlusTrimmed.value;
  if (!trimmed) return "";

  // Preserve explicit http(s) schemes (case-insensitive). Leading/trailing whitespace already removed.
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    return trimmed;
  }

  // No scheme -> assume https
  return `https://${trimmed}`;
});
</script>

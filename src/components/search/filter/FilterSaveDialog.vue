<template>
  <v-dialog
    v-model="internalShow"
    max-width="500"
  >
    <v-card>
      <v-card-title>Filter Speichern oder Überschreiben</v-card-title>
      <v-card-text>
        <div class="d-flex align-center">
          <v-select
            v-model="mode"
            :items="modes"
            label="Aktion"
            style="flex: 1"
            density="compact"
          />

          <v-text-field
            v-if="mode === 'Speichern'"
            v-model="filterName"
            label="Filternamen eingeben"
            class="ml-4"
            style="flex: 1"
            density="compact"
          />

          <v-select
            v-else
            v-model="selectedFilterId"
            :items="savedFilters"
            item-title="name"
            item-value="id"
            label="Filter auswählen"
            class="ml-4"
            style="flex: 1"
            density="compact"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="close"
          >Abbrechen</v-btn
        >
        <v-btn
          variant="elevated"
          color="primary"
          :disabled="!canSave"
          @click="onSubmit"
        >
          {{ mode === "Speichern" ? "Speichern" : "Überschreiben" }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <yes-no-dialog
      v-model="isYesNoDialogOpen"
      icon="mdi-delete-forever"
      dialogtitle="Hinweis"
      :dialogtext="`Sind Sie sicher, dass Sie den Filter '${filterToOverwriteName}' überschreiben möchten?`"
      no-text="Abbrechen"
      yes-text="Überschreiben"
      @no="editAbort"
      @yes="editConfirm"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import YesNoDialog from "@/components/common/YesNoDialog.vue";

const props = defineProps<{
  show: boolean;
  savedFilters: Array<{ id: string; name: string }>;
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (e: "update:show", value: boolean): void;
  (e: "save", name: string): void;
  (e: "edit", id: string): void;
  (e: "update:modelValue", value: boolean): void;
}>();

const internalShow = ref(props.show);

const modes = ["Speichern", "Überschreiben"];
const mode = ref("Speichern");
const filterName = ref("");
const selectedFilterId = ref<string | null>(null);
const isYesNoDialogOpen = ref(false);

const filterToOverwriteName = computed(() => {
  const filter = props.savedFilters.find((f) => f.id === selectedFilterId.value);
  return filter ? filter.name : "- Filternamen nicht gefunden -";
});

function resetDialogState() {
  mode.value = "Speichern";
  filterName.value = "";
  selectedFilterId.value = null;
}

watch(
  () => props.show,
  (val) => {
    internalShow.value = val;
    if (val) resetDialogState();
  },
);

watch(internalShow, (val) => {
  emits("update:show", val);
});

const canSave = computed(() => {
  if (mode.value === "Speichern") {
    return !!filterName.value && filterName.value.trim().length > 0;
  } else {
    return !!selectedFilterId.value;
  }
});

function close() {
  internalShow.value = false;
}

function onSubmit() {
  if (mode.value === "Speichern") {
    emits("save", filterName.value.trim());
    close();
  } else if (selectedFilterId.value) {
    isYesNoDialogOpen.value = true;
  }
}

function editConfirm() {
  if (selectedFilterId.value) {
    emits("edit", selectedFilterId.value);
  }
  isYesNoDialogOpen.value = false;
  close();
}

function editAbort() {
  isYesNoDialogOpen.value = false;
}
</script>

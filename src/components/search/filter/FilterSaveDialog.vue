<template>
  <v-dialog
    v-model="internalShow"
    max-width="500"
  >
    <v-card>
      <v-card-title>Filter speichern oder überschreiben</v-card-title>
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
          color="primary"
          :disabled="!canSave"
          @click="onSubmit"
        >
          {{ mode === "Speichern" ? "Speichern" : "Überschreiben" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = defineProps<{
  show: boolean;
  savedFilters: Array<{ id: string; name: string }>;
}>();

const emits = defineEmits<{
  (e: "update:show", value: boolean): void;
  (e: "save", name: string): void;
  (e: "edit", id: string): void;
}>();

const internalShow = ref(props.show);

const modes = ["Speichern", "Überschreiben"];
const mode = ref("Speichern");
const filterName = ref("");
const selectedFilterId = ref<string | null>(null);

function resetDialogState() {
  mode.value = "Speichern";
  filterName.value = "";
  selectedFilterId.value = null;
}

// Dialog öffnen: State zurücksetzen
watch(
  () => props.show,
  (val) => {
    internalShow.value = val;
    if (val) resetDialogState();
  },
);

// Zwei-Wege-Bindung nach außen
watch(internalShow, (val) => emits("update:show", val));

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
  } else if (selectedFilterId.value) {
    emits("edit", selectedFilterId.value);
  }
  close();
}
</script>

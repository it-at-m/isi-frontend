<template>
  <v-dialog
    v-model="internalShow"
    max-width="400"
  >
    <v-card>
      <v-card-title class="text-subtitle-1 pt-2">Filtername:</v-card-title>
      <v-card-text class="pt-2 pb-0 mb-4">
        <v-text-field
          v-model="filterName"
          label="Filternamen eingeben"
          density="comfortable"
          autofocus
          hide-details
        />
      </v-card-text>
      <v-card-actions class="pt-0 pb-4">
        <v-spacer />
        <v-btn
          text
          @click="close"
          >Abbrechen</v-btn
        >
        <v-btn
          color="primary"
          variant="flat"
          style="min-width: 120px"
          :disabled="!canSave"
          @click="onSave"
          >Speichern</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = defineProps<{
  show: boolean;
}>();

const emits = defineEmits<{
  (e: "update:show", value: boolean): void;
  (e: "save", name: string): void;
}>();

const internalShow = ref(props.show);
const filterName = ref("");

watch(
  () => props.show,
  (val) => {
    internalShow.value = val;
    if (val) filterName.value = "";
  },
);

watch(internalShow, (val) => {
  emits("update:show", val);
});

const canSave = computed(() => !!filterName.value && filterName.value.trim().length > 0);

function close() {
  internalShow.value = false;
}

function onSave() {
  emits("save", filterName.value.trim());
  close();
}
</script>

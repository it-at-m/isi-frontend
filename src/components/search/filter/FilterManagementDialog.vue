<template>
  <v-dialog
    v-model="show"
    max-width="600"
  >
    <v-card>
      <v-card-title>
        <v-icon
          start
          size="20"
          >mdi-cog</v-icon
        >
        Filter verwalten
      </v-card-title>
      <v-card-text>
        <div style="max-height: 350px; overflow-y: auto; padding-right: 12px">
          <v-list
            density="compact"
            class="py-2"
          >
            <v-list-item
              v-for="filter in filters"
              :key="filter.id"
              class="pa-0 mb-2"
              style="width: 100%"
            >
              <div
                class="d-flex align-center"
                style="width: 100%"
              >
                <v-text-field
                  v-if="editingId === filter.id"
                  v-model="editName"
                  density="comfortable"
                  hide-details
                  @keyup.enter="saveEdit(filter)"
                  @blur="saveEdit(filter)"
                  autofocus
                  class="flex-grow-1 mr-3"
                  style="min-height: 44px"
                />
                <v-sheet
                  v-else
                  class="flex-grow-1 mr-3"
                  color="transparent"
                  style="
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    min-height: 44px;
                    display: flex;
                    align-items: center;
                    padding-left: 16px;
                    font-size: 16px;
                  "
                >
                  {{ filter.name }}
                </v-sheet>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click="startEdit(filter)"
                  :disabled="!!editingId && editingId !== filter.id"
                  class="ml-1"
                  :aria-label="'Umbenennen'"
                  style="margin-right: 8px"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="error"
                  @click="confirmDelete(filter)"
                  :disabled="!!editingId"
                  class="ml-1"
                  :aria-label="'Löschen'"
                  style="margin-right: 8px"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item>
          </v-list>
          <v-alert
            v-if="filters.length === 0"
            type="info"
            class="mt-4"
          >
            Keine Filter vorhanden.
          </v-alert>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="close"
          >Schließen</v-btn
        >
      </v-card-actions>
    </v-card>
    <yes-no-dialog
      v-model="showDeleteDialog"
      icon="mdi-delete-forever"
      dialogtitle="Filter löschen"
      :dialogtext="`Möchten Sie den Filter '${filterToDelete?.name}' wirklich löschen?`"
      no-text="Abbrechen"
      yes-text="Löschen"
      @yes="deleteFilter"
      @no="showDeleteDialog = false"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import YesNoDialog from "@/components/common/YesNoDialog.vue";

const props = defineProps<{
  modelValue: boolean;
  filters: Array<{ id: string; name: string }>;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "rename", id: string, newName: string): void;
  (e: "delete", id: string): void;
}>();

const show = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emits("update:modelValue", val),
});

const editingId = ref<string | null>(null);
const editName = ref("");
function startEdit(filter: { id: string; name: string }) {
  editingId.value = filter.id;
  editName.value = filter.name;
}

function saveEdit(filter: { id: string; name: string }) {
  if (editName.value.trim() && editName.value !== filter.name) {
    emits("rename", filter.id, editName.value.trim());
  }
  editingId.value = null;
  editName.value = "";
}

function close() {
  show.value = false;
}

const showDeleteDialog = ref(false);
const filterToDelete = ref<{ id: string; name: string } | null>(null);
function confirmDelete(filter: { id: string; name: string }) {
  filterToDelete.value = filter;
  showDeleteDialog.value = true;
}
function deleteFilter() {
  if (filterToDelete.value) {
    emits("delete", filterToDelete.value.id);
  }
  showDeleteDialog.value = false;
  filterToDelete.value = null;
}
</script>

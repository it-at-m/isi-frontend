<template>
  <v-list-item
    :class="'ml-' + depth * 4"
    :active="item.id === selectedItemId"
  >
    <template #title>
      <v-menu
        open-on-hover
        :open-on-click="false"
        :open-delay="500"
        location="bottom"
        :disabled="item.actions.length === 0"
      >
        <template #activator="{ props: activatorProps }">
          <span
            :id="`abfrage_navigation_tree_${item.id}`"
            v-bind="activatorProps"
            style="cursor: pointer"
            @click="item.onSelection"
          >
            {{ item.name }}
          </span>
        </template>
        <v-list>
          <v-list-item
            v-for="action in item.actions"
            :id="`abfrage_navigation_tree_${item.id}_${action.name}`"
            :key="action.name"
            :disabled="action.disabled"
            @click="action.effect"
          >
            <v-list-item-title>{{ action.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template #prepend>
      <v-btn
        size="32"
        variant="plain"
        :icon="open ? 'mdi-menu-down' : 'mdi-menu-right'"
        @click="open = !open"
      />
    </template>
    <template #append>
      <v-tooltip
        v-if="item.value.id === relevanteAbfragevarianteId"
        location="bottom"
      >
        <template #activator="{ props: activatorProps }">
          <v-icon v-bind="activatorProps">mdi-star</v-icon>
        </template>
        <span>Diese Abfragevariante ist relevant.</span>
      </v-tooltip>
    </template>
  </v-list-item>
  <abfrage-list-item
    v-for="child in item.children"
    v-if="open"
    :key="child.id"
    :item="child"
    :depth="depth + 1"
    :selected-item-id="selectedItemId"
    :relevante-abfragevariante-id="relevanteAbfragevarianteId"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AbfrageTreeItem } from "@/types/common/Abfrage";

interface Props {
  item: AbfrageTreeItem;
  depth: number;
  selectedItemId: string;
  relevanteAbfragevarianteId?: string;
}

defineProps<Props>();
const open = ref(true);
</script>

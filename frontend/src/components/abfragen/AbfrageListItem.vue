<template>
  <v-menu
    open-on-hover
    :open-on-click="false"
    :open-delay="500"
    location="bottom"
    :disabled="item.actions.length === 0"
  >
    <template #activator="{ props: menuProps }">
      <v-list-item
        :id="`abfrage_navigation_tree_${item.id}`"
        :title="item.name"
        :active="item.id === selectedItemId"
        :style="`padding-left: ${depth * 16}px`"
        v-bind="menuProps"
        @click="item.onSelection"
      >
        <template #prepend>
          <v-btn
            size="32"
            variant="plain"
            :icon="open ? 'mdi-menu-down' : 'mdi-menu-right'"
            @click="toggleOpen"
          />
        </template>
        <template #append>
          <v-tooltip
            v-if="item.value.id && item.value.id === relevanteAbfragevarianteId"
            location="bottom"
          >
            <template #activator="{ props: tooltipProps }">
              <v-icon v-bind="tooltipProps">mdi-star</v-icon>
            </template>
            <span>Diese Abfragevariante ist relevant.</span>
          </v-tooltip>
        </template>
      </v-list-item>
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

function toggleOpen(event: MouseEvent) {
  event.stopPropagation();
  open.value = !open.value;
}
</script>

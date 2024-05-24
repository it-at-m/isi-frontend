<template>
  <div ref="div">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import L from "leaflet";

interface Props {
  position?: "topleft" | "topright" | "bottomleft" | "bottomright";
}

const props = withDefaults(defineProps<Props>(), { position: "bottomleft" });
const div = ref<HTMLDivElement | null>(null);
const control = ref<L.Control | null>(null);

onMounted(() => {
  if (div.value) {
    const Control = L.Control.extend({
      onAdd() {
        return div.value;
      },
      onRemove() {},
    });
    control.value = new Control({ position: props.position });
  }
});

defineExpose({ control });
</script>

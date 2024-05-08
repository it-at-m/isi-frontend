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
let control: L.Control | undefined;

onMounted(() => {
  if (div.value) {
    const Control = L.Control.extend({
      onAdd() {
        return div.value;
      },
    });
    control = new Control({ position: props.position });
  }
});

defineExpose({ control });
</script>

<style scoped>
.map-control {
  width: 44px;
  height: 44px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}
</style>

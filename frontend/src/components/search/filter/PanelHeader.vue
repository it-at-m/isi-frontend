<template>
  <div :style="headerStyle">{{ headerText }}</div>
</template>

<script setup lang="ts">
interface Props {
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  headerText?: string;
}

const props = withDefaults(defineProps<Props>(), { fontSize: "medium", fontWeight: "normal" });

function headerStyle(): string {
  let headerStyle = `font-size: ${props.fontSize}; font-weight: ${props.fontWeight};`;
  if (props.padding) {
    headerStyle = headerStyle + `padding: ${props.padding}`;
  }
  return headerStyle;
}
</script>

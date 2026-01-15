<template>
  <v-list-item
    :prepend-icon="props.icon"
    :title="props.text"
  >
    <template #prepend>
      <div class="pe-4">
        <v-icon
          color="primary"
          size="x-large"
        />
      </div>
    </template>

    <template #append>
      <v-progress-circular
        color="primary"
        indeterminate="disable-shrink"
        size="16"
        width="2"
      />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
interface Props {
  icon: string | undefined;
  text: string | undefined;
}

const props = defineProps<Props>();
</script>

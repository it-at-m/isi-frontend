<template>
  <div>
    <v-text-field
      v-model="longText"
      :rules="[min5, pflichtfeld]"
    ></v-text-field>
    <div>{{ longText }}</div>
  </div>
</template>

<script setup lang="ts">
import { pflichtfeld, min5 } from "@/utils/FieldValidationRules";

const longText = ref("Test");
</script>

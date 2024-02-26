<!-- eslint-disable vue/require-v-for-key -->
<template>
  <v-data-table
    :id="id"
    :items="items"
    :headers="headers"
    hide-default-footer
  >
    <template
      v-for="header in headers"
      #[`item.${header.text}`]="cell"
    >
      <input
        :id="`${id}_${header.text}_${cell.index}`"
        v-model="cell.item[header.text]"
        type="text"
        :disabled="!isEditable"
        @input="formChanged"
      />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { DataTableHeader } from "vuetify";

@Component({ components: { FieldGroupCard } })
export default class Spreadsheet extends Mixins(SaveLeaveMixin) {
  @VModel({ type: Array })
  private items!: unknown[];

  @Prop({ type: Array, default: [] })
  private readonly headers!: DataTableHeader[];

  @Prop({ type: String, default: "" })
  private readonly id!: string;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;
}
</script>

<style scoped>
input {
  outline: none;
  max-width: 100px;
}
</style>

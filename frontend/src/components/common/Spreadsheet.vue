<template>
  <v-data-table
    :id="id"
    :items="items"
    :headers="headers"
    hide-default-footer
  >
    <template
      v-for="header in headers"
      #[`item.${header.value}`]="cell"
    >
      <num-field
        :id="`${id}_${header.text}_${cell.index}`"
        :key="`${header.text}_${cell.index}`"
        v-model="cell.item[header.value]"
        solo
        flat
        dense
        hide-details
        background-color="#00000000"
        integer
        :disabled="!isEditable"
        @input="formChanged"
      />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { DataTableHeader } from "vuetify";

@Component({ components: { FieldGroupCard, NumField } })
export default class Spreadsheet extends Mixins(SaveLeaveMixin) {
  @VModel({ type: Array })
  private items!: unknown[];

  @Prop({ type: Array, default: [] })
  private readonly headers!: DataTableHeader[];

  @Prop({ type: String, default: "spreadsheet" })
  private readonly id!: string;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;
}
</script>

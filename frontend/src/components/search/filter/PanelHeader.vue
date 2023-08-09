<template>
  <div :style="headerStyle">{{ headerText }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PanelHeader extends Vue {
  // Properties
  @Prop({ default: "medium" })
  private fontSize!: string;
  @Prop({ default: "normal" })
  private fontWeight!: string;
  @Prop()
  private padding?: string;
  @Prop()
  private headerText!: string;

  get headerStyle(): string {
    let headerStyle = `font-size: ${this.fontSize}; font-weight: ${this.fontWeight};`;
    if (this.padding) {
      headerStyle = headerStyle + `padding: ${this.padding}`;
    }
    return headerStyle;
  }
}
</script>

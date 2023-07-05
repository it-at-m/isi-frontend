<template>
  <div>
    <infrastruktureinrichtung-component
      id="infrastruktureinrichtung_mittelschule_component"
      ref="infrastruktureinrichtungComponent"
      v-model="mittelschule"
      :mode="displayMode"
    />
    <schule-component
      id="infrastruktureinrichtung_mittelschule_schule_component"
      ref="schule-component"
      v-model="mittelschule.schule"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import MittelschuleModel from "@/types/model/infrastruktureinrichtung/MittelschuleModel";
import InfrastruktureinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungComponent.vue";
import SchuleComponent from "@/components/infrastruktureinrichtung/SchuleComponent.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import DisplayMode from "@/types/common/DisplayMode";

@Component({
  components: {
    FieldGroupCard,
    InfrastruktureinrichtungComponent,
    SchuleComponent,
  },
})
export default class MittelschuleComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: MittelschuleModel }) mittelschule!: MittelschuleModel;

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode === undefined ? DisplayMode.UNDEFINED : this.mode;
  }
}
</script>
<style></style>

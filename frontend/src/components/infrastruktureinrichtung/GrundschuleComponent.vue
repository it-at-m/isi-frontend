<template>
  <div>
    <schule-component
      id="infrastruktureinrichtung_grundschule_schule_component"
      ref="schule-component"
      v-model="grundschule.schule"
      :is-editable="isEditable"
      :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import InfrastruktureinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungComponent.vue";
import SchuleComponent from "@/components/infrastruktureinrichtung/SchuleComponent.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({
  components: {
    FieldGroupCard,
    InfrastruktureinrichtungComponent,
    SchuleComponent,
  },
})
export default class GrundschuleComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: GrundschuleModel }) grundschule!: GrundschuleModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly isEinrichtungstraegerRequired!: boolean;
}
</script>
<style></style>

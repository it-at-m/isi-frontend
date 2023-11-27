<template>
  <field-group-card :card-title="'Planungsursächliche Bedarfe'">
    <infrastrukturbedarf-component
      v-model="bedarfKinderkrippe"
      :title="'Kinderkrippe'"
    />
    <infrastrukturbedarf-component
      v-model="bedarfKindergarten"
      :title="'Kindergarten'"
    />
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import CalculationApiRequestMixin from "@/mixins/requests/CalculationApiRequestMixin";
import {
  AbfrageDto,
  InfrastrukturbedarfProJahrDto,
  LangfristigerPlanungsursaechlicherBedarfDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import InfrastrukturbedarfComponent from "@/components/abfragevarianten/calculation/InfrastrukturbedarfComponent.vue";

@Component({ components: { InfrastrukturbedarfComponent, FieldGroupCard, NumField } })
export default class LangfristigerPlanungsursaechlicherBedarfComponent extends Mixins(CalculationApiRequestMixin) {
  @Prop()
  private stammdatenGueltigAb!: Date;

  @Prop()
  private abfragevarianteId!: string;

  private langfristigerPlanungsursaechlicherBedarf!: LangfristigerPlanungsursaechlicherBedarfDto;

  get bedarfKinderkrippe(): Array<InfrastrukturbedarfProJahrDto> | undefined {
    return this.langfristigerPlanungsursaechlicherBedarf?.bedarfKinderkrippe;
  }

  get bedarfKindergarten(): Array<InfrastrukturbedarfProJahrDto> | undefined {
    return this.langfristigerPlanungsursaechlicherBedarf?.bedarfKindergarten;
  }

  @Watch("abfragevarianteId", { immediate: true })
  private watchAbfragevarianteId(): void {
    const abfrageId = _.isNil(this.$store.getters["search/selectedAbfrage"])
      ? undefined
      : (this.$store.getters["search/selectedAbfrage"] as AbfrageDto).id;
    if (!_.isNil(abfrageId) && !_.isNil(this.stammdatenGueltigAb) && !_.isNil(this.abfragevarianteId)) {
      this.calculateLangfristigerPlanungsursaechlicherBedarf(
        abfrageId,
        this.abfragevarianteId,
        this.stammdatenGueltigAb,
        false,
      ).then((bedarf) => {
        this.langfristigerPlanungsursaechlicherBedarf = bedarf;
      });
    }
  }
}
</script>

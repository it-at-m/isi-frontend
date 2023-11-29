<template>
  <field-group-card card-title="Planungsursächliche Bedarfe">
    <wohneinheiten-component
      title="Datengrundlage für Bedarfsbestimmung"
      :items="langfristigerPlanungsursaechlicherBedarf.wohneinheiten"
    />
  </field-group-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import WohneinheitenComponent from "@/components/abfragevarianten/calculation/WohneinheitenComponent.vue";
import CalculationApiRequestMixin from "@/mixins/requests/CalculationApiRequestMixin";
import { AbfrageDto, LangfristigerPlanungsursaechlicherBedarfDto } from "@/api/api-client/isi-backend";
import _ from "lodash";

@Component({ components: { FieldGroupCard, WohneinheitenComponent } })
export default class LangfristigerPlanungsursaechlicherBedarfComponent extends Mixins(CalculationApiRequestMixin) {
  @Prop()
  private abfragevarianteId!: string;

  private langfristigerPlanungsursaechlicherBedarf!: LangfristigerPlanungsursaechlicherBedarfDto;

  @Watch("abfragevarianteId", { immediate: true })
  private watchAbfragevarianteId(): void {
    const abfrageId = _.isNil(this.$store.getters["search/selectedAbfrage"])
      ? undefined
      : (this.$store.getters["search/selectedAbfrage"] as AbfrageDto).id;
    if (!_.isNil(abfrageId) && !_.isNil(this.abfragevarianteId)) {
      this.calculateLangfristigerPlanungsursaechlicherBedarf(abfrageId, this.abfragevarianteId, false).then(
        (bedarf) => {
          this.langfristigerPlanungsursaechlicherBedarf = bedarf;
        },
      );
    }
  }
}
</script>

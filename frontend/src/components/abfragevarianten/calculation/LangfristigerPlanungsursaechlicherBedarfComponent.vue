<template>
  <field-group-card :card-title="'Planungsursächliche Bedarfe'">
    <infrastrukturbedarf-component
      :infrastruktur-bedarfe-pro-jahr="bedarfKinderkrippe"
      :title="'Kinderkrippe'"
    />
    <infrastrukturbedarf-component
      :infrastruktur-bedarfe-pro-jahr="bedarfKindergarten"
      :title="'Kindergarten'"
    />
    <alle-einwohner-component :personen-pro-jahr="alleEinwohner" />
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
  PersonenProJahrDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import InfrastrukturbedarfComponent from "@/components/abfragevarianten/calculation/InfrastrukturbedarfComponent.vue";
import AlleEinwohnerComponent from "@/components/abfragevarianten/calculation/AlleEinwohnerComponent.vue";

@Component({ components: { AlleEinwohnerComponent, InfrastrukturbedarfComponent, FieldGroupCard, NumField } })
export default class LangfristigerPlanungsursaechlicherBedarfComponent extends Mixins(CalculationApiRequestMixin) {
  @Prop()
  private abfragevarianteId!: string;

  private langfristigerPlanungsursaechlicherBedarf!: LangfristigerPlanungsursaechlicherBedarfDto;

  get bedarfKinderkrippe(): Array<InfrastrukturbedarfProJahrDto> | undefined {
    return this.langfristigerPlanungsursaechlicherBedarf?.bedarfKinderkrippe;
  }

  get bedarfKindergarten(): Array<InfrastrukturbedarfProJahrDto> | undefined {
    return this.langfristigerPlanungsursaechlicherBedarf?.bedarfKindergarten;
  }

  get alleEinwohner(): Array<PersonenProJahrDto> | undefined {
    return this.langfristigerPlanungsursaechlicherBedarf?.alleEinwohner;
  }

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

<template>
  <field-group-card card-title="Planungsursächliche Bedarfe">
    <wohneinheiten-component
      title="Datengrundlage für Bedarfsbestimmung"
      :wohneinheiten="wohneinheiten"
    />
  </field-group-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import WohneinheitenComponent from "@/components/abfragevarianten/calculation/WohneinheitenComponent.vue";
import {
  LangfristigerPlanungsursaechlicherBedarfDto,
  WohneinheitenProFoerderartProJahrDto,
} from "@/api/api-client/isi-backend";

@Component({ components: { FieldGroupCard, WohneinheitenComponent } })
export default class LangfristigerPlanungsursaechlicherBedarfComponent extends Vue {
  @Prop()
  private bedarf?: LangfristigerPlanungsursaechlicherBedarfDto;

  get wohneinheiten(): Array<WohneinheitenProFoerderartProJahrDto> {
    if (this.bedarf) {
      return [
        ...this.bedarf.wohneinheiten,
        ...this.bedarf.wohneinheitenSumme10Jahre,
        ...this.bedarf.wohneinheitenSumme15Jahre,
        ...this.bedarf.wohneinheitenSumme20Jahre,
        ...this.bedarf.wohneinheitenGesamt,
      ];
    }
    return [];
  }
}
</script>

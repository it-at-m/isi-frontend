<template>
  <field-group-card card-title="Planungsursächliche Bedarfe">
    <wohneinheiten-component
      title="Datengrundlage für Bedarfsbestimmung"
      :wohneinheiten="wohneinheiten"
    />
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
import { Component, Vue, Prop } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";

import WohneinheitenComponent from "@/components/abfragevarianten/calculation/WohneinheitenComponent.vue";
import {
  InfrastrukturbedarfProJahrDto,
  LangfristigerPlanungsursaechlicherBedarfDto,
  PersonenProJahrDto,
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

  get bedarfKinderkrippe(): Array<InfrastrukturbedarfProJahrDto> | undefined {
    if (this.bedarf) {
      return [
        ...this.bedarf.bedarfKinderkrippe,
        this.bedarf.bedarfKinderkrippeMittelwert10,
        this.bedarf.bedarfKinderkrippeMittelwert15,
        this.bedarf.bedarfKinderkrippeMittelwert20,
      ];
    }
    return [];
  }

  get bedarfKindergarten(): Array<InfrastrukturbedarfProJahrDto> | undefined {
    if (this.bedarf) {
      return [
        ...this.bedarf.bedarfKindergarten,
        this.bedarf.bedarfKindergartenMittelwert10,
        this.bedarf.bedarfKindergartenMittelwert15,
        this.bedarf.bedarfKindergartenMittelwert20,
      ];
    }
    return [];
  }

  get alleEinwohner(): Array<PersonenProJahrDto> | undefined {
    if (this.bedarf) {
      return [
        ...this.bedarf.alleEinwohner,
        this.bedarf.alleEinwohnerMittelwert10,
        this.bedarf.alleEinwohnerMittelwert15,
        this.bedarf.alleEinwohnerMittelwert20,
      ];
    }
    return [];
  }
}
</script>

<template>
  <div>
    <infrastruktureinrichtung-component
      ref="infrastruktureinrichtungComponent"
      v-model="gsNachmittagBetreuung.infrastruktureinrichtung"
      :mode="displayMode"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="12"
        >  
          <v-select
            v-model="gsNachmittagBetreuung.artGsNachmittagBetreuung"
            :items="artGsNachmittagBetreuungList"
            item-text="value"
            item-value="key"
            label="Art der Nachmittagsbetreuung für Grundschulkinder"
            @change="formChanged"
          />        
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import InfrastruktureinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungComponent.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin"; 
import DisplayMode from "@/types/common/DisplayMode";

@Component({
  components: {
    FieldGroupCard,
    InfrastruktureinrichtungComponent
  },
})
export default class GsNachmittagBetreuungComponent extends Mixins(
  FieldValidationRulesMixin,
  SaveLeaveMixin 
) {
  @VModel({ type: GsNachmittagBetreuungModel }) gsNachmittagBetreuung!: GsNachmittagBetreuungModel;

    get artGsNachmittagBetreuungList(): LookupEntryDto[] {
    return this.$store.getters["lookup/artGsNachmittagBetreuung"];
  }

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode === undefined ? DisplayMode.UNDEFINED : this.mode;
  }
  
}
</script>
<style></style>
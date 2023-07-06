<template>
  <div>
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            v-model="gsNachmittagBetreuung.anzahlHortPlaetze"
            class="mx-3"
            label="Anzahl der Hortplätze"
            integer
            required
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            v-model="gsNachmittagBetreuung.anzahlHortGruppen"
            class="mx-3"
            label="Anzahl der Hortgruppen"
            integer
            required
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            v-model="gsNachmittagBetreuung.wohnungsnaheHortPlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Hortplätze"
            integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
            id="gsNachmittagBetreuungModel_artGsNachmittagBetreuung"
            v-model="gsNachmittagBetreuung.artGsNachmittagBetreuung"
            :items="artGsNachmittagBetreuungList"
            item-text="value"
            item-value="key"
            label="Art der Nachmittagsbetreuung für Grundschulkinder"
            :disabled="!isEditable"
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
    InfrastruktureinrichtungComponent,
  },
})
export default class GsNachmittagBetreuungComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: GsNachmittagBetreuungModel }) gsNachmittagBetreuung!: GsNachmittagBetreuungModel;

  get artGsNachmittagBetreuungList(): LookupEntryDto[] {
    return this.$store.getters["lookup/artGsNachmittagBetreuung"];
  }

  @Prop()
  private mode!: DisplayMode;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  get displayMode(): DisplayMode {
    return this.mode === undefined ? DisplayMode.UNDEFINED : this.mode;
  }
}
</script>
<style></style>

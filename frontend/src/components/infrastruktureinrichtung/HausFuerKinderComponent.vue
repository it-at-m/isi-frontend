<template>
  <div>
    <einrichtungstraeger-component
      v-model="hausFuerKinder"
      :einrichtungstraeger-list="einrichtungstraegerList"
      :is-editable="isEditable"
      :is-einrichtungstraeger-required="isEinrichtungstraegerRequired"
    />
    <field-group-card>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_anzahlKinderkrippePlaetze"
            v-model="hausFuerKinder.anzahlKinderkrippePlaetze"
            class="mx-3"
            label="Anzahl der Kinderkrippenplätze"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_anzahlKindergartenPlaetze"
            v-model="hausFuerKinder.anzahlKindergartenPlaetze"
            class="mx-3"
            label="Anzahl der Kindergartenplätze"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_anzahlHortPlaetze"
            v-model="hausFuerKinder.anzahlHortPlaetze"
            class="mx-3"
            label="Anzahl der Hortplätze"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        />
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_anzahlKinderkrippeGruppen"
            v-model="hausFuerKinder.anzahlKinderkrippeGruppen"
            class="mx-3"
            label="Anzahl der Kinderkrippengruppen"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_anzahlKindergartenGruppen"
            v-model="hausFuerKinder.anzahlKindergartenGruppen"
            class="mx-3"
            label="Anzahl der Kindergartengruppen"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_anzahlHortGruppen"
            v-model="hausFuerKinder.anzahlHortGruppen"
            class="mx-3"
            label="Anzahl der Hortgruppen"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        />
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_wohnungsnaheKinderkrippePlaetze"
            v-model="hausFuerKinder.wohnungsnaheKinderkrippePlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Kinderkrippenplätze"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_wohnungsnaheKindergartenPlaetze"
            v-model="hausFuerKinder.wohnungsnaheKindergartenPlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Kindergartenplätze"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="infrastruktureinrichtung_hausFuerKinder_wohnungsnaheHortPlaetze"
            v-model="hausFuerKinder.wohnungsnaheHortPlaetze"
            class="mx-3"
            label="Anzahl der wohnungsnahen Hortplätze"
            integer
            max-value-signed-integer
            :disabled="!isEditable"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        />
        <v-row />
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import InfrastruktureinrichtungComponent from "@/components/infrastruktureinrichtung/InfrastruktureinrichtungComponent.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import { LookupEntryDto } from "@/api/api-client/isi-backend";
import EinrichtungstraegerComponent from "@/components/infrastruktureinrichtung/EinrichtungstraegerComponent.vue";
@Component({
  components: {
    FieldGroupCard,
    InfrastruktureinrichtungComponent,
    EinrichtungstraegerComponent,
  },
})
export default class HausFuerKinderComponent extends Mixins(FieldValidationRulesMixin, SaveLeaveMixin) {
  @VModel({ type: HausFuerKinderModel }) hausFuerKinder!: HausFuerKinderModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly isEinrichtungstraegerRequired!: boolean;

  get einrichtungstraegerList(): LookupEntryDto[] {
    return this.$store.getters["lookup/einrichtungstraeger"];
  }
}
</script>
<style></style>

<template>
  <v-container>
    <field-group-card :card-title="anteileFMCardTitle">
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-select
            id="foerdermix_stammdaten_dropdown"
            v-model="selectedItem"
            :disabled="!isEditable"
            :items="groupedStammdaten"
            label="Fördermix"
            item-text="foerdermix.bezeichnung"
            return-object
            @input="foerdermixSelected"
            @change="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            id="foerdermix_gesamtsumme"
            v-model="gesamtsumme"
            label="Summe"
            filled
            readonly="readonly"
            :rules="[fieldValidationRules.nichtGleich100Prozent(foerdermix)]"
            :suffix="fieldPrefixesSuffixes.percent"
          />
        </v-col>
      </v-row>
      <v-row>
        <template v-for="(foerderart, foerderartIndex) in foerdermix.foerderarten">
          <v-col
            :key="foerderartIndex"
            cols="12"
            md="4"
          >
            <num-field
              :id="'foerdermix_foerderart_' + foerderartIndex"
              :key="foerderartIndex"
              v-model="foerderart.anteilProzent"
              :disabled="!isFreieEingabe"
              :label="foerderart.bezeichnung"
              :suffix="fieldPrefixesSuffixes.percent"
            />
          </v-col>
        </template>
      </v-row>
    </field-group-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import { addiereAnteile } from "@/utils/CalculationUtil";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FormattingMixin from "@/mixins/FormattingMixin";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import NumField from "@/components/common/NumField.vue";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { createFoerdermixStammDto } from "@/utils/Factories";
import { groupItemsToHeader, mapFoerdermixStammModelToFoerderMix } from "@/utils/MapperUtil";
import _ from "lodash";
import { useStammdatenStore } from "@/stores/StammdatenStore";
type GroupedStammdaten = Array<{ header: string } | FoerdermixStammModel>;

@Component({ components: { NumField, FieldGroupCard } })
export default class FoerdermixFormular extends Mixins(
  FieldValidationRulesMixin,
  FieldPrefixesSuffixes,
  FormattingMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: FoerdermixModel }) foerdermix!: FoerdermixModel;

  private anteileFMCardTitle = "Anteile Fördermix";

  private sumOver100 = false;

  private isFreie = false;

  private freieEingabe = "Freie Eingabe";

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private selectedItem: FoerdermixStammModel = createFoerdermixStammDto();

  private stammdaten: FoerdermixStammModel[] = [];

  private groupedStammdaten: GroupedStammdaten = [];

  private stammdatenStore = useStammdatenStore();

  mounted(): void {
    this.setGroupedStammdatenList();
  }

  @Watch("foerdermix", { immediate: true, deep: true })
  private watchFoerdermix() {
    this.stammdaten = this.stammdatenStore.foerdermixStammdaten;
    const stammdatumMatchingWithFoerdermix = this.stammdaten.find(
      (stammdatum) =>
        _.isEqual(stammdatum.foerdermix.bezeichnung, this.foerdermix?.bezeichnung) &&
        _.isEqual(stammdatum.foerdermix.bezeichnungJahr, this.foerdermix?.bezeichnungJahr),
    );
    if (_.isNil(stammdatumMatchingWithFoerdermix)) {
      this.selectedItem = createFoerdermixStammDto();
    } else {
      this.selectedItem = stammdatumMatchingWithFoerdermix;
    }
  }

  get gesamtsumme(): number {
    const sum: number = addiereAnteile(this.foerdermix);
    this.sumOver100 = sum > 100;
    return sum;
  }

  get isFreieEingabe(): boolean {
    this.isFreie = this.selectedItem.foerdermix.bezeichnung === this.freieEingabe && this.isEditable;
    return this.isFreie;
  }

  foerdermixSelected(item: FoerdermixStammModel): void {
    this.foerdermix = mapFoerdermixStammModelToFoerderMix(item);
  }

  private setGroupedStammdatenList(): void {
    this.stammdaten = this.stammdatenStore.foerdermixStammdaten;
    this.groupedStammdaten = groupItemsToHeader(this.stammdaten, false);
    this.selectedItem.foerdermix.bezeichnung = this.foerdermix.bezeichnung;
  }
}
</script>

<style></style>

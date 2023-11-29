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
import { mapFoerdermixStammModelToFoerderMix } from "@/utils/MapperUtil";

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

  mounted(): void {
    this.setGroupedStammdatenList();
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
    this.stammdaten = this.$store.getters["stammdaten/foerdermixStammdaten"];
    this.groupedStammdaten = this.groupItemsToHeader(this.stammdaten);
    this.selectedItem.foerdermix.bezeichnung = this.foerdermix.bezeichnung;
  }

  /**
   * Gruppiert eine Liste von Fördermixstämmen nach 'bezeichnungJahr' und fügt entsprechende header-Objekte hinzu.
   * Gedacht zum Einsatz mit v-select.
   *
   * @param foerdermixStaemme Eine zu gruppierende Liste von {@link FoerdermixStammModel}.
   * @return Eine neue Liste, welche neben den Fördermixstämmen auch { header: string }-Objekte enthält.
   */
  groupItemsToHeader(foerdermixStaemme: FoerdermixStammModel[]): GroupedStammdaten {
    // Objekt, welches pro 'bezeichnungJahr' ein Array mit den zugehörigen Fördermixen enthalten soll.
    const groups: { [bezeichnungJahr: string]: Array<FoerdermixStammModel> } = {};

    foerdermixStaemme.forEach((foerdermixStammModel: FoerdermixStammModel) => {
      // Falls für das 'bezeichnungJahr' des aktuellen Fördermixes kein Array vorhanden ist, wird eins erschaffen.
      groups[foerdermixStammModel.foerdermix.bezeichnungJahr] =
        groups[foerdermixStammModel.foerdermix.bezeichnungJahr] || [];
      // Dann wird der aktuelle Fördermix zu diesem Array hinzugefügt.
      groups[foerdermixStammModel.foerdermix.bezeichnungJahr].push(foerdermixStammModel);
    });

    // Das obere Objekt soll nun zu einer "abgeflachten" Liste mit header-Objekten werden.
    const flattened: GroupedStammdaten = [];

    Object.keys(groups).forEach((bezeichnungJahr) => {
      const foerdermixe = groups[bezeichnungJahr];

      // Fügt zuerst ein header-Objekt für das aktuelle 'bezeichnungJahr' hinzu.
      flattened.push({ header: bezeichnungJahr });
      // Darauf werden alle Elemente des Arrays vom aktuellen 'bezeichnungJahr' hinzugefügt (siehe "Spread syntax").
      flattened.push(...foerdermixe);
    });

    return flattened;
  }
}
</script>

<style></style>

<template>
  <div>
    <field-group-card :card-title="weitereBerechnungsgrundlagenTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-select
              id="sobon_orientierungswert_jahr_dropdown"
              ref="sobonOrientierungswertJahrDropdown"
              v-model="abfragevarianteSachbearbeitung.sobonOrientierungswertJahr"
              :disabled="!isEditableBySachbearbeitung()"
              :items="sobonOrientierungswertJahrList"
              item-value="key"
              item-text="value"
              :rules="sobonOrientierungswertJahrValidator"
              @change="formChanged"
            >
              <template #label> Jahr für SoBoN-Orientierungwerte <span class="secondary--text">*</span> </template>
            </v-select>
          </v-slide-y-reverse-transition>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <date-picker
            id="stammdaten_gueltig_ab"
            ref="stammdatenGueltigAb"
            v-model="abfragevarianteSachbearbeitung.stammdatenGueltigAb"
            :disabled="!isEditableBySachbearbeitung()"
            label="Stammdatum gültig ab"
            :rules="[fieldValidationRules.pflichtfeld]"
            required
          />
        </v-col>
      </v-row>
      <v-row>
        <v-checkbox
          id="sobon_berechnung"
          ref="sobonBerechnungCheckbox"
          v-model="abfragevarianteSachbearbeitung.isASobonBerechnung"
          :disabled="!isEditableBySachbearbeitung()"
          class="mx-3"
          label="Sobon-Berechnung"
          color="primary"
        />
        <v-expand-transition>
          <div>
            <v-row
              v-if="abfragevarianteSachbearbeitung.isASobonBerechnung"
              justify="center"
            >
              <v-col
                cols="12"
                md="8"
              >
                <v-select
                  id="foerdermix_stammdaten_dropdown"
                  v-model="abfragevarianteSachbearbeitung.sobonFoerdermix"
                  :disabled="!isEditableBySachbearbeitung()"
                  :items="groupedStammdaten"
                  label="Fördermix für Berechnung"
                  item-text="foerdermix.bezeichnung"
                  return-object
                  @change="formChanged"
                />
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-textarea
            id="abfragevarianteSachbearbeitung_anmerkung"
            v-model="abfragevarianteSachbearbeitung.anmerkung"
            :disabled="!isEditableBySachbearbeitung()"
            label="Anmerkungen"
            auto-grow
            rows="3"
            maxlength="255"
            @input="formChanged"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <reports-planungsursaechlichkeit-component v-model="abfragevarianteSachbearbeitung" />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <reports-sobonursaechlichkeit-component
            v-if="!showSobonReport"
            v-model="abfragevarianteSachbearbeitung"
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop } from "vue-property-decorator";
import {
  AbfrageDtoArtAbfrageEnum,
  AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum,
  LookupEntryDto,
  UncertainBoolean,
} from "@/api/api-client/isi-backend";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import ReportsPlanungsursaechlichkeitComponent from "@/components/abfragevarianten/ReportsPlanungsursaechlichkeitComponent.vue";
import ReportsSobonursaechlichkeitComponent from "@/components/abfragevarianten/ReportsPlanungsursaechlichkeitComponent.vue";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import _ from "lodash";

type GroupedStammdaten = Array<{ header: string } | FoerdermixStammModel>;

@Component({
  components: {
    ReportsPlanungsursaechlichkeitComponent,
    ReportsSobonursaechlichkeitComponent,
    FieldGroupCard,
    NumField,
  },
})
export default class AbfragevarianteSachbearbeitungFormular extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private weitereBerechnungsgrundlagenTitle = "Weitere Berechnungsgrundlagen";

  private groupedStammdaten: GroupedStammdaten = [];

  mounted(): void {
    this.setGroupedStammdatenList();
  }

  get sobonOrientierungswertJahrList(): LookupEntryDto[] {
    if (
      this.abfragevarianteSachbearbeitung?.artAbfragevariante ===
      AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren
    ) {
      return this.$store.getters["lookup/sobonOrientierungswertJahr"];
    } else {
      return this.$store.getters["lookup/sobonOrientierungswertJahrWithoutStandortabfrage"];
    }
  }

  get sobonOrientierungswertJahrValidator(): unknown[] {
    if (this.isEditableBySachbearbeitung()) {
      const usedRules: unknown[] = [];
      // Objekte der benötigten Rules anlegen, um daraus eine Liste von Rules anlegen zu können
      const rules = new FieldValidationRulesMixin().fieldValidationRules as {
        notUnspecified: (v: string) => boolean | string;
        pflichtfeld: (v: string) => boolean | string;
      };
      usedRules.push(rules.notUnspecified);
      usedRules.push(rules.pflichtfeld);
      return usedRules;
    }
    return [];
  }

  get isBaugenehmigungsverfahren(): boolean {
    const abfrage: AbfrageModel = this.$store.getters["search/selectedAbfrage"];
    return abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren;
  }

  private setGroupedStammdatenList(): void {
    const stammdaten = this.$store.getters["stammdaten/foerdermixStammdaten"];
    this.groupedStammdaten = this.groupItemsToHeader(stammdaten);
  }

  /**
   * Gruppiert eine Liste von Fördermixstämmen nach dem Attribut'bezeichnungJahr' welche den Wert 'SoBoN 2021' und 'SoBoN 2017' entsprechen.
   * Außerderm fügt die Methode entsprechende header-Objekte hinzu.
   * Gedacht zum Einsatz mit v-select.
   *
   * @param foerdermixStaemme Eine zu gruppierende Liste von {@link FoerdermixStammModel}.
   * @return Eine neue Liste, welche neben den Fördermixstämmen auch { header: string }-Objekte enthält.
   */
  private groupItemsToHeader(foerdermixStaemme: FoerdermixStammModel[]): GroupedStammdaten {
    // Objekt, welches pro 'bezeichnungJahr' ein Array mit den zugehörigen Fördermixen enthalten soll.
    const groups: { [bezeichnungJahr: string]: Array<FoerdermixStammModel> } = {};

    foerdermixStaemme.forEach((foerdermixStammModel: FoerdermixStammModel) => {
      if (
        foerdermixStammModel.foerdermix.bezeichnungJahr === "SoBoN 2021" ||
        foerdermixStammModel.foerdermix.bezeichnungJahr === "SoBoN 2017"
      ) {
        // Dann wird der aktuelle Fördermix zu diesem Array hinzugefügt.
        groups[foerdermixStammModel.foerdermix.bezeichnungJahr].push(foerdermixStammModel);
      }
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

  private showSobonReport(): boolean {
    const abfrage: BauleitplanverfahrenModel | WeiteresVerfahrenModel = this.$store.getters["search/selectedAbfrage"];
    if (
      this.abfragevarianteSachbearbeitung?.artAbfragevariante ===
        AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren ||
      this.abfragevarianteSachbearbeitung?.artAbfragevariante ===
        AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren
    ) {
      return (
        abfrage.sobonRelevant === UncertainBoolean.True &&
        (this.abfragevarianteSachbearbeitung?.isASobonBerechnung as boolean) &&
        !_.isNil(this.abfragevarianteSachbearbeitung?.sobonFoerdermix) &&
        !_.isNil(this.abfragevarianteSachbearbeitung?.gfWohnenSobonUrsaechlich)
      );
    }
    return false;
  }
}
</script>

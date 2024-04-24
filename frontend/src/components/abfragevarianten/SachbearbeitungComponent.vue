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
        </v-col>
        <!-- Das Datum wird in ISI 2.0 relevant werden
          <date-picker
            id="stammdaten_gueltig_ab"
            ref="stammdatenGueltigAb"
            v-model="abfragevarianteSachbearbeitung.stammdatenGueltigAb"
            :disabled="!isEditableBySachbearbeitung()"
            label="Stammdatum gültig ab"
            :rules="[fieldValidationRules.pflichtfeld]"
            required
          />
        -->
      </v-row>
      <sobon-berechnung
        v-if="isBauleitplanverfahrenOrWeiteresVerfahren"
        v-model="abfragevarianteSachbearbeitung.sobonBerechnung"
      />
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
            rows="1"
            maxlength="1000"
            @input="formChanged"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <reports-planungsursaechlichkeit-component
            v-if="showPlanungsursaechlichenReport()"
            v-model="abfragevarianteSachbearbeitung"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <reports-sobonursaechlichkeit-component
            v-if="showSobonReports()"
            v-model="abfragevarianteSachbearbeitung"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <field-group-card :card-title="bauratenDateiInputTitle">
      <bauratendatei-input
        v-model="abfragevarianteSachbearbeitung"
        :is-editable="isEditableBySachbearbeitung()"
      />
      <dokumente
        id="dokumente_component"
        ref="dokumenteComponent"
        v-model="abfragevarianteSachbearbeitung.dokumente"
        :name-root-folder="nameRootFolder"
        :is-dokumente-editable="isEditableBySachbearbeitung()"
        @change="formChanged"
      />
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel, Prop, Watch } from "vue-property-decorator";
import {
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
import BauratendateiInput from "@/components/abfragevarianten/BauratendateiInput.vue";
import ReportsPlanungsursaechlichkeitComponent from "@/components/abfragevarianten/ReportsPlanungsursaechlichkeitComponent.vue";
import ReportsSobonursaechlichkeitComponent from "@/components/abfragevarianten/ReportsPlanungsursaechlichkeitComponent.vue";
import SobonBerechnung from "@/components/abfragevarianten/SobonBerechnung.vue";
import _ from "lodash";
import Dokumente from "@/components/common/dokumente/Dokumente.vue";
import { useLookupStore } from "@/stores/LookupStore";
import { useSearchStore } from "@/stores/SearchStore";
import moment from "moment";

@Component({
  components: {
    BauratendateiInput,
    Dokumente,
    SobonBerechnung,
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
  private schuelerpotentialprognoseTitle = "Bauratendatei und Schülerpotentialprognose";

  private nameRootFolder = "schuelerpotentialprognose";

  private bauratenDateiInputTitle = "Bauratendatei und Schülerpotentialprognose";

  private lookupStore = useLookupStore();

  private searchStore = useSearchStore();

  @Watch("abfragevarianteSachbearbeitung.stammdatenGueltigAb", { immediate: true })
  private abfragevarianteSachbearbeitungStammdatenGueltigAbChanged() {
    if (
      !_.isNil(this.abfragevarianteSachbearbeitung) &&
      (_.isNil(this.abfragevarianteSachbearbeitung.stammdatenGueltigAb) ||
        this.abfragevarianteSachbearbeitung.stammdatenGueltigAb?.toISOString() == new Date(0).toISOString())
    ) {
      this.abfragevarianteSachbearbeitung.stammdatenGueltigAb = moment(new Date()).toDate();
    }
  }

  get sobonOrientierungswertJahrList(): LookupEntryDto[] {
    if (
      this.abfragevarianteSachbearbeitung?.artAbfragevariante ===
      AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren
    ) {
      return this.lookupStore.sobonOrientierungswertJahr;
    } else {
      return this.lookupStore.sobonOrientierungswertJahrWithoutStandortabfrage;
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

  /**
   * Überprüfung ob alle Kriterien stimmen um die planungsursächlichen Reports anzuzeigen.
   */
  private showPlanungsursaechlichenReport(): boolean {
    return this.isRoleAdminOrSachbearbeitung() || this.isRoleAdminOrBedarfsmeldung();
  }

  /**
   * Überprüfung ob alle Kriterien stimmen um die Sobon Reports anzuzeigen.
   */
  private showSobonReports(): boolean {
    const abfrage = this.searchStore.selectedAbfrage;
    return (
      !this.hasOnlyRoleAnwender() &&
      this.isBauleitplanverfahrenOrWeiteresVerfahren &&
      !_.isNil(this.abfragevarianteSachbearbeitung.sobonBerechnung) &&
      abfrage.sobonRelevant === UncertainBoolean.True &&
      (this.abfragevarianteSachbearbeitung.sobonBerechnung?.isASobonBerechnung as boolean) &&
      !_.isNil(this.abfragevarianteSachbearbeitung.sobonBerechnung?.sobonFoerdermix) &&
      !_.isNil(this.abfragevarianteSachbearbeitung.sobonBerechnung?.sobonFoerdermix?.bezeichnungJahr) &&
      !_.isNil(this.abfragevarianteSachbearbeitung.sobonBerechnung?.sobonFoerdermix?.bezeichnung) &&
      !_.isNil(this.abfragevarianteSachbearbeitung.sobonBerechnung?.sobonFoerdermix?.foerderarten) &&
      !_.isNil(this.abfragevarianteSachbearbeitung?.gfWohnenSobonUrsaechlich)
    );
  }

  private get isBauleitplanverfahrenOrWeiteresVerfahren(): boolean {
    return (
      !_.isNil(this.abfragevarianteSachbearbeitung) &&
      (this.abfragevarianteSachbearbeitung?.artAbfragevariante ===
        AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren ||
        this.abfragevarianteSachbearbeitung?.artAbfragevariante ===
          AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren)
    );
  }
}
</script>

<template>
  <div>
    <field-group-card :card-title="weitereBerechnungsgrundlagenTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <num-field
            id="abfragevarianteSachbearbeitung_geschossflaecheWohnenPlanungsursaechlich"
            v-model="abfragevarianteSachbearbeitung.geschossflaecheWohnenPlanungsursaechlich"
            :disabled="!isEditableBySachbearbeitung()"
            class="mx-3"
            label="Planungsursächliche Geschossfläche Wohnen"
            :suffix="fieldPrefixesSuffixes.squareMeter"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-slide-y-reverse-transition>
            <v-select
              id="abfragevarianteSachbearbeitung_soBoNOrientierungswertJahr"
              v-model="abfragevarianteSachbearbeitung.soBoNOrientierungswertJahr"
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
      </v-row>
      <v-row>
        <v-col cols="12">
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
    </field-group-card>
    <field-group-card :card-title="bedarfsmeldungenFachreferateTitle">
      <v-row justify="center">
        <v-col cols="12">
          <v-container class="table">
            <v-data-table
              :headers="bedarfsmeldungenHeaders"
              :items="abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate"
              :items-per-page="5"
              hide-default-footer
              @change="formChanged"
            >
              <template #header="{ text }">
                <span>{{ text }}</span>
              </template>
              <template #body="{ items }">
                <tbody>
                  <tr
                    v-for="(item, index) in items"
                    :key="index"
                  >
                    <td>{{ item.anzahlEinrichtungen }}</td>
                    <td>
                      {{ getLookupValue(item.infrastruktureinrichtungTyp, infrastruktureinrichtungenTypList) }}
                    </td>
                    <td>{{ item.anzahlKinderkrippengruppen }}</td>
                    <td>{{ item.anzahlKindergartengruppen }}</td>
                    <td>{{ item.anzahlHortgruppen }}</td>
                    <td>{{ item.anzahlGrundschulzuege }}</td>
                    <td>
                      <v-btn
                        :id="'bedarfsmeldung_listitem_bearbeiten' + index"
                        :disabled="!isEditableBySachbearbeitung()"
                        icon
                        @click="editBedarfsmeldung(item, index)"
                      >
                        <v-icon> mdi-pencil-outline </v-icon>
                      </v-btn>
                      <v-btn
                        :id="'bedarfsmeldung_listitem_loeschen' + index"
                        :disabled="!isEditableBySachbearbeitung()"
                        icon
                        @click="deleteBedarfsmeldung(index)"
                      >
                        <v-icon> mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
            <v-row class="mt-4">
              <v-col
                cols="12"
                md="4"
              />
              <v-col
                cols="12"
                md="4"
                class="text-center"
              >
                <v-btn
                  :id="'bedarfsmeldung_erfassen'"
                  :disabled="!isEditableBySachbearbeitung()"
                  class="text-wrap"
                  block
                  @click="erfassenBedarfsmeldung()"
                  v-text="'Bedarfsmeldung erfassen'"
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              />
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </field-group-card>
    <bedarfsmeldung-fachabteilungen-dialog
      id="bedarfsmeldung_fachabteilungen"
      v-model="currentBedarfsmeldung"
      :show-bedarfsmeldung-dialog="bedarfsmeldungFachabteilungenDialogOpen"
      @uebernehmen-bedarfsmeldung="uebernehmenBedarfsmeldung($event)"
      @abbrechen-bedarfsmeldung="abbrechenBedarfsmeldung()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, VModel } from "vue-property-decorator";
import { BedarfsmeldungFachabteilungenDto, LookupEntryDto } from "@/api/api-client/isi-backend";
import AbfragevarianteSachbearbeitungModel from "@/types/model/abfragevariante/AbfragevarianteSachbearbeitungModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import BedarfsmeldungFachabteilungenDialog from "@/components/abfragevarianten/BedarfsmeldungFachabteilungenDialog.vue";
import BedarfsmeldungFachabteilungenModel from "@/types/model/abfragevariante/BedarfsmeldungFachabteilungenModel";
import { createBedarfsmeldungFachabteilungenDto } from "@/utils/Factories";
import _ from "lodash";
import DisplayMode from "@/types/common/DisplayMode";

@Component({ components: { FieldGroupCard, NumField, BedarfsmeldungFachabteilungenDialog } })
export default class AbfragevarianteSachbearbeitungFormular extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  @VModel({ type: AbfragevarianteSachbearbeitungModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteSachbearbeitungModel;

  get sobonOrientierungswertJahrList(): LookupEntryDto[] {
    return this.$store.getters["lookup/sobonOrientierungswertJahr"];
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

  private weitereBerechnungsgrundlagenTitle = "Weitere Berechnungsgrundlagen";

  private bedarfsmeldungenFachreferateTitle = "Bedarfsmeldungen der Fachreferate";

  private bedarfsmeldungFachabteilungenDialogOpen = false;

  private currentBedarfsmeldung = createBedarfsmeldungFachabteilungenDto();

  private displayModeBedarfsmeldung = DisplayMode.UNDEFINED;

  private selectedItemIndex = -1;

  private bedarfsmeldungenHeaders = [
    { text: "Anz. Einrichtungen", value: "anzahlEinrichtungen", sortable: false },
    { text: "Infrastruktureinrichtung Typ", value: "infrastruktureinrichtungTyp", sortable: false },
    { text: "Anz. Kinderkrippengruppen", value: "anzahlKindergruppen", sortable: false },
    { text: "Anz. Kindergartengruppen", value: "anzahlKindergartengruppen", sortable: false },
    { text: "Anz. Hortgruppen", value: "anzahlHortgruppen", sortable: false },
    { text: "Anz. Grundschulzüge", value: "anzahlGrundschulzuege", sortable: false },
    { text: "Aktionen", value: "actions", sortable: false },
  ];

  /**
   * Holt aus der im Parameter gegebenen Lookup-Liste den darin hinterlegten Wert des im Parameter gegebenen Schlüssel.
   *
   * @param key für welchen der Wert aus der Liste geholt werden soll.
   * @param list mit den Schlüssel-Wert-Paaren.
   * @return den Wert für den Schlüssel. Ist der Parameter key oder die Liste undefined, so wird auch undefined zurückgegeben.
   */
  private getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) && !_.isNil(key)
      ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
      : key;
  }

  get infrastruktureinrichtungenTypList(): LookupEntryDto[] {
    return this.$store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  private erfassenBedarfsmeldung(): void {
    this.currentBedarfsmeldung = createBedarfsmeldungFachabteilungenDto();
    this.displayModeBedarfsmeldung = DisplayMode.NEU;
    this.bedarfsmeldungFachabteilungenDialogOpen = true;
  }

  private editBedarfsmeldung(bedarfsmeldung: BedarfsmeldungFachabteilungenModel, itemIndex: number): void {
    this.selectedItemIndex = itemIndex;
    this.currentBedarfsmeldung = _.cloneDeep(bedarfsmeldung);
    this.displayModeBedarfsmeldung = DisplayMode.AENDERUNG;
    this.bedarfsmeldungFachabteilungenDialogOpen = true;
  }

  private uebernehmenBedarfsmeldung(bedarfsmeldung: BedarfsmeldungFachabteilungenModel): void {
    if (this.displayModeBedarfsmeldung === DisplayMode.NEU) {
      if (_.isNil(this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate)) {
        this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate = new Array<BedarfsmeldungFachabteilungenDto>();
      }
      this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate.push(bedarfsmeldung);
    } else {
      this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate?.splice(
        this.selectedItemIndex,
        1,
        this.currentBedarfsmeldung
      );
    }
    this.clearBedarfsmeldungDialog();
  }

  private abbrechenBedarfsmeldung(): void {
    this.clearBedarfsmeldungDialog();
  }

  private clearBedarfsmeldungDialog(): void {
    this.bedarfsmeldungFachabteilungenDialogOpen = false;
    this.displayModeBedarfsmeldung = DisplayMode.UNDEFINED;
    this.selectedItemIndex = -1;
  }

  private deleteBedarfsmeldung(itemIndex: number) {
    this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate?.splice(itemIndex, 1);
    this.formChanged();
  }
}
</script>

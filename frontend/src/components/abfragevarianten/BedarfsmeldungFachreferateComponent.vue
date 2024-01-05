<template>
  <div>
    <field-group-card :card-title="getBedarfsmeldungTitle">
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
                        :disabled="!getIsEditable"
                        icon
                        @click="editBedarfsmeldung(item, index)"
                      >
                        <v-icon> mdi-pencil-outline </v-icon>
                      </v-btn>
                      <v-btn
                        :id="'bedarfsmeldung_listitem_loeschen' + index"
                        :disabled="!getIsEditable"
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
                  :disabled="!getIsEditable"
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
    <bedarfsmeldung-fachreferate-dialog
      id="bedarfsmeldung_fachreferate"
      v-model="currentBedarfsmeldung"
      :show-bedarfsmeldung-dialog="bedarfsmeldungFachreferateDialogOpen"
      @uebernehmen-bedarfsmeldung="uebernehmenBedarfsmeldung($event)"
      @abbrechen-bedarfsmeldung="abbrechenBedarfsmeldung()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import { LookupEntryDto, BedarfsmeldungFachreferateDto } from "@/api/api-client/isi-backend";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import BedarfsmeldungFachreferateDialog from "@/components/abfragevarianten/BedarfsmeldungFachreferateDialog.vue";
import BedarfsmeldungFachreferateModel from "@/types/model/abfragevariante/BedarfsmeldungFachreferateModel";
import { createBedarfsmeldungFachreferateDto } from "@/utils/Factories";
import _ from "lodash";
import DisplayMode from "@/types/common/DisplayMode";

export const enum BedarfsmeldungTitle {
  FACHREFERATE = "Bedarfsmeldungen der Fachreferate",
  ABFRAGEERSTELLUNG = "Bedarfsmeldungen der Abfrageerstellung",
}
@Component({ components: { FieldGroupCard, NumField, BedarfsmeldungFachreferateDialog } })
export default class BedarfsmeldungFachreferateComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop()
  private bedarfsmeldungTitle!: BedarfsmeldungTitle;

  get getBedarfsmeldungTitle(): string {
    return this.bedarfsmeldungTitle.valueOf();
  }

  @Prop({ type: Boolean, default: false })
  private isEditable!: boolean;

  get getIsEditable(): boolean {
    return this.isEditable;
  }

  private bedarfsmeldungFachreferateDialogOpen = false;

  private currentBedarfsmeldung = createBedarfsmeldungFachreferateDto();

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
    this.currentBedarfsmeldung = createBedarfsmeldungFachreferateDto();
    this.displayModeBedarfsmeldung = DisplayMode.NEU;
    this.bedarfsmeldungFachreferateDialogOpen = true;
  }

  private editBedarfsmeldung(bedarfsmeldung: BedarfsmeldungFachreferateModel, itemIndex: number): void {
    this.selectedItemIndex = itemIndex;
    this.currentBedarfsmeldung = _.cloneDeep(bedarfsmeldung);
    this.displayModeBedarfsmeldung = DisplayMode.AENDERUNG;
    this.bedarfsmeldungFachreferateDialogOpen = true;
  }

  private uebernehmenBedarfsmeldung(bedarfsmeldung: BedarfsmeldungFachreferateModel): void {
    if (this.displayModeBedarfsmeldung === DisplayMode.NEU) {
      if (_.isNil(this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate)) {
        this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate = new Array<BedarfsmeldungFachreferateDto>();
      }
      this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate.push(bedarfsmeldung);
    } else {
      this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate?.splice(
        this.selectedItemIndex,
        1,
        this.currentBedarfsmeldung,
      );
    }
    this.clearBedarfsmeldungDialog();
  }

  private abbrechenBedarfsmeldung(): void {
    this.clearBedarfsmeldungDialog();
  }

  private clearBedarfsmeldungDialog(): void {
    this.bedarfsmeldungFachreferateDialogOpen = false;
    this.displayModeBedarfsmeldung = DisplayMode.UNDEFINED;
    this.selectedItemIndex = -1;
  }

  private deleteBedarfsmeldung(itemIndex: number) {
    this.abfragevarianteSachbearbeitung.bedarfsmeldungFachreferate?.splice(itemIndex, 1);
    this.formChanged();
  }
}
</script>

<template>
  <div>
    <field-group-card :card-title="getBedarfsmeldungTitle">
      <v-row
        v-if="getIsFachreferat"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <h3>Ausgelöste Bedarfe Kindertagesbetreuung</h3>
          <v-checkbox
            id="ausgeloester_bedarf_im_baugebiet_beruecksichtigen_kita_triswitch"
            ref="ausgeloesterBedarfImBaugebietBeruecksichtigenKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenKita"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Bedarf im Baugebiet berücksichtigen"
            color="primary"
            @change="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_im_bplan_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungImBplanKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungImBplanKita"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung des Bedarfs in einem Bebauungsplan"
            color="primary"
            @change="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_ausgel_bedarf_mitversorgung_in_best_einrichtungen_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen"
            color="primary"
            @change="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_in_best_einrichtungen_nach_ausbau_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen nach deren Ausbau"
            color="primary"
            @change="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <h3>Ausgelöste Bedarfe Schule</h3>
          <v-checkbox
            id="ausgeloester_bedarf_im_baugebiet_beruecksichtigen_schule_triswitch"
            ref="ausgeloesterBedarfImBaugebietBeruecksichtigenSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenSchule"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Bedarf im Baugebiet berücksichtigen"
            color="primary"
            @change="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_im_bplan_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungImBplanSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungImBplanSchule"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung des Bedarfs in einem Bebauungsplan"
            color="primary"
            @change="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_ausgel_bedarf_mitversorgung_in_best_einrichtungen_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen"
            color="primary"
            @change="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_in_best_einrichtungen_nach_ausbau_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen nach deren Ausbau"
            color="primary"
            @change="formChanged"
          />
        </v-col>
      </v-row>
      <v-row v-if="getIsFachreferat">
        <v-col
          cols="12"
          md="12"
        >
          <v-textarea
            id="hinweis_Versorgung_field"
            ref="hinweisVersorgungField"
            v-model="abfragevariante.hinweisVersorgung"
            :disabled="!getIsEditable"
            label="Hinweise zur Versorgung der Bedarfe außerhalb des Verfahrens"
            rows="1"
            auto-grow
            maxlength="1000"
            @input="formChanged"
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12">
          <v-container class="table">
            <v-data-table
              :headers="bedarfsmeldungenHeaders"
              :items="bedarfsmeldungen"
              :items-per-page="-1"
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
    <bedarfsmeldung-dialog
      id="bedarfsmeldung_dialog"
      v-model="currentBedarfsmeldung"
      :show-bedarfsmeldung-dialog="bedarfsmeldungDialogOpen"
      @uebernehmen-bedarfsmeldung="uebernehmenBedarfsmeldung($event)"
      @abbrechen-bedarfsmeldung="abbrechenBedarfsmeldung()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import { LookupEntryDto, BedarfsmeldungDto } from "@/api/api-client/isi-backend";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import BedarfsmeldungDialog from "@/components/abfragevarianten/BedarfsmeldungDialog.vue";
import BedarfsmeldungModel from "@/types/model/abfragevariante/BedarfsmeldungModel";
import { createBedarfsmeldungDto } from "@/utils/Factories";
import _ from "lodash";
import DisplayMode from "@/types/common/DisplayMode";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";

export const enum BedarfsmeldungTitle {
  FACHREFERATE = "Bedarfsmeldungen der Fachreferate",
  ABFRAGEERSTELLUNG = "Geplante Einrichtungen",
}
@Component({ components: { FieldGroupCard, NumField, BedarfsmeldungDialog } })
export default class BedarfsmeldungComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevariante!: AbfragevarianteBauleitplanverfahrenModel;

  @Prop()
  private bedarfsmeldungTitle!: BedarfsmeldungTitle;

  get getBedarfsmeldungTitle(): string {
    if (!_.isNil(this.bedarfsmeldungTitle)) {
      return this.bedarfsmeldungTitle.valueOf();
    }
    return "";
  }

  @Prop({ type: Boolean, default: false })
  private isEditable!: boolean;

  get getIsEditable(): boolean {
    return this.isEditable;
  }

  @Prop({ type: Boolean, default: false })
  private isFachreferat!: boolean;

  get getIsFachreferat(): boolean {
    return this.isFachreferat;
  }

  private bedarfsmeldungen?: BedarfsmeldungDto[] = [];

  @Watch("abfragevariante", { immediate: true, deep: true })
  private bedarfsmeldungSelection(): void {
    this.bedarfsmeldungen = this.isFachreferat
      ? this.abfragevariante.bedarfsmeldungFachreferate
      : this.abfragevariante.bedarfsmeldungAbfrageersteller;
  }

  private bedarfsmeldungDialogOpen = false;

  private currentBedarfsmeldung = createBedarfsmeldungDto();

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
    this.currentBedarfsmeldung = createBedarfsmeldungDto();
    this.displayModeBedarfsmeldung = DisplayMode.NEU;
    this.bedarfsmeldungDialogOpen = true;
  }

  private editBedarfsmeldung(bedarfsmeldung: BedarfsmeldungModel, itemIndex: number): void {
    this.selectedItemIndex = itemIndex;
    this.currentBedarfsmeldung = _.cloneDeep(bedarfsmeldung);
    this.displayModeBedarfsmeldung = DisplayMode.AENDERUNG;
    this.bedarfsmeldungDialogOpen = true;
  }

  private uebernehmenBedarfsmeldung(bedarfsmeldung: BedarfsmeldungModel): void {
    if (this.displayModeBedarfsmeldung === DisplayMode.NEU) {
      if (_.isNil(this.bedarfsmeldungen)) {
        this.bedarfsmeldungen = new Array<BedarfsmeldungDto>();
      }
      this.bedarfsmeldungen.push(bedarfsmeldung);
    } else {
      this.bedarfsmeldungen?.splice(this.selectedItemIndex, 1, this.currentBedarfsmeldung);
    }
    this.clearBedarfsmeldungDialog();
  }

  private abbrechenBedarfsmeldung(): void {
    this.clearBedarfsmeldungDialog();
  }

  private clearBedarfsmeldungDialog(): void {
    this.bedarfsmeldungDialogOpen = false;
    this.displayModeBedarfsmeldung = DisplayMode.UNDEFINED;
    this.selectedItemIndex = -1;
  }

  private deleteBedarfsmeldung(itemIndex: number) {
    if (!_.isNil(this.bedarfsmeldungen)) {
      this.bedarfsmeldungen.splice(itemIndex, 1);
      this.formChanged();
    }
  }
}
</script>

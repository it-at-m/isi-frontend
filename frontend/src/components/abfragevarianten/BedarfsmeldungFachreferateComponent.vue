<template>
  <div>
    <field-group-card :card-title="bedarfsmeldungenFachreferateTitle">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <h3>Kindertagesbetreuung</h3>
          <tri-switch
            id="ausgel_bedarf_im_baugebiet_beruecksichtigen_kita_triswitch"
            ref="ausgelBedarfImBaugebietBeruecksichtigenKitaTriswitch"
            v-model="abfragevarianteSachbearbeitung.ausgelBedarfImBaugebietBeruecksichtigenKita"
            off-text="Nein"
            on-text="Ja"
          >
            <template #label> Bedarf im Baugebiet berücksichtigen </template>
          </tri-switch>

          <tri-switch
            id="ausgel_bedarf_mitversorgung_im_bplan_kita_triswitch"
            ref="ausgelBedarfMitversorgungImBplanKitaTriswitch"
            v-model="abfragevarianteSachbearbeitung.ausgelBedarfMitversorgungImBplanKita"
            off-text="Nein"
            on-text="Ja"
          >
            <template #label> Mitversorgung des Bedarfs in einem Bebauungsplan </template>
          </tri-switch>

          <tri-switch
            id="ausgel_bedarf_ausgel_bedarf_mitversorgung_in_best_einrichtungen_kita_triswitch"
            ref="ausgelBedarfMitversorgungInBestEinrichtungenKitaTriswitch"
            v-model="abfragevarianteSachbearbeitung.ausgelBedarfMitversorgungInBestEinrichtungenKita"
            off-text="Nein"
            on-text="Ja"
          >
            <template #label> Mitversorgung in bestehenden Einrichtungen </template>
          </tri-switch>

          <tri-switch
            id="ausgel_bedarf_mitversorgung_in_best_einrichtungen_nach_ausbau_kita_triswitch"
            ref="ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauKitaTriswitch"
            v-model="abfragevarianteSachbearbeitung.ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauKita"
            off-text="Nein"
            on-text="Ja"
          >
            <template #label> Mitversorgung in bestehenden Einrichtungen nach deren Ausbau </template>
          </tri-switch>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <h3>Schule</h3>
          <tri-switch
            id="ausgel_bedarf_im_baugebiet_beruecksichtigen_schule_triswitch"
            ref="ausgelBedarfImBaugebietBeruecksichtigenSchuleTriswitch"
            v-model="abfragevarianteSachbearbeitung.ausgelBedarfImBaugebietBeruecksichtigenSchule"
            off-text="Nein"
            on-text="Ja"
          >
            <template #label> Bedarf im Baugebiet berücksichtigen </template>
          </tri-switch>

          <tri-switch
            id="ausgel_bedarf_mitversorgung_im_bplan_schule_triswitch"
            ref="ausgelBedarfMitversorgungImBplanSchuleTriswitch"
            v-model="abfragevarianteSachbearbeitung.ausgelBedarfMitversorgungImBplanSchule"
            off-text="Nein"
            on-text="Ja"
          >
            <template #label> Mitversorgung des Bedarfs in einem Bebauungsplan </template>
          </tri-switch>

          <tri-switch
            id="ausgel_bedarf_ausgel_bedarf_mitversorgung_in_best_einrichtungen_schule_triswitch"
            ref="ausgelBedarfMitversorgungInBestEinrichtungenSchuleTriswitch"
            v-model="abfragevarianteSachbearbeitung.ausgelBedarfMitversorgungInBestEinrichtungenSchule"
            off-text="Nein"
            on-text="Ja"
          >
            <template #label> Mitversorgung in bestehenden Einrichtungen </template>
          </tri-switch>

          <tri-switch
            id="ausgel_bedarf_mitversorgung_in_best_einrichtungen_nach_ausbau_schule_triswitch"
            ref="ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauSchuleTriswitch"
            v-model="abfragevarianteSachbearbeitung.ausgelBedarfMitversorgungInBestEinrichtungenNachAusbauSchule"
            off-text="Nein"
            on-text="Ja"
          >
            <template #label> Mitversorgung in bestehenden Einrichtungen nach deren Ausbau </template>
          </tri-switch>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-text-field
            id="hinweis_Versorgung_field"
            ref="hinweisVersorgungField"
            v-model="abfragevarianteSachbearbeitung.hinweisVersorgung"
            label="Hinweise zur Versorgung der Bedarfe außerhalb des Verfahrens"
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
                        :disabled="!isEditableByBedarfsmeldung()"
                        icon
                        @click="editBedarfsmeldung(item, index)"
                      >
                        <v-icon> mdi-pencil-outline </v-icon>
                      </v-btn>
                      <v-btn
                        :id="'bedarfsmeldung_listitem_loeschen' + index"
                        :disabled="!isEditableByBedarfsmeldung()"
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
                  :disabled="!isEditableByBedarfsmeldung()"
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
import { Component, Mixins, VModel } from "vue-property-decorator";
import { LookupEntryDto, BedarfsmeldungFachreferateDto } from "@/api/api-client/isi-backend";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldPrefixesSuffixes from "@/mixins/FieldPrefixesSuffixes";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import NumField from "@/components/common/NumField.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import BedarfsmeldungFachreferateDialog from "@/components/abfragevarianten/BedarfsmeldungFachreferateDialog.vue";
import BedarfsmeldungFachreferateModel from "@/types/model/abfragevariante/BedarfsmeldungFachreferateModel";
import { createBedarfsmeldungFachreferateDto } from "@/utils/Factories";
import _ from "lodash";
import DisplayMode from "@/types/common/DisplayMode";

@Component({ components: { FieldGroupCard, NumField, BedarfsmeldungFachreferateDialog } })
export default class BedarfsmeldungFachreferateComponent extends Mixins(
  FieldPrefixesSuffixes,
  FieldValidationRulesMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin,
) {
  @VModel({ type: AbfragevarianteBauleitplanverfahrenModel })
  abfragevarianteSachbearbeitung!: AbfragevarianteBauleitplanverfahrenModel;

  private bedarfsmeldungenFachreferateTitle = "Bedarfsmeldungen der Fachreferate";

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

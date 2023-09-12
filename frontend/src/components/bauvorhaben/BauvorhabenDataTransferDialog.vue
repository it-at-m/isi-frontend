<template>
  <v-dialog
    :value="steuerflag"
    persistent
    width="60%"
  >
    <v-card class="overflow-x-hidden">
      <v-card-title
        class="text-wrap align-stretch"
        v-text="'Datenübernahme aus Abfrage'"
      />
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        >
          <v-select
            id="bauvorhaben_abfrage_datenuebernahme_dropdown"
            v-model="selectedAbfrageListElement"
            :items="abfragen"
            :item-text="(item) => getItemText(item)"
            item-value="id"
            label="Abfragen"
            return-object
            hint="Abfrage für Datenübernahme auswählen"
            persistent-hint
            @focus="fetchAbfragen"
          />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="bauvorhaben_abfrage_datenuebernahme_abbrechen_button"
          class="text-wrap"
          text
          @click="uebernahmeAbbrechen"
          v-text="'Abbrechen'"
        />
        <v-btn
          id="bauvorhaben_abfrage_datenuebernahme_uebernehmen_button"
          class="text-wrap"
          color="primary"
          @click="abfrageUebernehmen"
          v-text="'Übernehmen'"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Mixins, VModel, Watch } from "vue-property-decorator";
import AbfragelistenApiRequestMixin from "@/mixins/requests/AbfragelistenApiRequestMixin";
import {
  AbfrageListElementDto,
  AbfrageListElementsDto,
  InfrastrukturabfrageDto,
  LookupEntryDto,
} from "@/api/api-client/isi-backend";
import _ from "lodash";
import AbfrageApiRequestMixin from "@/mixins/requests/AbfrageApiRequestMixin";
import { createInfrastrukturabfrageDto } from "@/utils/Factories";

@Component
export default class BauvorhabenDataTransferDialog extends Mixins(
  AbfragelistenApiRequestMixin,
  AbfrageApiRequestMixin
) {
  @VModel({ type: Boolean }) steuerflag!: boolean;

  private abfragen: Array<AbfrageListElementDto> = [];

  private selectedAbfrageListElement: AbfrageListElementDto = {};

  private selectedAbfrage: InfrastrukturabfrageDto = createInfrastrukturabfrageDto();

  mounted(): void {
    this.fetchAbfragen();
  }

  get standVorhabenList(): LookupEntryDto[] {
    return this.$store.getters["lookup/standVorhaben"];
  }

  get statusAbfrageList(): LookupEntryDto[] {
    return this.$store.getters["lookup/statusAbfrage"];
  }

  get sobonVerfahrensgrundsaetzeJahrList(): LookupEntryDto[] {
    return this.$store.getters["lookup/sobonVerfahrensgrundsaetzeJahr"];
  }

  @Watch("selectedAbfrageListElement", { immediate: true })
  private transferToBauvorhaben(): void {
    if (!_.isNil(this.selectedAbfrageListElement) && !_.isNil(this.selectedAbfrageListElement.id)) {
      const idAbfrage: string = this.selectedAbfrageListElement.id;
      this.getInfrastrukturabfrageById(idAbfrage, false).then((abfrageDto: InfrastrukturabfrageDto) => {
        this.selectedAbfrage = abfrageDto;
      });
    }
  }

  private getItemText(listElement: AbfrageListElementDto): string {
    return (
      "Name: " +
      _.defaultTo(listElement.nameAbfrage, "Kein Name vorhanden") +
      " - Status: " +
      _.defaultTo(
        this.getLookupValue(listElement.statusAbfrage, this.statusAbfrageList),
        "Kein Abfragestatus vorhanden"
      ) +
      " - Stand: " +
      _.defaultTo(
        this.getLookupValue(listElement.standVorhaben, this.standVorhabenList),
        "Kein Vorhabensstand vorhanden"
      ) +
      " - Verfahrensgrundsätze Jahr: " +
      _.defaultTo(
        this.getLookupValue(listElement.sobonJahr, this.sobonVerfahrensgrundsaetzeJahrList),
        "Kein Verfahrensgrundsätze Jahr vorhanden"
      )
    );
  }

  private async fetchAbfragen(): Promise<void> {
    await this.getAbfrageListElements(false).then((abfrageListElementsDto: AbfrageListElementsDto) => {
      if (!_.isUndefined(abfrageListElementsDto.listElements)) {
        this.abfragen = abfrageListElementsDto.listElements.filter((abfrage) => _.isNil(abfrage.bauvorhaben));
      }
    });
  }

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

  @Emit()
  private abfrageUebernehmen(): InfrastrukturabfrageDto {
    this.selectedAbfrageListElement = {};
    return this.selectedAbfrage;
  }

  @Emit()
  private uebernahmeAbbrechen(): void {
    this.selectedAbfrageListElement = {};
  }
}
</script>

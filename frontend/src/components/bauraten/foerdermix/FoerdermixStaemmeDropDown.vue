<template>
  <div>
    <v-select
      id="foerdermix_stammdaten_dropdown"
      v-model="selectedItem"
      :disabled="!isEditable"
      :items="groupedStammdaten"
      label="Fördermix"
      item-text="bezeichnung"
      return-object
      @input="foerdermixSelected"
      @change="formChanged"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import FoerdermixApiRequestMixin from "@/mixins/requests/FoerdermixApiRequestMixin";
import { FoerdermixStammDto } from "@/api/api-client/isi-backend";
import FoerdermixStammModel from "@/types/model/bauraten/FoerdermixStammModel";
import { createFoerdermixDto, createFoerdermixStammDto } from "@/utils/Factories";
import { matchFoerdermixStammDaten } from "@/utils/CompareUtil";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import { mapFoerdermixStammModelToFoerderMix } from "@/utils/MapperUtil";

type GroupedStammdaten = Array<{ header: string } | FoerdermixStammModel>;

@Component
export default class FoerdermixStaemmeDropDown extends Mixins(
  FoerdermixApiRequestMixin,
  SaveLeaveMixin,
  AbfrageSecurityMixin
) {
  @VModel({ type: FoerdermixModel }) foerdermix!: FoerdermixModel;

  @Prop({ type: Boolean, default: false })
  private readonly isEditable!: boolean;

  private selectedItem: FoerdermixStammModel = createFoerdermixStammDto();

  private stammdaten: FoerdermixStammModel[] = [];

  private groupedStammdaten: GroupedStammdaten = [];

  mounted(): void {
    this.setGroupedStammdatenList();
  }

  @Watch("foerdermix", { immediate: true, deep: true })
  private changeFördermixBezeichnung(): void {
    const matchedFoerdermix = matchFoerdermixStammDaten(this.foerdermix, this.stammdaten);
    this.selectedItem = matchedFoerdermix;
  }

  foerdermixSelected(item: FoerdermixStammModel): void {
    this.foerdermix = mapFoerdermixStammModelToFoerderMix(item);
  }

  private setGroupedStammdatenList(): void {
    this.stammdaten = this.$store.getters["stammdaten/foerdermixStammdaten"];
    this.stammdaten.push(this.createFreieEingabe());
    this.groupedStammdaten = this.groupItemsToHeader(this.stammdaten);
    this.selectedItem = matchFoerdermixStammDaten(this.foerdermix, this.stammdaten);
  }

  /**
   * Gruppiert eine Liste von Fördermixstämmen nach 'bezeichnungJahr' und fügt entsprechende header-Objekte hinzu.
   * Gedacht zum Einsatz mit v-select.
   *
   * @param data Eine zu gruppierende Liste von {@link FoerdermixStammModel}.
   * @return Eine neue Liste, welche neben den Fördermixstämmen auch { header: string }-Objekte enthält.
   */
  groupItemsToHeader(data: FoerdermixStammModel[]): GroupedStammdaten {
    // Objekt, welches pro 'bezeichnungJahr' ein Array mit den zugehörigen Fördermixen enthalten soll.
    const groups: { [bezeichnungJahr: string]: Array<FoerdermixStammModel> } = {};

    data.forEach((foerdermix: FoerdermixStammModel) => {
      // Falls für das 'bezeichnungJahr' des aktuellen Fördermixes kein Array vorhanden ist, wird eins erschaffen.
      groups[foerdermix.bezeichnungJahr] = groups[foerdermix.bezeichnungJahr] || [];
      // Dann wird der aktuelle Fördermix zu diesem Array hinzugefügt.
      groups[foerdermix.bezeichnungJahr].push(foerdermix);
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

  /**
   * Erstellt ein FoerdermixStammDto welches die Attribute für eine Freie Eingabe hat.
   * Das heißt alle Felder sind leer und die Bezeichnung ist Freie Eingabe.
   * Wird am Ende in der Liste hinzugefügt.
   */
  private createFreieEingabe(): FoerdermixStammDto {
    const foerdermixStammDto = {
      bezeichnung: "Freie Eingabe",
      bezeichnungJahr: "Weitere",
      foerdermix: createFoerdermixDto(),
    } as FoerdermixStammDto;
    return foerdermixStammDto;
  }
}
</script>

<style></style>

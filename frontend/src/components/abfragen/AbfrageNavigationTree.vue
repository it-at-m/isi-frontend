<template>
  <v-container>
    <v-row class="justify-start">
      <v-col>
        <v-treeview
          id="abfrage_navigation_tree_treeview"
          :active.sync="markedTreeItems"
          open-all
          :open.prop="treeItemIdsToOpen"
          :items="abfrageTreeItems"
          activatable
          active-class="font-weight-black v-treeview-node--active"
          open-on-click
        >
          <template #prepend="{ item }">
            <v-icon v-if="item.changed"> mdi-exclamation</v-icon>
          </template>
          <template #append="{ item }">
            <v-btn
              v-if="item.name === nameTreeElementAddAbfragevariante"
              :id="'abfrage_navigation_tree_button_create_new_abfragevariante_' + item.id"
              icon
              @click="createNewAbfragevariante(item)"
            >
              <v-icon> mdi-plus-box-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isAbfrageTreeItemAnAbfragevariante(item)"
              :id="'abfrage_navigation_tree_button_delete_abfragevariante_' + item.id"
              icon
              @click="deleteAbfragevariante(item)"
            >
              <v-icon> mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="item.name === nameTreeElementAddBauabschnitt"
              :id="'abfrage_navigation_tree_button_create_new_bauabschnitt_' + item.id"
              icon
              @click="createNewBauabschnitt(item)"
            >
              <v-icon> mdi-plus-box-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isAbfrageTreeItemAnBauabschnitt(item)"
              :id="'abfrage_navigation_tree_button_delete_bauabschnitt_' + item.id"
              icon
              @click="deleteBauabschnitt(item)"
            >
              <v-icon> mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-treeview>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Emit, VModel, Vue, Watch } from "vue-property-decorator";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import _ from "lodash";
import { AbfragevarianteDto, InfrastrukturabfrageDto, BauabschnittDto } from "@/api/api-client/isi-backend";
import InfrastrukturabfrageWrapperModel from "@/types/model/abfrage/InfrastrukturabfrageWrapperModel";

export interface AbfrageTreeItem {
  id: number;

  name: string;

  children: Array<AbfrageTreeItem>;

  /**
   * Referenziert die in der Treeview darzustellende Abfrage.
   */
  abfrage: InfrastrukturabfrageDto | undefined;

  /**
   * Referenziert die in der Treeview darzustellende Abfragevariante.
   */
  abfragevariante: AbfragevarianteDto | undefined;

  /**
   * Referenziert die in der Treeview darzustellenden Bauabschnitt.
   */
  bauabschnitt: BauabschnittDto | undefined;

  /**
   * True falls das referenzierte Objekt geändert wurde, andernfalls false.
   */
  changed: boolean;
}

@Component
export default class AbfrageNavigationTree extends Vue {
  private static readonly MAX_NUMBER_ABFRAGEVARIANTEN: number = 5;

  private static readonly NICHT_GEPFLEGT: string = "NICHT GEPFLEGT";

  private static readonly NAME_TREE_ELEMENT_ABFRAGE: string = "Abfrage";

  /*
  private static readonly NAME_TREE_ELEMENT_LIST_ABFRAGEVARIANTEN: string = "Abfragevarianten";
  */

  private static readonly NAME_TREE_ELEMENT_ADD_NEW_ABFRAGEVARIANTE: string = "Abfragevariante anlegen";

  /*
  private static readonly NAME_TREE_ELEMENT_LIST_BAUABSCHNITTE: string = "Bauabschnitte";
  */

  private static readonly NAME_TREE_ELEMENT_ADD_NEW_BAUABSCHNITT: string = "Bauabschnitt anlegen";

  private static readonly START_NAME_ABFRAGEVARIANTE: string = "Nr.: ";

  @VModel({ type: InfrastrukturabfrageWrapperModel }) infrastrukturabfrageWrapped!: InfrastrukturabfrageWrapperModel;

  private initialAbfrageTreeItems: Array<AbfrageTreeItem> = [];

  private abfrageTreeItems: Array<AbfrageTreeItem> = [];

  private markedTreeItems: Array<number> = [];

  /**
   * Der Watcher reagiert, falls sich der übergebene AbfrageWrapper ändert oder durch einen Neuen ersetzt wird.
   * Hat das Attribut "initial" die Ausprägung true, so wird eine Kopie der AbfrageTreeItems erstellt,
   * welche als Referenz zur Erkennung von möglichen Änderungen der in den AbfrageTreeItems referenzierten Objekten dient.
   */
  @Watch("infrastrukturabfrageWrapped", { immediate: true, deep: true })
  private abfrageChanged(): void {
    if (!_.isNil(this.infrastrukturabfrageWrapped.infrastrukturabfrage)) {
      this.abfrageTreeItems = this.createAbfrageTreeItems(this.infrastrukturabfrageWrapped.infrastrukturabfrage);
      if (this.infrastrukturabfrageWrapped.initial) {
        this.initialAbfrageTreeItems = _.cloneDeep(this.abfrageTreeItems);
        this.infrastrukturabfrageWrapped.initial = false;
      }
      this.markNewAbfrageTreeItemsAsChanged(this.abfrageTreeItems, this.initialAbfrageTreeItems);
    }
  }

  @Watch("markedTreeItems", { immediate: true, deep: true })
  private eventMarkedTreeItemElement(): void {
    if (this.markedTreeItems.length) {
      // Es kann nur ein Eintrag in der TreeView markiert werden.
      const markedTreeItemId = this.markedTreeItems[0];
      const markedTreeItem = this.createFlatAbfrageTreeItem(this.abfrageTreeItems).find(
        (abfrageTreeItem) => abfrageTreeItem.id === markedTreeItemId
      );
      if (!_.isNil(markedTreeItemId) && !_.isNil(markedTreeItem)) {
        if (this.isAbfrageTreeItemAnAbfrage(markedTreeItem)) {
          this.selectAbfrage(markedTreeItem);
        } else if (this.isAbfrageTreeItemAnAbfragevariante(markedTreeItem)) {
          this.selectAbfragevariante(markedTreeItem);
        } else if (this.isAbfrageTreeItemAnBauabschnitt(markedTreeItem)) {
          this.selectBauabschnitt(markedTreeItem);
        }
      }
    }
  }

  get treeItemIdsToOpen(): Array<number> {
    return this.createTreeItemIds(this.abfrageTreeItems);
  }

  get nameTreeElementAbfrage(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ABFRAGE;
  }

  /*
  get nameTreeElementListAbfragevarianten(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_LIST_ABFRAGEVARIANTEN;
  }
  */

  get nameTreeElementAddAbfragevariante(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ADD_NEW_ABFRAGEVARIANTE;
  }

  /*
  get nameTreeElementListBauabschnitte(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_LIST_BAUABSCHNITTE;
  }
  */

  get nameTreeElementAddBauabschnitt(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ADD_NEW_BAUABSCHNITT;
  }

  private getNameTreeElementAbfragevariante(abfragevariante: AbfragevarianteDto): string {
    return `${AbfrageNavigationTree.START_NAME_ABFRAGEVARIANTE}${abfragevariante.abfragevariantenNr}\xa0\xa0\xa0\xa0${
      _.isNil(abfragevariante.realisierungVon) ? AbfrageNavigationTree.NICHT_GEPFLEGT : abfragevariante.realisierungVon
    }\xa0-\xa0${
      _.isNil(abfragevariante.realisierungBis) ? AbfrageNavigationTree.NICHT_GEPFLEGT : abfragevariante.realisierungBis
    }`;
  }

  private getNameTreeElementBauabschnitt(bauabschnitt: BauabschnittDto): string {
    return `${bauabschnitt.bezeichnung}`;
  }

  /**
   * Erstellt die AbfrageTreeItems auf Basis der Abfrage.
   * Jedes AbfrageTreeItem referenziert das in der Treeview darzustellende Objekt.
   *
   * @param abfrage zur Erstellung der AbfrageTreeItems
   */
  public createAbfrageTreeItems(abfrage: InfrastrukturabfrageModel): Array<AbfrageTreeItem> {
    const abfrageTreeItems: Array<AbfrageTreeItem> = [];
    let itemKey = 0;

    const abfrageRootTreeItem = this.createRootAbfrageTreeItem(itemKey++, abfrage);
    abfrageTreeItems.push(abfrageRootTreeItem);

    //const abfragevariantenRootTreeItem = this.createRootAbfragevariantenTreeItem(itemKey++);
    //abfrageTreeItems.push(abfragevariantenRootTreeItem);

    abfrage.abfragevarianten.forEach((abfragevariante) => {
      let abfragevarianteTreeItem = this.createAbfragevarianteTreeItem(itemKey++, abfragevariante);
      if (!_.isNil(abfragevariante.bauabschnitte) && abfragevariante.bauabschnitte.length > 0) {
        abfragevariante.bauabschnitte.forEach((bauabschnitt) => {
          abfragevarianteTreeItem.children.push(
            this.createBauabschnittTreeItem(itemKey++, abfragevariante, bauabschnitt)
          );
        });
      }
      abfragevarianteTreeItem.children.push(this.createAddBauabschnittTreeItem(itemKey++, abfragevariante));
      abfrageRootTreeItem.children.push(abfragevarianteTreeItem);
    });

    if (abfrage.abfragevarianten.length < AbfrageNavigationTree.MAX_NUMBER_ABFRAGEVARIANTEN) {
      abfrageRootTreeItem.children.push(this.createAddAbfragevarianteTreeItem(itemKey++));
    }

    return abfrageTreeItems;
  }

  private createRootAbfrageTreeItem(id: number, abfrage: InfrastrukturabfrageDto) {
    return this.createAbfrageTreeItem(id, this.nameTreeElementAbfrage, abfrage, undefined, undefined);
  }

  /*
  private createRootAbfragevariantenTreeItem(id: number) {
    return this.createAbfrageTreeItem(id, this.nameTreeElementListAbfragevarianten, undefined, undefined, undefined);
  }
  */

  private createAbfragevarianteTreeItem(id: number, abfragevariante: AbfragevarianteDto) {
    return this.createAbfrageTreeItem(
      id,
      this.getNameTreeElementAbfragevariante(abfragevariante),
      undefined,
      abfragevariante,
      undefined
    );
  }

  private createAddAbfragevarianteTreeItem(id: number) {
    return this.createAbfrageTreeItem(id, this.nameTreeElementAddAbfragevariante, undefined, undefined, undefined);
  }

  /*
  private createRootBauabschnitteTreeItem(id: number) {
    return this.createAbfrageTreeItem(id, this.nameTreeElementListBauabschnitte, undefined, undefined, undefined);
  }
  */

  private createBauabschnittTreeItem(id: number, abfragevariante: AbfragevarianteDto, bauabschnitt: BauabschnittDto) {
    return this.createAbfrageTreeItem(
      id,
      this.getNameTreeElementBauabschnitt(bauabschnitt),
      undefined,
      abfragevariante,
      bauabschnitt
    );
  }

  private createAddBauabschnittTreeItem(id: number, abfragevariante: AbfragevarianteDto) {
    return this.createAbfrageTreeItem(id, this.nameTreeElementAddBauabschnitt, undefined, abfragevariante, undefined);
  }

  private createAbfrageTreeItem(
    id: number,
    name: string,
    abfrage: InfrastrukturabfrageDto | undefined,
    abfragevariante: AbfragevarianteDto | undefined,
    bauabschnitt: BauabschnittDto | undefined
  ) {
    const abfrageTreeItem: AbfrageTreeItem = {
      id: id,
      name: name,
      children: [],
      abfrage: abfrage,
      abfragevariante: abfragevariante,
      bauabschnitt: bauabschnitt,
      changed: false,
    };
    return abfrageTreeItem;
  }

  /**
   * Markiert jedes Element im Parameter newAbfrageTreeItems als geändert, falls sich zur Referenz im Parameter
   * oldAbfrageTreeItems eine Änderung ergeben hat.
   *
   * @param newAbfrageTreeItems zum Prüfen auf Änderung
   * @param oldAbfrageTreeItems welche als Referenz zur Änderungsprüfung herangezogen werden
   */
  private markNewAbfrageTreeItemsAsChanged(
    newAbfrageTreeItems: Array<AbfrageTreeItem>,
    oldAbfrageTreeItems: Array<AbfrageTreeItem>
  ): void {
    const flatNewAbfrageTreeItems = this.createFlatAbfrageTreeItem(newAbfrageTreeItems).filter(
      this.isAbfrageTreeItemAnSelectableItem
    );
    const flatOldAbfrageTreeItems = this.createFlatAbfrageTreeItem(oldAbfrageTreeItems).filter(
      this.isAbfrageTreeItemAnSelectableItem
    );
    flatNewAbfrageTreeItems.forEach((newAbfrageTreeItem) => {
      // Grundannahme: Es hat sich eine Änderung ergeben.
      newAbfrageTreeItem.changed = true;
      flatOldAbfrageTreeItems.forEach((oldAbfrageTreeItem) => {
        /*
          notChanged == true -> So existiert im neuen AbfrageItem ein referenziertes Objekt,
          welches mit dem referenzierten Objekt im alten AbfrageItem identisch ist.
          Folglich hat sich keine Änderung ergeben.
         */
        const notChanged = this.isNotChanged(newAbfrageTreeItem, oldAbfrageTreeItem);
        if (notChanged) {
          newAbfrageTreeItem.changed = false;
        }
      });
    });
  }

  /**
   * Prüft auf Basis von flachen Kopien der in den Parametern referenzierten Objekten, ob diese gleich sind.
   * Bei Gleichheit der flachen Kopien hat sich keine Änderung ergeben.
   *
   * Bei der Prüfung auf gleichheit werden z.B. bei der Abfrage die referenzierten Abfragevarianten ignoriert.
   * Die Prüfung auf Gleichheit wird bei der Abfrage z.B. nur auf Basis von nichtreferenziellen Attributen durchgeführt.
   *
   * @param newAbfrageTreeItem zum Prüfen auf Änderung
   * @param oldAbfrageTreeItem welche als Referenz zur Änderungsprüfung herangezogen werden
   * @return true falls sich keine Änderung ergeben hat, andernfalls false
   */
  private isNotChanged(newAbfrageTreeItem: AbfrageTreeItem, oldAbfrageTreeItem: AbfrageTreeItem): boolean {
    let notChanged = false;
    let clonedNewAbfrageTreeItem = _.cloneDeep(newAbfrageTreeItem);
    let clonedOldAbfrageTreeItem = _.cloneDeep(oldAbfrageTreeItem);

    if (
      this.isAbfrageTreeItemAnAbfrage(clonedNewAbfrageTreeItem) &&
      this.isAbfrageTreeItemAnAbfrage(clonedOldAbfrageTreeItem)
    ) {
      return this.isNotChangedAbfrage(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
    } else if (
      this.isAbfrageTreeItemAnAbfragevariante(clonedNewAbfrageTreeItem) &&
      this.isAbfrageTreeItemAnAbfragevariante(clonedOldAbfrageTreeItem)
    ) {
      return this.isNotChangedAbfragevariante(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
    } else if (
      this.isAbfrageTreeItemAnBauabschnitt(clonedNewAbfrageTreeItem) &&
      this.isAbfrageTreeItemAnBauabschnitt(clonedOldAbfrageTreeItem)
    ) {
      return this.isNotChangedBauabschnitt(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
    }
    return notChanged;
  }

  private isNotChangedAbfrage(
    clonedNewAbfrageTreeItem: AbfrageTreeItem,
    clonedOldAbfrageTreeItem: AbfrageTreeItem
  ): boolean {
    // Entfernen der Abfragevarianten aus Klon zur Vermeidung eines isEqual bei Abfragevarianten.
    if (!_.isNil(clonedNewAbfrageTreeItem.abfrage)) clonedNewAbfrageTreeItem.abfrage.abfragevarianten = [];
    if (!_.isNil(clonedOldAbfrageTreeItem.abfrage)) clonedOldAbfrageTreeItem.abfrage.abfragevarianten = [];
    return (
      !_.isNil(clonedNewAbfrageTreeItem.abfrage) &&
      !_.isNil(clonedNewAbfrageTreeItem.abfrage.id) &&
      _.isEqual(clonedNewAbfrageTreeItem.abfrage, clonedOldAbfrageTreeItem.abfrage)
    );
  }

  private isNotChangedAbfragevariante(
    clonedNewAbfrageTreeItem: AbfrageTreeItem,
    clonedOldAbfrageTreeItem: AbfrageTreeItem
  ): boolean {
    // Entfernen der Bauabschnitte aus Klon zur Vermeidung eines isEqual bei Bauabschnitten.
    if (!_.isNil(clonedNewAbfrageTreeItem.abfragevariante)) clonedNewAbfrageTreeItem.abfragevariante.bauabschnitte = [];
    if (!_.isNil(clonedOldAbfrageTreeItem.abfragevariante)) clonedOldAbfrageTreeItem.abfragevariante.bauabschnitte = [];
    return (
      !_.isNil(clonedNewAbfrageTreeItem.abfragevariante) &&
      !_.isNil(clonedNewAbfrageTreeItem.abfragevariante.id) &&
      _.isEqual(clonedNewAbfrageTreeItem.abfragevariante, clonedOldAbfrageTreeItem.abfragevariante)
    );
  }

  private isNotChangedBauabschnitt(
    clonedNewAbfrageTreeItem: AbfrageTreeItem,
    clonedOldAbfrageTreeItem: AbfrageTreeItem
  ): boolean {
    // Entfernen der Baugebiete aus Klon zur Vermeidung eines isEqual bei Baugebieten.
    if (!_.isNil(clonedNewAbfrageTreeItem.bauabschnitt)) clonedNewAbfrageTreeItem.bauabschnitt.baugebiete = [];
    if (!_.isNil(clonedOldAbfrageTreeItem.bauabschnitt)) clonedOldAbfrageTreeItem.bauabschnitt.baugebiete = [];
    return (
      !_.isNil(clonedNewAbfrageTreeItem.bauabschnitt) &&
      !_.isNil(clonedNewAbfrageTreeItem.bauabschnitt.id) &&
      _.isEqual(clonedNewAbfrageTreeItem.bauabschnitt, clonedOldAbfrageTreeItem.bauabschnitt)
    );
  }

  private isAbfrageTreeItemAnAbfrage(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.name === AbfrageNavigationTree.NAME_TREE_ELEMENT_ABFRAGE;
  }

  private isAbfrageTreeItemAnAbfragevariante(abfrageTreeItem: AbfrageTreeItem): boolean {
    return _.startsWith(abfrageTreeItem.name, AbfrageNavigationTree.START_NAME_ABFRAGEVARIANTE);
  }

  private isAbfrageTreeItemAnBauabschnitt(abfrageTreeItem: AbfrageTreeItem): boolean {
    return !_.isNil(abfrageTreeItem.bauabschnitt);
  }

  private isAbfrageTreeItemAnSelectableItem(abfrageTreeItem: AbfrageTreeItem): boolean {
    return (
      this.isAbfrageTreeItemAnAbfrage(abfrageTreeItem) ||
      this.isAbfrageTreeItemAnAbfragevariante(abfrageTreeItem) ||
      this.isAbfrageTreeItemAnBauabschnitt(abfrageTreeItem)
    );
  }

  private createFlatAbfrageTreeItem(abfrageTreeItems: Array<AbfrageTreeItem>): Array<AbfrageTreeItem> {
    return abfrageTreeItems.flatMap((abfrageTreeItem) => {
      const flatChildren = this.createFlatAbfrageTreeItem(abfrageTreeItem.children);
      flatChildren.push(abfrageTreeItem);
      return flatChildren;
    });
  }

  private createTreeItemIds(abfrageTreeItems: Array<AbfrageTreeItem>): Array<number> {
    return this.createFlatAbfrageTreeItem(abfrageTreeItems).map((abfrageTreeItem) => abfrageTreeItem.id);
  }

  @Emit()
  private selectAbfrage(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private selectAbfragevariante(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private deleteAbfragevariante(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private createNewAbfragevariante(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private selectBauabschnitt(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private deleteBauabschnitt(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private createNewBauabschnitt(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }
}
</script>

<style scoped></style>

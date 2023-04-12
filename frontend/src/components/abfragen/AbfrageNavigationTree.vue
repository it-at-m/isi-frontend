<template>
  <v-container>
    <v-row class="justify-start">
      <v-col>
        <v-treeview
          id="abfrage_navigation_tree_treeview"
          :active.sync="markedTreeItems"
          :open.sync="treeItemIdsToOpen"
          :items="abfrageTreeItems"
          activatable
          active-class="font-weight-black v-treeview-node--active"
        >
          <template #prepend="{ item }">
            <v-icon v-if="item.changed"> mdi-exclamation</v-icon>
          </template>
          <template #append="{ item }">
            <v-btn
              v-if="isAbfrageTreeItemAddAbfragevariante(item)"
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
              v-else-if="isAbfrageTreeItemAddBauabschnitt(item)"
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
            <v-btn
              v-else-if="isAbfrageTreeItemAddBaugebiet(item)"
              :id="'abfrage_navigation_tree_button_create_new_baugebiet_' + item.id"
              icon
              @click="createNewBaugebiet(item)"
            >
              <v-icon> mdi-plus-box-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isAbfrageTreeItemAnBaugebiet(item)"
              :id="'abfrage_navigation_tree_button_delete_baugebiet_' + item.id"
              icon
              @click="deleteBaugebiet(item)"
            >
              <v-icon> mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isAbfrageTreeItemAddBaurate(item)"
              :id="'abfrage_navigation_tree_button_create_new_baurate_' + item.id"
              icon
              @click="createNewBaurate(item)"
            >
              <v-icon> mdi-plus-box-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isAbfrageTreeItemAnBaurate(item)"
              :id="'abfrage_navigation_tree_button_delete_baurate_' + item.id"
              icon
              @click="deleteBaurate(item)"
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
import {
  AbfragevarianteDto,
  InfrastrukturabfrageDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
} from "@/api/api-client/isi-backend";
import InfrastrukturabfrageWrapperModel from "@/types/model/abfrage/InfrastrukturabfrageWrapperModel";

enum AbfrageTreeItemType {
  ABFRAGE,
  ABFRAGEVARIANTE,
  ADD_ABFRAGEVARIANTE,
  BAUABSCHNITT,
  ADD_BAUABSCHNITT,
  BAUGEBIET,
  ADD_BAUGEBIET,
  BAURATE,
  ADD_BAURATE,
}

export interface AbfrageTreeItem {
  id: number;

  name: string;

  type: AbfrageTreeItemType;

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
   * Referenziert den in der Treeview darzustellenden Bauabschnitt.
   */
  bauabschnitt: BauabschnittDto | undefined;

  /**
   * Referenziert das in der Treeview darzustellende Bauagebiet.
   */
  baugebiet: BaugebietDto | undefined;

  /**
   * Referenziert die in der Treeview darzustellende Baurate.
   */
  baurate: BaurateDto | undefined;

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

  private static readonly NAME_TREE_ELEMENT_ADD_NEW_ABFRAGEVARIANTE: string = "Abfragevariante anlegen";

  private static readonly START_NAME_ABFRAGEVARIANTE: string = "Nr.: ";

  private static readonly NAME_TREE_ELEMENT_ADD_NEW_BAUABSCHNITT: string = "Bauabschnitt anlegen";

  private static readonly NAME_TREE_ELEMENT_ADD_NEW_BAUGEBIET: string = "Baugebiet anlegen";

  private static readonly NAME_TREE_ELEMENT_ADD_NEW_BAURATE: string = "Baurate anlegen";

  @VModel({ type: InfrastrukturabfrageWrapperModel }) infrastrukturabfrageWrapped!: InfrastrukturabfrageWrapperModel;

  private initialAbfrageTreeItems: Array<AbfrageTreeItem> = [];

  private abfrageTreeItems: Array<AbfrageTreeItem> = [];

  private markedTreeItems: Array<number> = [];

  private treeItemKey = 0;

  private abfrageTreeItemsToOpen: Array<number> = [];

  /**
   * Der Watcher reagiert, falls sich der übergebene AbfrageWrapper ändert oder durch einen Neuen ersetzt wird.
   * Hat das Attribut "initial" die Ausprägung true, so wird eine Kopie der AbfrageTreeItems erstellt,
   * welche als Referenz zur Erkennung von möglichen Änderungen der in den AbfrageTreeItems referenzierten Objekten dient.
   */
  @Watch("infrastrukturabfrageWrapped", { deep: true })
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
        } else if (this.isAbfrageTreeItemAnBaugebiet(markedTreeItem)) {
          this.selectBaugebiet(markedTreeItem);
        } else if (this.isAbfrageTreeItemAnBaurate(markedTreeItem)) {
          this.selectBaurate(markedTreeItem);
        }
      }
    }
  }

  public initializTreeItemsToOpen(): void {
    this.abfrageTreeItemsToOpen = [];
  }

  get treeItemIdsToOpen(): Array<number> {
    return this.abfrageTreeItemsToOpen;
  }

  set treeItemIdsToOpen(treeItemIds: Array<number>) {
    this.abfrageTreeItemsToOpen = treeItemIds;
  }

  get nameTreeElementAbfrage(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ABFRAGE;
  }

  get nameTreeElementAddAbfragevariante(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ADD_NEW_ABFRAGEVARIANTE;
  }

  get nameTreeElementAddBauabschnitt(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ADD_NEW_BAUABSCHNITT;
  }

  get nameTreeElementAddBaugebiet(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ADD_NEW_BAUGEBIET;
  }

  get nameTreeElementAddBaurate(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ADD_NEW_BAURATE;
  }

  private getNameTreeElementAbfragevariante(abfragevariante: AbfragevarianteDto): string {
    return `${AbfrageNavigationTree.START_NAME_ABFRAGEVARIANTE}${abfragevariante.abfragevariantenNr}\xa0-\xa0${
      _.isNil(abfragevariante.abfragevariantenName)
        ? AbfrageNavigationTree.NICHT_GEPFLEGT
        : abfragevariante.abfragevariantenName
    }`;
  }

  private getNameTreeElementBauabschnitt(bauabschnitt: BauabschnittDto): string {
    return _.isEmpty(bauabschnitt.bezeichnung) ? AbfrageNavigationTree.NICHT_GEPFLEGT : `${bauabschnitt.bezeichnung}`;
  }

  private getNameTreeElementBaugebiet(baugebiet: BaugebietDto): string {
    return _.isEmpty(baugebiet.bezeichnung) ? AbfrageNavigationTree.NICHT_GEPFLEGT : `${baugebiet.bezeichnung}`;
  }

  private getNameTreeElementBaurate(baurate: BaurateDto): string {
    return _.isNil(baurate.jahr) || Number.isNaN(baurate.jahr)
      ? AbfrageNavigationTree.NICHT_GEPFLEGT
      : `${baurate.jahr}`;
  }

  /**
   * Erstellt die AbfrageTreeItems auf Basis der Abfrage.
   * Jedes AbfrageTreeItem referenziert das in der Treeview darzustellende Objekt.
   *
   * @param abfrage zur Erstellung der AbfrageTreeItems
   */
  public createAbfrageTreeItems(abfrage: InfrastrukturabfrageModel): Array<AbfrageTreeItem> {
    const abfrageTreeItems: Array<AbfrageTreeItem> = [];
    this.treeItemKey = 0;

    const abfrageRootTreeItem = this.createRootAbfrageTreeItem(this.treeItemKey++, abfrage);
    abfrageTreeItems.push(abfrageRootTreeItem);
    if (this.abfrageTreeItemsToOpen.length === 0) {
      // initial mit Root-Element Id füllen. Danach erfolgt Aktualisierung über "set treeItemIdsToOpen"
      this.abfrageTreeItemsToOpen.push(abfrageRootTreeItem.id);
    }
    this.createAbfragevariantenTreeItems(abfrageRootTreeItem, abfrage);

    return abfrageTreeItems;
  }

  private createRootAbfrageTreeItem(id: number, abfrage: InfrastrukturabfrageDto) {
    return this.createAbfrageTreeItem(
      id,
      this.nameTreeElementAbfrage,
      AbfrageTreeItemType.ABFRAGE,
      abfrage,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }

  private createAbfragevariantenTreeItems(parentTreeItem: AbfrageTreeItem, abfrage: InfrastrukturabfrageDto) {
    abfrage.abfragevarianten.forEach((abfragevariante) => {
      let abfragevarianteTreeItem = this.createAbfragevarianteTreeItem(this.treeItemKey++, abfrage, abfragevariante);
      this.createBauabschnitteTreeItems(abfragevarianteTreeItem, abfrage, abfragevariante);
      parentTreeItem.children.push(abfragevarianteTreeItem);
    });
    if (abfrage.abfragevarianten.length < AbfrageNavigationTree.MAX_NUMBER_ABFRAGEVARIANTEN) {
      parentTreeItem.children.push(this.createAddAbfragevarianteTreeItem(this.treeItemKey++, abfrage));
    }
  }

  private createBauabschnitteTreeItems(
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto
  ) {
    if (!_.isNil(abfragevariante.bauabschnitte)) {
      abfragevariante.bauabschnitte.forEach((bauabschnitt) => {
        let bauabschnittTreeItem = this.createBauabschnittTreeItem(
          this.treeItemKey++,
          abfrage,
          abfragevariante,
          bauabschnitt
        );
        parentTreeItem.children.push(bauabschnittTreeItem);
        this.createBaugebieteTreeItems(bauabschnittTreeItem, abfrage, abfragevariante, bauabschnitt);
      });
    }
    parentTreeItem.children.push(this.createAddBauabschnittTreeItem(this.treeItemKey++, abfrage, abfragevariante));
  }

  private createBaugebieteTreeItems(
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto
  ) {
    bauabschnitt.baugebiete.forEach((baugebiet) => {
      let baugebietTreeItem = this.createBaugebietTreeItem(
        this.treeItemKey++,
        abfrage,
        abfragevariante,
        bauabschnitt,
        baugebiet
      );
      parentTreeItem.children.push(baugebietTreeItem);
      this.createBauratenTreeItems(baugebietTreeItem, abfrage, abfragevariante, bauabschnitt, baugebiet);
    });
    parentTreeItem.children.push(
      this.createAddBaugebietTreeItem(this.treeItemKey++, abfrage, abfragevariante, bauabschnitt)
    );
  }

  private createBauratenTreeItems(
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto,
    baugebiet: BaugebietDto
  ) {
    baugebiet.bauraten.forEach((baurate) => {
      let baurateTreeItem = this.createBaurateTreeItem(
        this.treeItemKey++,
        abfrage,
        abfragevariante,
        bauabschnitt,
        baugebiet,
        baurate
      );
      parentTreeItem.children.push(baurateTreeItem);
    });
    parentTreeItem.children.push(
      this.createAddBaurateTreeItem(this.treeItemKey++, abfrage, abfragevariante, bauabschnitt, baugebiet)
    );
  }

  private createAbfragevarianteTreeItem(
    id: number,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      this.getNameTreeElementAbfragevariante(abfragevariante),
      AbfrageTreeItemType.ABFRAGEVARIANTE,
      abfrage,
      abfragevariante,
      undefined,
      undefined,
      undefined
    );
  }

  private createAddAbfragevarianteTreeItem(id: number, abfrage: InfrastrukturabfrageDto) {
    return this.createAbfrageTreeItem(
      id,
      this.nameTreeElementAddAbfragevariante,
      AbfrageTreeItemType.ADD_ABFRAGEVARIANTE,
      abfrage,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }

  private createBauabschnittTreeItem(
    id: number,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      this.getNameTreeElementBauabschnitt(bauabschnitt),
      AbfrageTreeItemType.BAUABSCHNITT,
      abfrage,
      abfragevariante,
      bauabschnitt,
      undefined,
      undefined
    );
  }

  private createAddBauabschnittTreeItem(
    id: number,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      this.nameTreeElementAddBauabschnitt,
      AbfrageTreeItemType.ADD_BAUABSCHNITT,
      abfrage,
      abfragevariante,
      undefined,
      undefined,
      undefined
    );
  }

  private createBaugebietTreeItem(
    id: number,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto,
    baugebiet: BaugebietDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      this.getNameTreeElementBaugebiet(baugebiet),
      AbfrageTreeItemType.BAUGEBIET,
      abfrage,
      abfragevariante,
      bauabschnitt,
      baugebiet,
      undefined
    );
  }

  private createAddBaugebietTreeItem(
    id: number,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      this.nameTreeElementAddBaugebiet,
      AbfrageTreeItemType.ADD_BAUGEBIET,
      abfrage,
      abfragevariante,
      bauabschnitt,
      undefined,
      undefined
    );
  }

  private createBaurateTreeItem(
    id: number,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto,
    baugebiet: BaugebietDto,
    baurate: BaurateDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      this.getNameTreeElementBaurate(baurate),
      AbfrageTreeItemType.BAURATE,
      abfrage,
      abfragevariante,
      bauabschnitt,
      baugebiet,
      baurate
    );
  }

  private createAddBaurateTreeItem(
    id: number,
    abfrage: InfrastrukturabfrageDto,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto,
    baugebiet: BaugebietDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      this.nameTreeElementAddBaurate,
      AbfrageTreeItemType.ADD_BAURATE,
      abfrage,
      abfragevariante,
      bauabschnitt,
      baugebiet,
      undefined
    );
  }

  private createAbfrageTreeItem(
    id: number,
    name: string,
    type: AbfrageTreeItemType,
    abfrage: InfrastrukturabfrageDto | undefined,
    abfragevariante: AbfragevarianteDto | undefined,
    bauabschnitt: BauabschnittDto | undefined,
    baugebiet: BaugebietDto | undefined,
    baurate: BaurateDto | undefined
  ) {
    const abfrageTreeItem: AbfrageTreeItem = {
      id: id,
      name: name,
      type: type,
      children: [],
      abfrage: abfrage,
      abfragevariante: abfragevariante,
      bauabschnitt: bauabschnitt,
      baugebiet: baugebiet,
      baurate: baurate,
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
    } else if (
      this.isAbfrageTreeItemAnBaugebiet(clonedNewAbfrageTreeItem) &&
      this.isAbfrageTreeItemAnBaugebiet(clonedOldAbfrageTreeItem)
    ) {
      return this.isNotChangedBaugebiet(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
    } else if (
      this.isAbfrageTreeItemAnBaurate(clonedNewAbfrageTreeItem) &&
      this.isAbfrageTreeItemAnBaurate(clonedOldAbfrageTreeItem)
    ) {
      return this.isNotChangedBaurate(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
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

  private isNotChangedBaugebiet(
    clonedNewAbfrageTreeItem: AbfrageTreeItem,
    clonedOldAbfrageTreeItem: AbfrageTreeItem
  ): boolean {
    // Entfernen der Bauraten aus Klon zur Vermeidung eines isEqual bei Bauraten.
    if (!_.isNil(clonedNewAbfrageTreeItem.baugebiet)) clonedNewAbfrageTreeItem.baugebiet.bauraten = [];
    if (!_.isNil(clonedOldAbfrageTreeItem.baugebiet)) clonedOldAbfrageTreeItem.baugebiet.bauraten = [];
    return (
      !_.isNil(clonedNewAbfrageTreeItem.baugebiet) &&
      !_.isNil(clonedNewAbfrageTreeItem.baugebiet.id) &&
      _.isEqual(clonedNewAbfrageTreeItem.baugebiet, clonedOldAbfrageTreeItem.baugebiet)
    );
  }

  private isNotChangedBaurate(
    clonedNewAbfrageTreeItem: AbfrageTreeItem,
    clonedOldAbfrageTreeItem: AbfrageTreeItem
  ): boolean {
    return (
      !_.isNil(clonedNewAbfrageTreeItem.baurate) &&
      !_.isNil(clonedNewAbfrageTreeItem.baurate.id) &&
      _.isEqual(clonedNewAbfrageTreeItem.baurate, clonedOldAbfrageTreeItem.baurate)
    );
  }

  private isAbfrageTreeItemAnAbfrage(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ABFRAGE;
  }

  private isAbfrageTreeItemAnAbfragevariante(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ABFRAGEVARIANTE;
  }

  private isAbfrageTreeItemAddAbfragevariante(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ADD_ABFRAGEVARIANTE;
  }

  private isAbfrageTreeItemAnBauabschnitt(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.BAUABSCHNITT;
  }

  private isAbfrageTreeItemAddBauabschnitt(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ADD_BAUABSCHNITT;
  }

  private isAbfrageTreeItemAnBaugebiet(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.BAUGEBIET;
  }

  private isAbfrageTreeItemAddBaugebiet(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ADD_BAUGEBIET;
  }

  private isAbfrageTreeItemAnBaurate(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.BAURATE;
  }

  private isAbfrageTreeItemAddBaurate(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ADD_BAURATE;
  }

  private isAbfrageTreeItemAnSelectableItem(abfrageTreeItem: AbfrageTreeItem): boolean {
    return (
      this.isAbfrageTreeItemAnAbfrage(abfrageTreeItem) ||
      this.isAbfrageTreeItemAnAbfragevariante(abfrageTreeItem) ||
      this.isAbfrageTreeItemAnBauabschnitt(abfrageTreeItem) ||
      this.isAbfrageTreeItemAnBaugebiet(abfrageTreeItem) ||
      this.isAbfrageTreeItemAnBaurate(abfrageTreeItem)
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

  @Emit()
  private selectBaugebiet(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private deleteBaugebiet(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private createNewBaugebiet(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }
  @Emit()
  private selectBaurate(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private deleteBaurate(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private createNewBaurate(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }
}
</script>

<style scoped></style>

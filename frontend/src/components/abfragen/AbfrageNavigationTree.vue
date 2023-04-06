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
import { AbfragevarianteDto, InfrastrukturabfrageDto } from "@/api/api-client/isi-backend";
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
   * True falls das referenzierte Objekt geändert wurde, andernfalls false.
   */
  changed: boolean;
}

@Component
export default class AbfrageNavigationTree extends Vue {
  private static readonly MAX_NUMBER_ABFRAGEVARIANTEN: number = 5;

  private static readonly NICHT_GEPFLEGT: string = "NICHT GEPFLEGT";

  private static readonly NAME_TREE_ELEMENT_ADD_NEW_ABFRAGEVARIANTE: string = "Abfragevariante anlegen";

  private static readonly NAME_TREE_ELEMENT_LIST_ABFRAGEVARIANTEN: string = "Abfragevarianten";

  private static readonly NAME_TREE_ELEMENT_ABFRAGE: string = "Abfrage";

  private static readonly START_NAME_ABFRAGEVARIANTE: string = "Nr: ";

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
        if (this.isAbfrageTreeItemAnAbfragevariante(markedTreeItem)) {
          this.selectAbfragevariante(markedTreeItem);
        } else if (this.isAbfrageTreeItemAnAbfrage(markedTreeItem)) {
          this.selectAbfrage(markedTreeItem);
        }
      }
    }
  }

  get treeItemIdsToOpen(): Array<number> {
    return this.createTreeItemIds(this.abfrageTreeItems);
  }

  get nameTreeElementAddAbfragevariante(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ADD_NEW_ABFRAGEVARIANTE;
  }

  get nameTreeElementListAbfragevarianten(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_LIST_ABFRAGEVARIANTEN;
  }

  get nameTreeElementAbfrage(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ABFRAGE;
  }

  private getNameTreeElementAbfragevariante(abfragevariante: AbfragevarianteDto): string {
    return `${AbfrageNavigationTree.START_NAME_ABFRAGEVARIANTE}${abfragevariante.abfragevariantenNr}\xa0-\xa0${
      _.isNil(abfragevariante.abfragevariantenName)
        ? AbfrageNavigationTree.NICHT_GEPFLEGT
        : abfragevariante.abfragevariantenName
    }`;
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

    const abfrageTreeItem: AbfrageTreeItem = {
      id: itemKey++,
      name: this.nameTreeElementAbfrage,
      children: [],
      abfrage: abfrage,
      abfragevariante: undefined,
      changed: false,
    };
    abfrageTreeItems.push(abfrageTreeItem);

    const rootAbfragevariantenTreeItem: AbfrageTreeItem = {
      id: itemKey++,
      name: this.nameTreeElementListAbfragevarianten,
      children: [],
      abfrage: undefined,
      abfragevariante: undefined,
      changed: false,
    };
    abfrageTreeItems.push(rootAbfragevariantenTreeItem);

    let abfragevarianteTreeItem: AbfrageTreeItem;
    abfrage.abfragevarianten.forEach((abfragevariante) => {
      abfragevarianteTreeItem = {
        id: itemKey++,
        name: this.getNameTreeElementAbfragevariante(abfragevariante),
        children: [],
        abfrage: undefined,
        abfragevariante: abfragevariante,
        changed: false,
      };
      rootAbfragevariantenTreeItem.children.push(abfragevarianteTreeItem);
    });

    if (abfrage.abfragevarianten.length < AbfrageNavigationTree.MAX_NUMBER_ABFRAGEVARIANTEN) {
      const addAbfragevarianteTreeItem: AbfrageTreeItem = {
        id: itemKey++,
        name: this.nameTreeElementAddAbfragevariante,
        children: [],
        abfrage: undefined,
        abfragevariante: undefined,
        changed: false,
      };
      rootAbfragevariantenTreeItem.children.push(addAbfragevarianteTreeItem);
    }

    return abfrageTreeItems;
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
      this.isAbfrageTreeItemAnAbfragevariante(clonedNewAbfrageTreeItem) &&
      this.isAbfrageTreeItemAnAbfragevariante(clonedOldAbfrageTreeItem)
    ) {
      // Entfernen der Bauabschnitte aus Klon zur Vermeidung eines isEqual bei Bauabschnitten.
      if (!_.isNil(clonedNewAbfrageTreeItem.abfragevariante))
        clonedNewAbfrageTreeItem.abfragevariante.bauabschnitte = [];
      if (!_.isNil(clonedOldAbfrageTreeItem.abfragevariante))
        clonedOldAbfrageTreeItem.abfragevariante.bauabschnitte = [];
      notChanged =
        !_.isNil(clonedNewAbfrageTreeItem.abfragevariante) &&
        !_.isNil(clonedNewAbfrageTreeItem.abfragevariante.id) &&
        _.isEqual(clonedNewAbfrageTreeItem.abfragevariante, clonedOldAbfrageTreeItem.abfragevariante);
    } else if (
      this.isAbfrageTreeItemAnAbfrage(clonedNewAbfrageTreeItem) &&
      this.isAbfrageTreeItemAnAbfrage(clonedOldAbfrageTreeItem)
    ) {
      // Entfernen der Abfragevarianten aus Klon zur Vermeidung eines isEqual bei Abfragevarianten.
      if (!_.isNil(clonedNewAbfrageTreeItem.abfrage)) clonedNewAbfrageTreeItem.abfrage.abfragevarianten = [];
      if (!_.isNil(clonedOldAbfrageTreeItem.abfrage)) clonedOldAbfrageTreeItem.abfrage.abfragevarianten = [];
      notChanged =
        !_.isNil(clonedNewAbfrageTreeItem.abfrage) &&
        !_.isNil(clonedNewAbfrageTreeItem.abfrage.id) &&
        _.isEqual(clonedNewAbfrageTreeItem.abfrage, clonedOldAbfrageTreeItem.abfrage);
    }
    return notChanged;
  }

  private isAbfrageTreeItemAnAbfrage(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.name === AbfrageNavigationTree.NAME_TREE_ELEMENT_ABFRAGE;
  }

  private isAbfrageTreeItemAnAbfragevariante(abfrageTreeItem: AbfrageTreeItem): boolean {
    return _.startsWith(abfrageTreeItem.name, AbfrageNavigationTree.START_NAME_ABFRAGEVARIANTE);
  }

  private isAbfrageTreeItemAnSelectableItem(abfrageTreeItem: AbfrageTreeItem): boolean {
    return this.isAbfrageTreeItemAnAbfrage(abfrageTreeItem) || this.isAbfrageTreeItemAnAbfragevariante(abfrageTreeItem);
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
}
</script>

<style scoped></style>

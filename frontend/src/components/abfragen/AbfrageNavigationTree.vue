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
          return-object
          activatable
          active-class="font-weight-black v-treeview-node--active"
        >
          <template #append="{ item }">
            <v-btn
              v-if="item.name === nameTreeElementAddAbfragevariante"
              :id="'abfrage_navigation_tree_button_create_new_abfragebvariante_' + item.id"
              icon
              @click="createNewAbfragevariante(item)"
            >
              <v-icon>
                mdi-plus-box-outline
              </v-icon>
            </v-btn>
            <v-btn
              v-else-if="isAbfrageTreeItemAnAbfragevariante(item)"
              :id="'abfrage_navigation_tree_button_delete_abfragebvariante_' + item.id"
              icon
              @click="deletionAbfragevariante(item)"
            >
              <v-icon>
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </template>
        </v-treeview>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Emit, VModel, Vue, Watch} from "vue-property-decorator";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import _ from "lodash";
import {AbfragevarianteDto, InfrastrukturabfrageDto} from "@/api/api-client/isi-backend";

export interface AbfrageTreeItem {

  id: number;

  name: string;

  children: Array<AbfrageTreeItem>;

  abfrage: InfrastrukturabfrageDto | undefined;

  abfragevariante: AbfragevarianteDto | undefined;


}

@Component
export default class AbfrageNavigationTree extends Vue {

  private static readonly MAX_NUMBER_ABFRAGEVARIANTEN: number = 5;

  private static readonly NAME_TREE_ELEMENT_ADD_NEW_ABFRAGEVARIANTE: string = "Abfragevariante neu";

  private static readonly NAME_TREE_ELEMENT_LIST_ABFRAGEVARIANTEN: string = "Abfragevarianten";

  private static readonly NAME_TREE_ELEMENT_ABFRAGE: string = "Abfrage";

  private static readonly START_NAME_ABFRAGEVARIANTE: string = "Nr.: ";

  @VModel({type: InfrastrukturabfrageModel}) infrastrukturabfrage!: InfrastrukturabfrageModel;

  private abfrageTreeItems: Array<AbfrageTreeItem> = [];

  private markedTreeItems: Array<AbfrageTreeItem> = [];

  @Watch("infrastrukturabfrage", {immediate: true, deep: true})
  private abfrageChanged(): void {
    if (!_.isNil(this.infrastrukturabfrage)) {
      this.abfrageTreeItems = this.createAbfrageTreeItems(this.infrastrukturabfrage);
    }
  }

  @Watch("markedTreeItems", {immediate: true, deep: true})
  private eventMarkedTreeItemElement(): void {
    if (this.markedTreeItems.length) {
      // Es kann nur ein Eintrag in der TreeView markiert werden.
      const markedTreeItem: AbfrageTreeItem = this.markedTreeItems[0];
      if (!_.isNil(markedTreeItem)) {
        if (this.isAbfrageTreeItemAnAbfragevariante(markedTreeItem)) {
          this.abfragevarianteSelected(markedTreeItem);
        } else if (this.isAbfrageTreeItemAnAbfrage(markedTreeItem)) {
          this.abfrageSelected(markedTreeItem);
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
    return `${AbfrageNavigationTree.START_NAME_ABFRAGEVARIANTE}${abfragevariante.abfragevariantenNr}\xa0\xa0\xa0\xa0${abfragevariante.realisierungVon} - ${abfragevariante.realisierungBis}`;
  }

  public createAbfrageTreeItems(abfrage: InfrastrukturabfrageModel): Array<AbfrageTreeItem> {
    const abfrageTreeItems: Array<AbfrageTreeItem> = [];
    let itemKey = 0;

    let abfrageTreeItem: AbfrageTreeItem = {
      id: itemKey++,
      name: this.nameTreeElementAbfrage,
      children: [],
      abfrage: abfrage,
      abfragevariante: undefined
    };
    abfrageTreeItems.push(abfrageTreeItem);

    abfrageTreeItem = {
      id: itemKey++,
      name: this.nameTreeElementListAbfragevarianten,
      children: [],
      abfrage: undefined,
      abfragevariante: undefined
    };
    abfrageTreeItems.push(abfrageTreeItem);

    let abfragevarianteTreeItem: AbfrageTreeItem;
    abfrage.abfragevarianten.forEach(abfragevariante => {
      abfragevarianteTreeItem = {
        id: itemKey++,
        name: this.getNameTreeElementAbfragevariante(abfragevariante),
        children: [],
        abfrage: undefined,
        abfragevariante: abfragevariante
      };
      abfrageTreeItem.children.push(abfragevarianteTreeItem);
    });

    if (abfrage.abfragevarianten.length < AbfrageNavigationTree.MAX_NUMBER_ABFRAGEVARIANTEN) {
      abfragevarianteTreeItem = {
        id: itemKey++,
        name: this.nameTreeElementAddAbfragevariante,
        children: [],
        abfrage: undefined,
        abfragevariante: undefined
      };
      abfrageTreeItem.children.push(abfragevarianteTreeItem);
    }

    return abfrageTreeItems;
  }

  private isAbfrageTreeItemAnAbfrage(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.name === AbfrageNavigationTree.NAME_TREE_ELEMENT_ABFRAGE;
  }

  private isAbfrageTreeItemAnAbfragevariante(abfrageTreeItem: AbfrageTreeItem): boolean {
    return _.startsWith(abfrageTreeItem.name, AbfrageNavigationTree.START_NAME_ABFRAGEVARIANTE);
  }

  @Emit()
  private abfrageSelected(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private abfragevarianteSelected(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private deletionAbfragevariante(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private createNewAbfragevariante(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  private createTreeItemIds(abfrageTreeItems: Array<AbfrageTreeItem>): Array<number> {
    return abfrageTreeItems.flatMap(abfrageTreeItem => {
      const ids = this.createTreeItemIds(abfrageTreeItem.children);
      ids.push(abfrageTreeItem.id);
      return ids;
    });
  }

}
</script>

<style scoped>

</style>
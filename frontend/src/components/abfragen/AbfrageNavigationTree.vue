<template>
  <v-container>
    <v-row class="justify-start">
      <v-col>
        <v-treeview
          :active.sync="markedTreeItemIds"
          open-all
          activatable
          :items="abfrageTreeItems"
        >
          <template #append="{ item }">
            <v-btn
              v-if="item.name === nameTreeElementAddAbfragevariante"
              icon
            >
              <v-icon>
                mdi-plus-box-outline
              </v-icon>
            </v-btn>
            <v-btn
              v-else-if="isDeletableTreeItem(item)"
              icon
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
import {Component, Vue, Watch} from "vue-property-decorator";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import _ from "lodash";
import {AbfragevarianteDto} from "@/api/api-client/isi-backend";

export interface AbfrageTreeItem {

  id: number;

  name: string;

  children: Array<AbfrageTreeItem>;

  uuid: string | undefined;

}

@Component
export default class AbfrageNavigationTree extends Vue {

  private static readonly NAME_TREE_ELEMENT_ADD_ABFRAGEVARIANTE: string = "Abfragevariante";

  private static readonly NAME_TREE_ELEMENT_LIST_ABFRAGEVARIANTEN: string = "Abfragevarianten";

  private static readonly NAME_TREE_ELEMENT_ABFRAGE: string = "Abfrage";

  private abfrageTreeItems: Array<AbfrageTreeItem> = [];

  private markedTreeItemIds: Array<number> = [];

  @Watch("$store.state.search.selectedAbfrage", {immediate: true, deep: true})
  private selectedAbfrageChanged(): void {
    const abfrageFromStore = this.$store.getters["search/selectedAbfrage"];
    if (!_.isNil(abfrageFromStore)) {
      const abfrage = _.cloneDeep(abfrageFromStore);
      this.abfrageTreeItems = this.createAbfrageTreeItems(abfrage);
    }
  }

  @Watch("markedTreeItemIds", {immediate: true, deep: true})
  private eventmarkedTreeItemElement(): void {
    if (this.markedTreeItemIds.length) {
      // Es kann nur ein Eintrag in der TreeView markiert werden.
      const markedTreeItemId: number = this.markedTreeItemIds[0];
      const markedTreeItemElement = this.abfrageTreeItems.find(abfrageTreeItem => abfrageTreeItem.id === markedTreeItemId);
      console.log(markedTreeItemId);
    }
  }

  get nameTreeElementAddAbfragevariante(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ADD_ABFRAGEVARIANTE;
  }

  get nameTreeElementListAbfragevarianten(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_LIST_ABFRAGEVARIANTEN;
  }

  get nameTreeElementAbfrage(): string {
    return AbfrageNavigationTree.NAME_TREE_ELEMENT_ABFRAGE;
  }

  private getNameTreeElementAbfragevariante(abfragevariante: AbfragevarianteDto): string {
    return `Nr.: ${abfragevariante.abfragevariantenNr} - Realisierung: ${abfragevariante.realisierungVon} bis ${abfragevariante.realisierungBis}`;
  }

  public createAbfrageTreeItems(abfrage: InfrastrukturabfrageModel): Array<AbfrageTreeItem> {
    const abfrageTreeItems: Array<AbfrageTreeItem> = [];
    let itemKey = 0;

    let abfrageTreeItem: AbfrageTreeItem = {
      id: itemKey++,
      name: this.nameTreeElementAbfrage,
      children: [],
      uuid: abfrage.id
    };
    abfrageTreeItems.push(abfrageTreeItem);

    abfrageTreeItem = {
      id: itemKey++,
      name: this.nameTreeElementListAbfragevarianten,
      children: [],
      uuid: undefined
    };
    abfrageTreeItems.push(abfrageTreeItem);

    let abfragevarianteTreeItem: AbfrageTreeItem;
    abfrage.abfragevarianten.forEach(abfragevariante => {
      abfragevarianteTreeItem = {
        id: itemKey++,
        name: this.getNameTreeElementAbfragevariante(abfragevariante),
        children: [],
        uuid: abfragevariante.id
      };
      abfrageTreeItem.children.push(abfragevarianteTreeItem);
    });

    abfragevarianteTreeItem = {
      id: itemKey++,
      name: this.nameTreeElementAddAbfragevariante,
      children: [],
      uuid: undefined
    };
    abfrageTreeItem.children.push(abfragevarianteTreeItem);

    return abfrageTreeItems;
  }

  private isDeletableTreeItem(abfrageTreeItem: AbfrageTreeItem): boolean {
    return _.startsWith(abfrageTreeItem.name, "Nr.:")
        || abfrageTreeItem.name === this.nameTreeElementAbfrage;
  }

}
</script>

<style scoped>

</style>
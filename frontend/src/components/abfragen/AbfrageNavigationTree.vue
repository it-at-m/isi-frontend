<template>
  <v-container>
    <v-row class="justify-start">
      <v-col>
        <v-treeview
          open-all
          :items="abfrageTreeItems"
        >
          <template #append="{ item }">
            <v-icon
              v-if="item.name === `Abfragevariante`"
            >
              mdi-plus-box-outline
            </v-icon>
            <v-icon
              v-else-if="startsWithAbfragevariantenTreeName(item)"
            >
              mdi-trash-can-outline
            </v-icon>
          </template>
        </v-treeview>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import {createInfrastrukturabfrageDto} from "@/utils/Factories";
import _ from "lodash";

export interface AbfrageTreeItem {

  id: number;

  name: string;

  children: Array<AbfrageTreeItem>;

}

@Component
export default class AbfrageNavigationTree extends Vue {

  private abfrage: InfrastrukturabfrageModel = new InfrastrukturabfrageModel(
      createInfrastrukturabfrageDto()
  );


  @Watch("$store.state.search.selectedAbfrage", {immediate: true, deep: true})
  private selectedAbfrageChanged() {
    const abfrageFromStore = this.$store.getters["search/selectedAbfrage"];
    if (!_.isNil(abfrageFromStore)) {
      this.abfrage = _.cloneDeep(abfrageFromStore);
    }
  }

  get abfrageTreeItems(): Array<AbfrageTreeItem> {
    const abfrageTreeItems: Array<AbfrageTreeItem> = [];
    let itemKey = 1;

    let abfrageTreeItem: AbfrageTreeItem = {
      id: itemKey++,
      name: "Abfrage",
      children: []
    };
    abfrageTreeItems.push(abfrageTreeItem);

    abfrageTreeItem = {
      id: itemKey++,
      name: "Abfragevarianten",
      children: []
    };
    abfrageTreeItems.push(abfrageTreeItem);

    let abfragevarianteTreeItem: AbfrageTreeItem;
    this.abfrage.abfragevarianten.forEach(abfragevariante => {
      abfragevarianteTreeItem = {
        id: itemKey++,
        name: `Nr.: ${abfragevariante.abfragevariantenNr} - Realisierung: ${abfragevariante.realisierungVon} bis ${abfragevariante.realisierungBis}`,
        children: []
      };
      abfrageTreeItem.children.push(abfragevarianteTreeItem);
    });

    abfragevarianteTreeItem = {
      id: itemKey++,
      name: `Abfragevariante`,
      children: []

    };
    abfrageTreeItem.children.push(abfragevarianteTreeItem);

    return abfrageTreeItems;
  }

  private startsWithAbfragevariantenTreeName(abfrageTreeItem: AbfrageTreeItem): boolean {
    return _.startsWith(abfrageTreeItem.name, "Nr.:");
  }

}
</script>

<style scoped>

</style>
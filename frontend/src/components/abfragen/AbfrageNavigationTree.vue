<template>
  <v-container>
    <v-row class="justify-start">
      <v-col>
        <v-treeview
          id="abfrage_navigation_tree_treeview"
          ref="abfrageTreeview"
          dense
          :active.sync="markedTreeItems"
          :open.sync="treeItemIdsToOpen"
          :items="abfrageTreeItems"
          active-class="font-weight-black v-treeview-node--active"
        >
          <template #prepend="{ item }">
            <v-icon v-if="item.changed"> mdi-exclamation</v-icon>
          </template>
          <template #label="{ item }">
            <v-tooltip bottom>
              <template #activator="{ on }">
                <a
                  v-on="on"
                  @click="setSelectedTreeItem(item)"
                >
                  {{ item.name }}
                </a>
              </template>
              <span>{{ item.name }}</span>
            </v-tooltip>
          </template>
          <template #append="{ item }">
            <v-tooltip
              v-if="isItemTypeOfAbfragevarianteAndBauratenAreDeterminable(item)"
              bottom
            >
              <template #activator="{ on }">
                <v-btn
                  :id="'abfrage_navigation_tree_button_abfragevariante_determinable_bauraten_' + item.id"
                  icon
                  v-on="on"
                  @click="determineBauratenForAbfragevariante(item)"
                >
                  <v-icon> mdi-calculator</v-icon>
                </v-btn>
              </template>
              <span>Idealtypische Bauraten ermitteln</span>
            </v-tooltip>
            <v-btn
              v-if="isItemTypeOfAddAbfragevariante(item)"
              :id="'abfrage_navigation_tree_button_create_new_abfragevariante_' + item.id"
              icon
              @click="createNewAbfragevariante(item)"
            >
              <v-icon> mdi-plus-box-outline</v-icon>
            </v-btn>
            <div v-else-if="isItemTypeOfAbfragevariante(item)">
              <v-btn
                :id="'abfrage_navigation_tree_button_relevant_abfragevariante_' + item.id"
                :disabled="!isEditableBySachbearbeitung()"
                icon
                @click="setAbfragevarianteRelevant(item)"
              >
                <v-icon v-if="item.abfragevariante.relevant">mdi-bookmark</v-icon>
                <v-icon v-else>mdi-bookmark-outline</v-icon>
              </v-btn>
              <v-btn
                :id="'abfrage_navigation_tree_button_delete_abfragevariante_' + item.id"
                :disabled="!isEditable(item.contextAnzeigeAbfragevariante)"
                icon
                @click="deleteAbfragevariante(item)"
              >
                <v-icon> mdi-trash-can-outline</v-icon>
              </v-btn>
            </div>
            <v-btn
              v-else-if="isItemTypeOfAddBauabschnitt(item)"
              :id="'abfrage_navigation_tree_button_create_new_bauabschnitt_' + item.id"
              icon
              @click="createNewBauabschnitt(item)"
            >
              <v-icon> mdi-plus-box-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isItemTypeOfBauabschnitt(item)"
              :id="'abfrage_navigation_tree_button_delete_bauabschnitt_' + item.id"
              :disabled="!isEditable(item.contextAnzeigeAbfragevariante)"
              icon
              @click="deleteBauabschnitt(item)"
            >
              <v-icon> mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isItemTypeOfAddBaugebiet(item)"
              :id="'abfrage_navigation_tree_button_create_new_baugebiet_' + item.id"
              icon
              @click="createNewBaugebiet(item)"
            >
              <v-icon> mdi-plus-box-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isItemTypeOfBaugebiet(item)"
              :id="'abfrage_navigation_tree_button_delete_baugebiet_' + item.id"
              :disabled="!isEditable(item.contextAnzeigeAbfragevariante)"
              icon
              @click="deleteBaugebiet(item)"
            >
              <v-icon> mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isItemTypeOfAddBaurate(item)"
              :id="'abfrage_navigation_tree_button_create_new_baurate_' + item.id"
              icon
              @click="createNewBaurate(item)"
            >
              <v-icon> mdi-plus-box-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="isItemTypeOfBaurate(item)"
              :id="'abfrage_navigation_tree_button_delete_baurate_' + item.id"
              :disabled="!isEditable(item.contextAnzeigeAbfragevariante)"
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
import { Component, Emit, Mixins, Prop, VModel, Watch } from "vue-property-decorator";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import _ from "lodash";
import {
  AbfragevarianteDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
  InfrastrukturabfrageDto,
} from "@/api/api-client/isi-backend";
import InfrastrukturabfrageWrapperModel from "@/types/model/abfrage/InfrastrukturabfrageWrapperModel";
import AbfrageSecurityMixin from "@/mixins/security/AbfrageSecurityMixin";
import { AnzeigeContext } from "@/views/Abfrage.vue";

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

  parentTreeItem: AbfrageTreeItem | undefined;

  children: Array<AbfrageTreeItem>;

  /**
   * Referenziert die in der Treeview darzustellende Abfrage.
   */
  abfrage: InfrastrukturabfrageDto | undefined;

  /**
   * Der Kontext in welchem die Abfragevariante angezeigt wird.
   */
  contextAnzeigeAbfragevariante: AnzeigeContext | undefined;

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
export default class AbfrageNavigationTree extends Mixins(AbfrageSecurityMixin) {
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

  private newEntityToMark: unknown;

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

  public initializTreeItemsToOpen(): void {
    this.abfrageTreeItemsToOpen = [];
  }

  public setSelectedTreeItem(selectedTreeItem: AbfrageTreeItem): void {
    this.markTreeItem(selectedTreeItem);

    if (this.isItemTypeOfAbfrage(selectedTreeItem)) {
      this.selectAbfrage(selectedTreeItem);
    } else if (this.isItemTypeOfAbfragevariante(selectedTreeItem)) {
      this.selectAbfragevariante(selectedTreeItem);
    } else if (this.isItemTypeOfBauabschnitt(selectedTreeItem)) {
      this.selectBauabschnitt(selectedTreeItem);
    } else if (this.isItemTypeOfBaugebiet(selectedTreeItem)) {
      this.selectBaugebiet(selectedTreeItem);
    } else if (this.isItemTypeOfBaurate(selectedTreeItem)) {
      this.selectBaurate(selectedTreeItem);
    }
  }

  public setNewEntityToMark(entity: unknown): void {
    this.newEntityToMark = entity;
  }

  private markTreeItem(item: AbfrageTreeItem): void {
    if (this.isItemSelectable(item)) {
      this.markedTreeItems = [item.id];
    }
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

  public isEditable(anzeigeContextAbfragevariante: AnzeigeContext | undefined): boolean {
    let isEditable = false;
    if (anzeigeContextAbfragevariante === AnzeigeContext.ABFRAGEVARIANTE) {
      isEditable = this.isEditableByAbfrageerstellung();
    } else if (anzeigeContextAbfragevariante === AnzeigeContext.ABFRAGEVARIANTE_SACHBEARBEITUNG) {
      isEditable = this.isEditableBySachbearbeitung();
    }
    return isEditable;
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
      this.abfrageTreeItemsToOpen.push(abfrageRootTreeItem.id); // initial mit Root-Element Id füllen. Danach erfolgt Aktualisierung über "set treeItemIdsToOpen"
      this.markTreeItem(abfrageRootTreeItem);
    }
    this.createAbfragevariantenTreeItems(
      abfrageRootTreeItem,
      abfrage,
      abfrage.abfragevarianten,
      AnzeigeContext.ABFRAGEVARIANTE
    );
    this.createAbfragevariantenTreeItems(
      abfrageRootTreeItem,
      abfrage,
      abfrage.abfragevariantenSachbearbeitung,
      AnzeigeContext.ABFRAGEVARIANTE_SACHBEARBEITUNG
    );

    return abfrageTreeItems;
  }

  private createRootAbfrageTreeItem(id: number, abfrage: InfrastrukturabfrageDto) {
    return this.createAbfrageTreeItem(
      id,
      undefined,
      this.nameTreeElementAbfrage,
      AbfrageTreeItemType.ABFRAGE,
      abfrage,
      AnzeigeContext.UNDEFINED,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }

  private createAbfragevariantenTreeItems(
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    abfragevarianten: Array<AbfragevarianteDto> | undefined,
    contextAnzeigeAbfragevariante: AnzeigeContext
  ) {
    _.toArray(abfragevarianten).forEach((abfragevariante) => {
      let abfragevarianteTreeItem = this.createAbfragevarianteTreeItem(
        this.treeItemKey++,
        parentTreeItem,
        abfrage,
        contextAnzeigeAbfragevariante,
        abfragevariante
      );
      this.createBauabschnitteTreeItems(
        abfragevarianteTreeItem,
        abfrage,
        contextAnzeigeAbfragevariante,
        abfragevariante
      );
      parentTreeItem.children.push(abfragevarianteTreeItem);
    });
    if (
      this.isEditable(contextAnzeigeAbfragevariante) &&
      _.toArray(abfragevarianten).length < AbfrageNavigationTree.MAX_NUMBER_ABFRAGEVARIANTEN
    ) {
      parentTreeItem.children.push(
        this.createAddAbfragevarianteTreeItem(
          this.treeItemKey++,
          parentTreeItem,
          abfrage,
          contextAnzeigeAbfragevariante
        )
      );
    }
  }

  private createBauabschnitteTreeItems(
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto
  ) {
    if (_.isNil(abfragevariante.bauabschnitte) || abfragevariante.bauabschnitte.length === 0) {
      if (this.isEditable(contextAnzeigeAbfragevariante)) {
        // Fall 1: Keine Bauabschnitte vorhanden -> Bauabschnitt, Baugebiet oder Baurate kann erstellt werden
        parentTreeItem.children.push(
          this.createAddBauabschnittTreeItem(
            this.treeItemKey++,
            parentTreeItem,
            abfrage,
            contextAnzeigeAbfragevariante,
            abfragevariante
          )
        );
        parentTreeItem.children.push(
          this.createAddOrphanedBaugebietTreeItem(
            this.treeItemKey++,
            parentTreeItem,
            abfrage,
            contextAnzeigeAbfragevariante,
            abfragevariante
          )
        );
        parentTreeItem.children.push(
          this.createAddOrphanedBaurateTreeItem(
            this.treeItemKey++,
            parentTreeItem,
            abfrage,
            contextAnzeigeAbfragevariante,
            abfragevariante
          )
        );
      }
    } else {
      const firstBauabschnitt = abfragevariante.bauabschnitte[0];
      if (!firstBauabschnitt.technical) {
        // Fall 2: Nicht-technischer Bauabschnitt vorhanden -> Bauabschnitte werden aufgelistet und können erstellt werden
        abfragevariante.bauabschnitte.forEach((bauabschnitt) => {
          let bauabschnittTreeItem = this.createBauabschnittTreeItem(
            this.treeItemKey++,
            parentTreeItem,
            abfrage,
            contextAnzeigeAbfragevariante,
            abfragevariante,
            bauabschnitt
          );
          parentTreeItem.children.push(bauabschnittTreeItem);
          this.createBaugebieteTreeItems(
            bauabschnittTreeItem,
            abfrage,
            contextAnzeigeAbfragevariante,
            abfragevariante,
            bauabschnitt
          );
        });
        if (this.isEditable(contextAnzeigeAbfragevariante)) {
          parentTreeItem.children.push(
            this.createAddBauabschnittTreeItem(
              this.treeItemKey++,
              parentTreeItem,
              abfrage,
              contextAnzeigeAbfragevariante,
              abfragevariante
            )
          );
        }
      } else {
        // Fall 3: Technischer Bauabschnitt vorhanden -> Baugebiete werden unter Abfragevariente angelegt
        this.createBaugebieteTreeItems(
          parentTreeItem,
          abfrage,
          contextAnzeigeAbfragevariante,
          abfragevariante,
          firstBauabschnitt
        );
      }
    }
  }

  private createBaugebieteTreeItems(
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto
  ) {
    if (bauabschnitt.baugebiete.length === 0) {
      // Fall 1: Keine Baugebiete vorhanden -> Baugebiet kann erstellt werden
      parentTreeItem.children.push(
        this.createAddBaugebietTreeItem(
          this.treeItemKey++,
          parentTreeItem,
          abfrage,
          contextAnzeigeAbfragevariante,
          abfragevariante,
          bauabschnitt
        )
      );
    } else {
      const firstBaugebiet = bauabschnitt.baugebiete[0];
      if (!firstBaugebiet.technical) {
        // Fall 2: Nicht-technisches Bauagebiet vorhanden -> Baugebiete werden aufgelistet und können erstellt werden
        bauabschnitt.baugebiete.forEach((baugebiet) => {
          let bauabschnittTreeItem = this.createBaugebietTreeItem(
            this.treeItemKey++,
            parentTreeItem,
            abfrage,
            contextAnzeigeAbfragevariante,
            abfragevariante,
            bauabschnitt,
            baugebiet
          );
          parentTreeItem.children.push(bauabschnittTreeItem);
          this.createBauratenTreeItems(
            bauabschnittTreeItem,
            abfrage,
            contextAnzeigeAbfragevariante,
            abfragevariante,
            bauabschnitt,
            baugebiet
          );
        });
        if (this.isEditable(contextAnzeigeAbfragevariante)) {
          parentTreeItem.children.push(
            this.createAddBaugebietTreeItem(
              this.treeItemKey++,
              parentTreeItem,
              abfrage,
              contextAnzeigeAbfragevariante,
              abfragevariante,
              bauabschnitt
            )
          );
        }
      } else {
        // Fall 3: Technisches Bauagebiet vorhanden -> Bauraten werden unter Abfragevariente angelegt
        this.createBauratenTreeItems(
          parentTreeItem,
          abfrage,
          contextAnzeigeAbfragevariante,
          abfragevariante,
          bauabschnitt,
          firstBaugebiet
        );
      }
    }
  }

  private createBauratenTreeItems(
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto,
    baugebiet: BaugebietDto
  ) {
    baugebiet.bauraten.forEach((baurate) => {
      let baurateTreeItem = this.createBaurateTreeItem(
        this.treeItemKey++,
        parentTreeItem,
        abfrage,
        contextAnzeigeAbfragevariante,
        abfragevariante,
        bauabschnitt,
        baugebiet,
        baurate
      );
      parentTreeItem.children.push(baurateTreeItem);
    });
    if (this.isEditable(contextAnzeigeAbfragevariante)) {
      parentTreeItem.children.push(
        this.createAddBaurateTreeItem(
          this.treeItemKey++,
          parentTreeItem,
          abfrage,
          contextAnzeigeAbfragevariante,
          abfragevariante,
          bauabschnitt,
          baugebiet
        )
      );
    }
  }

  private createAbfragevarianteTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    conextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto
  ) {
    const item = this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.getNameTreeElementAbfragevariante(abfragevariante),
      AbfrageTreeItemType.ABFRAGEVARIANTE,
      abfrage,
      conextAnzeigeAbfragevariante,
      abfragevariante,
      undefined,
      undefined,
      undefined
    );

    if (abfragevariante === this.newEntityToMark) {
      this.markTreeItem(item);
    }

    return item;
  }

  private createAddAbfragevarianteTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    conextAnzeigeAbfragevariante: AnzeigeContext
  ) {
    return this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.nameTreeElementAddAbfragevariante,
      AbfrageTreeItemType.ADD_ABFRAGEVARIANTE,
      abfrage,
      conextAnzeigeAbfragevariante,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }

  private createBauabschnittTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto
  ) {
    const item = this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.getNameTreeElementBauabschnitt(bauabschnitt),
      AbfrageTreeItemType.BAUABSCHNITT,
      abfrage,
      contextAnzeigeAbfragevariante,
      abfragevariante,
      bauabschnitt,
      undefined,
      undefined
    );

    if (bauabschnitt === this.newEntityToMark) {
      this.markTreeItem(item);
    }

    return item;
  }

  private createAddBauabschnittTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.nameTreeElementAddBauabschnitt,
      AbfrageTreeItemType.ADD_BAUABSCHNITT,
      abfrage,
      contextAnzeigeAbfragevariante,
      abfragevariante,
      undefined,
      undefined,
      undefined
    );
  }

  private createBaugebietTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto,
    baugebiet: BaugebietDto
  ) {
    const item = this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.getNameTreeElementBaugebiet(baugebiet),
      AbfrageTreeItemType.BAUGEBIET,
      abfrage,
      contextAnzeigeAbfragevariante,
      abfragevariante,
      bauabschnitt,
      baugebiet,
      undefined
    );

    if (baugebiet === this.newEntityToMark) {
      this.markTreeItem(item);
    }

    return item;
  }

  private createAddBaugebietTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.nameTreeElementAddBaugebiet,
      AbfrageTreeItemType.ADD_BAUGEBIET,
      abfrage,
      contextAnzeigeAbfragevariante,
      abfragevariante,
      bauabschnitt,
      undefined,
      undefined
    );
  }

  private createAddOrphanedBaugebietTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.nameTreeElementAddBaugebiet,
      AbfrageTreeItemType.ADD_BAUGEBIET,
      abfrage,
      contextAnzeigeAbfragevariante,
      abfragevariante,
      undefined,
      undefined,
      undefined
    );
  }

  private createBaurateTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto,
    baugebiet: BaugebietDto,
    baurate: BaurateDto
  ) {
    const item = this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.getNameTreeElementBaurate(baurate),
      AbfrageTreeItemType.BAURATE,
      abfrage,
      contextAnzeigeAbfragevariante,
      abfragevariante,
      bauabschnitt,
      baugebiet,
      baurate
    );

    if (baurate === this.newEntityToMark) {
      this.markTreeItem(item);
    }

    return item;
  }

  private createAddBaurateTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto,
    bauabschnitt: BauabschnittDto,
    baugebiet: BaugebietDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.nameTreeElementAddBaurate,
      AbfrageTreeItemType.ADD_BAURATE,
      abfrage,
      contextAnzeigeAbfragevariante,
      abfragevariante,
      bauabschnitt,
      baugebiet,
      undefined
    );
  }

  private createAddOrphanedBaurateTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem,
    abfrage: InfrastrukturabfrageDto,
    contextAnzeigeAbfragevariante: AnzeigeContext,
    abfragevariante: AbfragevarianteDto
  ) {
    return this.createAbfrageTreeItem(
      id,
      parentTreeItem,
      this.nameTreeElementAddBaurate,
      AbfrageTreeItemType.ADD_BAURATE,
      abfrage,
      contextAnzeigeAbfragevariante,
      abfragevariante,
      undefined,
      undefined,
      undefined
    );
  }

  private createAbfrageTreeItem(
    id: number,
    parentTreeItem: AbfrageTreeItem | undefined,
    name: string,
    type: AbfrageTreeItemType,
    abfrage: InfrastrukturabfrageDto | undefined,
    contextAnzeigeAbfragevariante: AnzeigeContext | undefined,
    abfragevariante: AbfragevarianteDto | undefined,
    bauabschnitt: BauabschnittDto | undefined,
    baugebiet: BaugebietDto | undefined,
    baurate: BaurateDto | undefined
  ) {
    return {
      id: id,
      parentTreeItem: parentTreeItem,
      name: name,
      type: type,
      children: [],
      abfrage: abfrage,
      contextAnzeigeAbfragevariante: contextAnzeigeAbfragevariante,
      abfragevariante: abfragevariante,
      bauabschnitt: bauabschnitt,
      baugebiet: baugebiet,
      baurate: baurate,
      changed: false,
    } as AbfrageTreeItem;
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
    const flatNewAbfrageTreeItems = this.createFlatAbfrageTreeItem(newAbfrageTreeItems).filter(this.isItemSelectable);
    const flatOldAbfrageTreeItems = this.createFlatAbfrageTreeItem(oldAbfrageTreeItems).filter(this.isItemSelectable);
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

    if (this.isItemTypeOfAbfrage(clonedNewAbfrageTreeItem) && this.isItemTypeOfAbfrage(clonedOldAbfrageTreeItem)) {
      return this.isNotChangedAbfrage(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
    } else if (
      this.isItemTypeOfAbfragevariante(clonedNewAbfrageTreeItem) &&
      this.isItemTypeOfAbfragevariante(clonedOldAbfrageTreeItem)
    ) {
      return this.isNotChangedAbfragevariante(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
    } else if (
      this.isItemTypeOfBauabschnitt(clonedNewAbfrageTreeItem) &&
      this.isItemTypeOfBauabschnitt(clonedOldAbfrageTreeItem)
    ) {
      return this.isNotChangedBauabschnitt(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
    } else if (
      this.isItemTypeOfBaugebiet(clonedNewAbfrageTreeItem) &&
      this.isItemTypeOfBaugebiet(clonedOldAbfrageTreeItem)
    ) {
      return this.isNotChangedBaugebiet(clonedNewAbfrageTreeItem, clonedOldAbfrageTreeItem);
    } else if (
      this.isItemTypeOfBaurate(clonedNewAbfrageTreeItem) &&
      this.isItemTypeOfBaurate(clonedOldAbfrageTreeItem)
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

  private isItemTypeOfAbfrage(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ABFRAGE;
  }

  private isItemTypeOfAbfragevariante(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ABFRAGEVARIANTE;
  }

  private isItemTypeOfAddAbfragevariante(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ADD_ABFRAGEVARIANTE;
  }

  private isItemTypeOfBauabschnitt(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.BAUABSCHNITT;
  }

  private isItemTypeOfAddBauabschnitt(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ADD_BAUABSCHNITT;
  }

  private isItemTypeOfBaugebiet(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.BAUGEBIET;
  }

  private isItemTypeOfAddBaugebiet(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ADD_BAUGEBIET;
  }

  private isItemTypeOfBaurate(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.BAURATE;
  }

  private isItemTypeOfAddBaurate(abfrageTreeItem: AbfrageTreeItem): boolean {
    return abfrageTreeItem.type === AbfrageTreeItemType.ADD_BAURATE;
  }

  private isItemTypeOfAbfragevarianteAndBauratenAreDeterminable(abfrageTreeItem: AbfrageTreeItem): boolean {
    return (
      this.isItemTypeOfAbfragevariante(abfrageTreeItem) &&
      // Prüfen ob die idealtypischen Bauraten ermittelt werden dürfen.
      this.isEditable(abfrageTreeItem.contextAnzeigeAbfragevariante) &&
      // Entweder müssen die Geschoßläche Wohnen oder die Wohneinheiten gesetzt sein.
      (!_.isNil(abfrageTreeItem.abfragevariante?.gesamtanzahlWe) ||
        !_.isNil(abfrageTreeItem.abfragevariante?.geschossflaecheWohnen)) &&
      // Die Abfragevariante darf keine Bauabschnitte referenzieren.
      (_.isNil(abfrageTreeItem.abfragevariante?.bauabschnitte) ||
        _.isEmpty(abfrageTreeItem.abfragevariante?.bauabschnitte))
    );
  }

  private isItemSelectable(abfrageTreeItem: AbfrageTreeItem): boolean {
    return (
      this.isItemTypeOfAbfrage(abfrageTreeItem) ||
      this.isItemTypeOfAbfragevariante(abfrageTreeItem) ||
      this.isItemTypeOfBauabschnitt(abfrageTreeItem) ||
      this.isItemTypeOfBaugebiet(abfrageTreeItem) ||
      this.isItemTypeOfBaurate(abfrageTreeItem)
    );
  }

  private createFlatAbfrageTreeItem(abfrageTreeItems: Array<AbfrageTreeItem>): Array<AbfrageTreeItem> {
    return abfrageTreeItems.flatMap((abfrageTreeItem) => {
      const flatChildren = this.createFlatAbfrageTreeItem(abfrageTreeItem.children);
      flatChildren.push(abfrageTreeItem);
      return flatChildren;
    });
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
  private setAbfragevarianteRelevant(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
    return selectedAbfrageTreeItem;
  }

  @Emit()
  private determineBauratenForAbfragevariante(selectedAbfrageTreeItem: AbfrageTreeItem): AbfrageTreeItem {
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

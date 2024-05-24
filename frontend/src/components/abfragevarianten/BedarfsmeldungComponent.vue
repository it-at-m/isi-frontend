<template>
  <div>
    <field-group-card :card-title="getBedarfsmeldungTitle">
      <v-row
        v-if="getIsFachreferat"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <h3>Ausgelöste Bedarfe Kindertagesbetreuung</h3>
          <v-checkbox
            id="ausgeloester_bedarf_im_baugebiet_beruecksichtigen_kita_triswitch"
            ref="ausgeloesterBedarfImBaugebietBeruecksichtigenKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenKita"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Bedarf im Baugebiet berücksichtigen"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_im_bplan_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungImBplanKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungImBplanKita"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung des Bedarfs in einem Bebauungsplan"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_ausgel_bedarf_mitversorgung_in_best_einrichtungen_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_in_best_einrichtungen_nach_ausbau_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen nach deren Ausbau"
            color="primary"
            @update:model-value="formChanged"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <h3>Ausgelöste Bedarfe Schule</h3>
          <v-checkbox
            id="ausgeloester_bedarf_im_baugebiet_beruecksichtigen_schule_triswitch"
            ref="ausgeloesterBedarfImBaugebietBeruecksichtigenSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfImBaugebietBeruecksichtigenSchule"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Bedarf im Baugebiet berücksichtigen"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_im_bplan_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungImBplanSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungImBplanSchule"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung des Bedarfs in einem Bebauungsplan"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_ausgel_bedarf_mitversorgung_in_best_einrichtungen_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_in_best_einrichtungen_nach_ausbau_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule"
            :disabled="!getIsEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen nach deren Ausbau"
            color="primary"
            @update:model-value="formChanged"
          />
        </v-col>
      </v-row>
      <v-row v-if="getIsFachreferat">
        <v-col
          cols="12"
          md="12"
        >
          <v-textarea
            id="hinweis_Versorgung_field"
            ref="hinweisVersorgungField"
            v-model="abfragevariante.hinweisVersorgung"
            :disabled="!getIsEditable"
            label="Hinweise zur Versorgung der Bedarfe außerhalb des Verfahrens"
            rows="1"
            auto-grow
            maxlength="1000"
            @update:model-value="formChanged"
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12">
          <v-container class="table">
            <v-data-table
              :headers="bedarfsmeldungenHeaders"
              :items="bedarfsmeldungen"
              :items-per-page="-1"
              hide-default-footer
              @change="formChanged"
            >
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
                        :disabled="!getIsEditable"
                        icon
                        @click="editBedarfsmeldung(item, index)"
                      >
                        <v-icon> mdi-pencil-outline </v-icon>
                      </v-btn>
                      <v-btn
                        :id="'bedarfsmeldung_listitem_loeschen' + index"
                        :disabled="!getIsEditable"
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
                  :disabled="!getIsEditable"
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
    <bedarfsmeldung-dialog
      id="bedarfsmeldung_dialog"
      v-model="currentBedarfsmeldung"
      :show-bedarfsmeldung-dialog="bedarfsmeldungDialogOpen"
      @update-show-bedarfsmeldung-dialog="bedarfsmeldungDialogOpen = $event"
      @uebernehmen-bedarfsmeldung="uebernehmenBedarfsmeldung($event)"
      @abbrechen-bedarfsmeldung="abbrechenBedarfsmeldung()"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { BedarfsmeldungDto, LookupEntryDto } from "@/api/api-client/isi-backend";
import BedarfsmeldungDialog from "@/components/abfragevarianten/BedarfsmeldungDialog.vue";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import { useSaveLeave } from "@/composables/SaveLeave";
import { useLookupStore } from "@/stores/LookupStore";
import DisplayMode from "@/types/common/DisplayMode";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import BedarfsmeldungModel from "@/types/model/abfragevariante/BedarfsmeldungModel";
import { BedarfsmeldungTitle, createBedarfsmeldungDto } from "@/utils/Factories";
import _ from "lodash";

interface Props {
  bedarfsmeldungTitle: BedarfsmeldungTitle;
  isEditable?: boolean;
  isFachreferat?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isEditable: false, isFachreferat: false });
const abfragevariante = defineModel<AbfragevarianteBauleitplanverfahrenModel>({ required: true });

const getBedarfsmeldungTitle = computed(() => {
  if (!_.isNil(props.bedarfsmeldungTitle)) {
    return props.bedarfsmeldungTitle.valueOf();
  }
  return "";
});

const getIsEditable = computed(() => props.isEditable);
const getIsFachreferat = computed(() => props.isFachreferat);

const bedarfsmeldungen = ref<BedarfsmeldungDto[]>([]);
const bedarfsmeldungDialogOpen = ref<boolean>(false);
const currentBedarfsmeldung = ref<BedarfsmeldungDto>(createBedarfsmeldungDto());
let displayModeBedarfsmeldung = DisplayMode.UNDEFINED;
let selectedItemIndex = -1;
const lookupStore = useLookupStore();
const { formChanged } = useSaveLeave();

watch(() => abfragevariante, bedarfsmeldungSelection, { immediate: true, deep: true });
function bedarfsmeldungSelection(): void {
  if (
    !_.isNil(abfragevariante.value.bedarfsmeldungFachreferate) &&
    !_.isNil(abfragevariante.value.bedarfsmeldungAbfrageersteller)
  ) {
    bedarfsmeldungen.value = props.isFachreferat
      ? abfragevariante.value.bedarfsmeldungFachreferate
      : abfragevariante.value.bedarfsmeldungAbfrageersteller;
  }
}

const bedarfsmeldungenHeaders = [
  { text: "Anz. Einrichtungen", value: "anzahlEinrichtungen", sortable: false },
  { text: "Infrastruktureinrichtung Typ", value: "infrastruktureinrichtungTyp", sortable: false },
  { text: "Anz. Kinderkrippengruppen", value: "anzahlKindergruppen", sortable: false },
  { text: "Anz. Kindergartengruppen", value: "anzahlKindergartengruppen", sortable: false },
  { text: "Anz. Hortgruppen", value: "anzahlHortgruppen", sortable: false },
  { text: "Anz. Grundschulzüge", value: "anzahlGrundschulzuege", sortable: false },
  { text: "", value: "actions", sortable: false },
];

/**
 * Holt aus der im Parameter gegebenen Lookup-Liste den darin hinterlegten Wert des im Parameter gegebenen Schlüssel.
 *
 * @param key für welchen der Wert aus der Liste geholt werden soll.
 * @param list mit den Schlüssel-Wert-Paaren.
 * @return den Wert für den Schlüssel. Ist der Parameter key oder die Liste undefined, so wird auch undefined zurückgegeben.
 */
function getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
  return !_.isUndefined(list) && !_.isNil(key)
    ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
    : key;
}

const infrastruktureinrichtungenTypList = computed(() => lookupStore.infrastruktureinrichtungTyp);

function erfassenBedarfsmeldung(): void {
  currentBedarfsmeldung.value = createBedarfsmeldungDto();
  displayModeBedarfsmeldung = DisplayMode.NEU;
  bedarfsmeldungDialogOpen.value = true;
}

function editBedarfsmeldung(bedarfsmeldung: BedarfsmeldungModel, itemIndex: number): void {
  selectedItemIndex = itemIndex;
  currentBedarfsmeldung.value = _.cloneDeep(bedarfsmeldung);
  displayModeBedarfsmeldung = DisplayMode.AENDERUNG;
  bedarfsmeldungDialogOpen.value = true;
}

function uebernehmenBedarfsmeldung(bedarfsmeldung: BedarfsmeldungModel): void {
  if (displayModeBedarfsmeldung === DisplayMode.NEU) {
    if (_.isNil(bedarfsmeldungen.value)) {
      bedarfsmeldungen.value = new Array<BedarfsmeldungDto>();
    }
    bedarfsmeldungen.value.push(bedarfsmeldung);
  } else {
    bedarfsmeldungen.value?.splice(selectedItemIndex, 1, currentBedarfsmeldung.value as BedarfsmeldungDto);
  }
  clearBedarfsmeldungDialog();
}

function abbrechenBedarfsmeldung(): void {
  clearBedarfsmeldungDialog();
}

function clearBedarfsmeldungDialog(): void {
  bedarfsmeldungDialogOpen.value = false;
  displayModeBedarfsmeldung = DisplayMode.UNDEFINED;
  selectedItemIndex = -1;
}

function deleteBedarfsmeldung(itemIndex: number) {
  if (!_.isNil(bedarfsmeldungen.value)) {
    bedarfsmeldungen.value?.splice(itemIndex, 1);
    formChanged();
  }
}
</script>

<template>
  <div>
    <field-group-card :card-title="bedarfsmeldungTitle">
      <v-row
        v-if="false"
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
            :disabled="!isEditable"
            class="mx-3"
            label="Bedarf im Baugebiet berücksichtigen"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_im_bplan_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungImBplanKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungImBplanKita"
            :disabled="!isEditable"
            class="mx-3"
            label="Mitversorgung des Bedarfs in einem Bebauungsplan"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_ausgel_bedarf_mitversorgung_in_best_einrichtungen_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenKita"
            :disabled="!isEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_in_best_einrichtungen_nach_ausbau_kita_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKitaTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauKita"
            :disabled="!isEditable"
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
            :disabled="!isEditable"
            class="mx-3"
            label="Bedarf im Baugebiet berücksichtigen"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_im_bplan_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungImBplanSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungImBplanSchule"
            :disabled="!isEditable"
            class="mx-3"
            label="Mitversorgung des Bedarfs in einem Bebauungsplan"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_ausgel_bedarf_mitversorgung_in_best_einrichtungen_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenSchule"
            :disabled="!isEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen"
            color="primary"
            @update:model-value="formChanged"
          />
          <v-checkbox
            id="ausgeloester_bedarf_mitversorgung_in_best_einrichtungen_nach_ausbau_schule_triswitch"
            ref="ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchuleTriswitch"
            v-model="abfragevariante.ausgeloesterBedarfMitversorgungInBestEinrichtungenNachAusbauSchule"
            :disabled="!isEditable"
            class="mx-3"
            label="Mitversorgung in bestehenden Einrichtungen nach deren Ausbau"
            color="primary"
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
                      <v-item-group class="d-flex">
                        <v-btn
                          :id="'bedarfsmeldung_listitem_bearbeiten' + index"
                          :disabled="!isEditable"
                          variant="plain"
                          density="compact"
                          icon="mdi-pencil-outline"
                          @click="editBedarfsmeldung(item, index)"
                        />
                        <v-btn
                          :id="'bedarfsmeldung_listitem_loeschen' + index"
                          :disabled="!isEditable"
                          variant="plain"
                          density="compact"
                          icon="mdi-delete"
                          @click="deleteBedarfsmeldung(index)"
                        />
                      </v-item-group>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
            <v-toolbar
              color="transparent"
              flat
            >
              <v-spacer />
              <v-btn
                :id="'bedarfsmeldung_erfassen'"
                :disabled="!isEditable"
                color="primary"
                block
                @click="erfassenBedarfsmeldung()"
              >
                Bedarfsmeldung erfassen
              </v-btn>
              <v-spacer />
            </v-toolbar>
          </v-container>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-textarea
            id="anmerkungen_field"
            ref="anmerkungenField"
            v-model="anmerkung"
            :disabled="!isEditable"
            variant="underlined"
            label="Anmerkungen"
            auto-grow
            rows="3"
            maxlength="1000"
            @update:model-value="formChanged"
          />
        </v-col>
      </v-row>
    </field-group-card>
    <bedarfsmeldung-dialog
      id="bedarfsmeldung_dialog"
      v-model="currentBedarfsmeldung"
      :show-bedarfsmeldung-dialog="bedarfsmeldungDialogOpen"
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

const bedarfsmeldungTitle = computed(() => {
  if (!_.isNil(props.bedarfsmeldungTitle)) {
    return props.bedarfsmeldungTitle.valueOf();
  }
  return "";
});

const isEditable = computed(() => props.isEditable);

const anmerkung = ref<string | undefined>(undefined);
const bedarfsmeldungenHeaders = ref<any[]>([]);
const bedarfsmeldungen = ref<BedarfsmeldungDto[]>([]);
const bedarfsmeldungDialogOpen = ref<boolean>(false);
const currentBedarfsmeldung = ref<BedarfsmeldungDto>(createBedarfsmeldungDto());
let displayModeBedarfsmeldung = DisplayMode.UNDEFINED;
let selectedItemIndex = -1;
const lookupStore = useLookupStore();
const { formChanged } = useSaveLeave();

watch(() => abfragevariante, watchBedarfsmeldungSelection, { immediate: true, deep: true });
function watchBedarfsmeldungSelection(): void {
  bedarfsmeldungenHeaders.value = getBedarfsmeldungHeaders();
  bedarfsmeldungen.value = props.isFachreferat
    ? _.toArray(abfragevariante.value.bedarfsmeldungFachreferate)
    : _.toArray(abfragevariante.value.bedarfsmeldungAbfrageersteller);

  anmerkung.value = props.isFachreferat
    ? abfragevariante.value.anmerkungFachreferate
    : abfragevariante.value.anmerkungAbfrageersteller;
}

watch(() => anmerkung, watchAnmerkung, { immediate: true, deep: true });
function watchAnmerkung(): void {
  if (props.isFachreferat) {
    abfragevariante.value.anmerkungFachreferate = anmerkung.value;
  } else {
    abfragevariante.value.anmerkungAbfrageersteller = anmerkung.value;
  }
}

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

function getBedarfsmeldungHeaders(): any[] {
  return [
    { text: "Anz. Einrichtungen", value: "anzahlEinrichtungen", sortable: false },
    { text: "Infrastruktureinrichtung Typ", value: "infrastruktureinrichtungTyp", sortable: false },
    { text: "Anz. Kinderkrippengruppen", value: "anzahlKinderkrippengruppen", sortable: false },
    { text: "Anz. Kindergartengruppen", value: "anzahlKindergartengruppen", sortable: false },
    { text: "Anz. Hortgruppen", value: "anzahlHortgruppen", sortable: false },
    { text: "Anz. Grundschulzüge", value: "anzahlGrundschulzuege", sortable: false },
    { text: "", value: "actions", sortable: false, align: "end", width: "10%" },
  ];
}
</script>

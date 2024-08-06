<template>
  <div class="font-weight-bold mb-5 ml-16 ps-5">
    Es sind maximal 20 Dokumente mit jeweils einer Größe von 50 MB erlaubt.
  </div>
  <v-container class="mx-auto my-2">
    <v-list
      v-if="hasDokumente"
      id="dokumente_liste"
    >
      <template
        v-for="(item, index) in dokumente"
        :key="`dokument-${index}`"
      >
        <v-list-item :id="'dokumente_list_item_' + index">
          <v-card
            :id="'dokumente_card_' + index"
            :class="`my-2 pt-3 pb-2 ${!isDokumentAllowed(item) ? 'red accent-4' : ''}`"
            flat
            width="100%"
          >
            <v-row align="center">
              <v-col
                cols="12"
                md="1"
              >
                <v-row justify="center">
                  <v-btn
                    :id="'dokument_listitem_download_' + index"
                    variant="plain"
                    icon="mdi-download"
                    @click="downloadDokument(item)"
                  />
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="10"
              >
                <v-row class="align-center">
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-row
                      :id="'dokument_display_name_' + index"
                      class="justify-start"
                    >
                      <strong>
                        {{ getDokumentDisplayName(item) }}
                      </strong>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="align-center">
                  <v-col
                    cols="12"
                    md="4"
                  >
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                  </v-col>
                  <v-col
                    class="px-3 pt-1 pb-0"
                    cols="12"
                    md="4"
                  >
                    <v-row class="justify-end">
                      <v-select
                        :id="'dokumente_listitem_' + index + '_artDokument_dropdown'"
                        v-model="item.artDokument"
                        variant="underlined"
                        :items="lookupStore.artDokument"
                        item-value="key"
                        item-title="value"
                        :rules="[pflichtfeld]"
                        :readonly="!isDokumentAllowed(item)"
                        :disabled="!isDokumenteEditable"
                        @update:model-value="change"
                      >
                        <template #label> Dokumentart </template>
                      </v-select>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="1"
              >
                <v-row justify="center">
                  <v-btn
                    :id="'dokument_listitem_loeschen' + index"
                    :disabled="!isDokumenteEditable"
                    variant="plain"
                    icon="mdi-delete"
                    @click="deleteDokument(item)"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-list-item>
      </template>
    </v-list>
    <yes-no-dialog
      id="dokumente_yes_no_dialog_loeschen"
      v-model="deleteDialogOpen"
      icon="mdi-delete-forever"
      dialogtitle="Hinweis"
      dialogtext="Hiermit wird das Dokument unwiderruflich entfernt."
      no-text="Abbrechen"
      yes-text="Entfernen"
      @no="yesNoDialogNo"
      @yes="yesNoDialogYes"
    />
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { DokumentDto, FilepathDto, PresignedUrlDto } from "@/api/api-client/isi-backend";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import { createFilepathDto } from "@/utils/Factories";
import { isDokumentAllowed } from "@/utils/DokumenteUtil";
import { useDokumenteApi } from "@/composables/requests/DokumenteApi";
import _ from "lodash";
import { pflichtfeld, notUnspecified } from "@/utils/FieldValidationRules";
import { useLookupStore } from "@/stores/LookupStore";

interface Props {
  dokumente: DokumentDto[];
  isDokumenteEditable?: boolean;
}

interface Emits {
  (event: "change", value: void): void;
  (event: "on-delete-dokument", value: DokumentDto): void;
}

const props = withDefaults(defineProps<Props>(), { isDokumenteEditable: true });
const emit = defineEmits<Emits>();
const selectedDokument = ref<DokumentDto | null>(null);
const deleteDialogOpen = ref(false);
const lookupStore = useLookupStore();
const { getPresignedUrlForGetDokument } = useDokumenteApi();
const hasDokumente = computed(() => !_.isNil(props.dokumente) && props.dokumente.length > 0);

function getDokumentDisplayName(dokument: DokumentDto): string {
  return dokument.filePath.pathToFile.substring(dokument.filePath.pathToFile.lastIndexOf("/") + 1);
}

async function downloadDokument(dokument: DokumentDto): Promise<void> {
  const filepathDto: FilepathDto = createFilepathDto();
  filepathDto.pathToFile = dokument.filePath.pathToFile;
  const presignedUrlDto = await getPresignedUrlForGetDokument(filepathDto);
  prepareDownloadLink(presignedUrlDto, dokument);
}

function prepareDownloadLink(dto: PresignedUrlDto, dokument: DokumentDto) {
  if (!_.isNil(dto.url)) {
    const a = document.createElement("a");
    a.href = dto.url;
    a.download = dokument.filePath.pathToFile.substring(dokument.filePath.pathToFile.lastIndexOf("/") + 1);
    a.click();
  }
}

function deleteDokument(dokument: DokumentDto): void {
  selectedDokument.value = dokument;
  deleteDialogOpen.value = true;
}

function yesNoDialogYes(): void {
  if (selectedDokument.value !== null) {
    emit("on-delete-dokument", selectedDokument.value);
  }
  yesNoDialogNo();
}

function yesNoDialogNo(): void {
  deleteDialogOpen.value = false;
  selectedDokument.value = null;
}

function change(): void {
  emit("change");
}
</script>

<template>
  <v-container class="mx-auto my-2">
    <v-list
      v-if="hasDokumente"
      id="dokumente_liste"
    >
      <template v-for="(item, index) in dokumente">
        <v-list-item :key="`dokument-${index}`">
          <v-card
            :class="`my-2 pt-3 pb-2 ${isDokumentNotAllowed(item) ? 'red accent-4' : ''}`"
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
                    :id="'dokument_listitem_download' + index"
                    icon
                    @click="downloadDokument(item)"
                  >
                    <v-icon> mdi-download</v-icon>
                  </v-btn>
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
                    <v-row class="justify-start">
                      <strong>
                        {{ getDokumentDisplayName(item) }}
                      </strong>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="align-center">
                  <v-col
                    class="px-3 pt-1 pb-0"
                    cols="12"
                    md="4"
                  >
                    <v-row class="justify-start">
                      {{ item.typDokument }}
                    </v-row>
                  </v-col>
                  <v-col
                    class="px-3 pt-1 pb-0"
                    cols="12"
                    md="4"
                  >
                    <v-row class="justify-center">
                      {{ getDokumentSizeInSIUnits(item) }}
                    </v-row>
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
                        :items="artDokumentList"
                        item-value="key"
                        item-text="value"
                        :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
                        :readonly="isDokumentNotAllowed(item)"
                        :disabled="!isDokumenteEditable"
                        @change="change"
                      >
                        <template #label> Dokumentart <span class="secondary--text">*</span> </template>
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
                    icon
                    @click="deleteDokument(item)"
                  >
                    <v-icon> mdi-delete</v-icon>
                  </v-btn>
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

<script lang="ts">
import { Component, Mixins, VModel, Prop, Emit } from "vue-property-decorator";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import { createFilepathDto } from "@/utils/Factories";
import { isDokumentAllowed } from "@/utils/DokumenteUtil";
import DokumenteApiRequestMixin from "@/mixins/requests/DokumenteApiRequestMixin";
import { DokumentDto, FilepathDto, LookupEntryDto, PresignedUrlDto } from "@/api/api-client/isi-backend";
import _ from "lodash";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";

@Component({
  components: {
    YesNoDialog,
  },
})
export default class DokumenteListe extends Mixins(DokumenteApiRequestMixin, FieldValidationRulesMixin) {
  @VModel({ type: Array }) dokumente!: DokumentDto[];

  @Prop({ type: Boolean, default: true })
  private isDokumenteEditable!: boolean;

  private selectedDokument: DokumentDto | undefined;

  private deleteDialogOpen = false;

  get hasDokumente(): boolean {
    return !_.isNil(this.dokumente) && this.dokumente.length > 0;
  }

  private getDokumentDisplayName(dokument: DokumentDto): string {
    return dokument.filePath.pathToFile.substring(dokument.filePath.pathToFile.lastIndexOf("/") + 1);
  }

  private getDokumentSizeInSIUnits(dokument: DokumentDto): string {
    let size: string;
    if (dokument.sizeInBytes < 1000) {
      size = dokument.sizeInBytes + " Byte";
    } else if (dokument.sizeInBytes < 1000000) {
      size = _.round(dokument.sizeInBytes / 1000, 1) + " Kilobyte";
    } else {
      size = _.round(dokument.sizeInBytes / 1000000, 1) + " Megabyte";
    }
    return size;
  }

  get artDokumentList(): LookupEntryDto[] {
    return this.$store.getters["lookup/artDokument"];
  }

  async downloadDokument(dokument: DokumentDto): Promise<void> {
    const filepathDto: FilepathDto = createFilepathDto();
    filepathDto.pathToFile = dokument.filePath.pathToFile;
    await this.getPresignedUrlForGetDokument(filepathDto, true).then((presignedUrlDto) => {
      this.prepareDownloadLink(presignedUrlDto, dokument);
    });
  }

  private prepareDownloadLink(dto: PresignedUrlDto, dokument: DokumentDto) {
    if (!_.isNil(dto.url)) {
      const a = document.createElement("a");
      a.href = dto.url;
      a.download = dokument.filePath.pathToFile.substring(dokument.filePath.pathToFile.lastIndexOf("/") + 1);
      a.click();
    }
  }

  private deleteDokument(selectedDokument: DokumentDto): void {
    this.selectedDokument = selectedDokument;
    this.deleteDialogOpen = true;
  }

  private yesNoDialogYes(): void {
    if (this.selectedDokument !== undefined) {
      this.$emit("onDeleteDokument", this.selectedDokument);
    }
    this.selectedDokument = undefined;
    this.yesNoDialogNo();
  }

  private yesNoDialogNo(): void {
    this.deleteDialogOpen = false;
    this.selectedDokument = undefined;
  }

  private isDokumentAllowed(dokument: DokumentDto) {
    return isDokumentAllowed(dokument);
  }

  private isDokumentNotAllowed(dokument: DokumentDto) {
    return !this.isDokumentAllowed(dokument);
  }

  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private change(): void {}
}
</script>

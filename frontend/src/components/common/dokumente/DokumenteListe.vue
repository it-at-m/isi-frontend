<template>  
  <v-card class="mx-auto ma-4">
    <v-list
      v-if="hasDokumente"
      id="dokumente_liste"
    >
      <v-list-item
        v-for="(item, index) in dokumente"
        :id="'dokumente_listitem_' + index"
        :key="item.filePath.pathToFile"
      >
        <v-container>
          <v-row>
            <v-col>
              <v-icon
                :id="'dokumente_listitem_' + index + '_download_icon'"
                @click="downloadDokument(item)"
              >
                mdi-download
              </v-icon>
            </v-col>
            <v-col
              cols="12"
              md="5"
            >
              {{ getDokumentDisplayName(item) }}
            </v-col>
            <v-col
              cols="12"
              md="5"
              style="padding: 0"
            >
              <v-select
                :id="'dokumente_listitem_' + index + '_artDokument_dropdown'"
                v-model="item.artDokument"
                style="margin: 0px;"
                :items="artDokumentList"
                item-value="key"
                item-text="value"
                :rules="[fieldValidationRules.pflichtfeld, fieldValidationRules.notUnspecified]"
                @change="formChanged"
              >
                <template #label>
                  Dokumentart <span class="secondary--text">*</span>
                </template>
              </v-select>
            </v-col>
            <v-col>
              <v-icon
                :id="'dokumente_listitem_' + index + '_loeschen_icon'"
                @click="deleteDokument(item)"
              >
                mdi-delete
              </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item>
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
  </v-card>
</template>

<script lang="ts">
import { Mixins, Component, VModel } from "vue-property-decorator";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import { createFilepathDto } from "@/utils/Factories";
import DokumenteApiRequestMixin from "@/mixins/requests/DokumenteApiRequestMixin";
import {DokumentDto, FilepathDto, LookupEntryDto, PresignedUrlDto} from "@/api/api-client/isi-backend";
import _ from "lodash";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
@Component({
  components: {
    YesNoDialog
  }
})
export default class DokumenteListe extends Mixins(
    DokumenteApiRequestMixin,
    SaveLeaveMixin,
    FieldValidationRulesMixin
) {

  @VModel({ type: Array }) dokumente!: DokumentDto[];

  private selectedDokument: DokumentDto | undefined;

  private deleteDialogOpen = false;

  get hasDokumente(): boolean {
    return (!_.isNil(this.dokumente) && this.dokumente.length > 0);
  }

  private getDokumentDisplayName(dokument: DokumentDto): string {
    return dokument.filePath.pathToFile.substring(dokument.filePath.pathToFile.lastIndexOf("/") + 1);
  }

  get artDokumentList(): LookupEntryDto[] {
    return this.$store.getters["lookup/artDokument"];
  }

  async downloadDokument(dokument: DokumentDto): Promise<void> {
    const filepathDto: FilepathDto = createFilepathDto();
    filepathDto.pathToFile = dokument.filePath.pathToFile;
    await this.getPresignedUrlForGetDokument(filepathDto, true)
      .then(presignedUrlDto => {
        this.prepareDownloadLink(presignedUrlDto, dokument);
      });
  }

  private prepareDownloadLink(dto: PresignedUrlDto, dokument: DokumentDto) {
    if (!_.isNil(dto.url)) {
      const a = document.createElement("a");
      a.href = dto.url;
      a.download = dokument.filePath.pathToFile.substring(dokument.filePath.pathToFile.lastIndexOf('/') + 1);
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

}
</script>
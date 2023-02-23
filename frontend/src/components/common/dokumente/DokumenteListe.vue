<template>
  <v-card class="mx-auto ma-4">
    <v-list v-if="hasDokumente">
      <v-list-item
        v-for="item in dokumente"
        :key="item.filePath.pathToFile"
      >
        <v-container>
          <v-row class="align-center">
            <v-col
              cols="12"
              md="1"
            >
              <v-row justify="start">
                <v-icon @click="downloadDokument(item)">
                  mdi-download
                </v-icon>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="10"
            >
              <v-row align="start">
                <v-col
                  cols="12"
                  md="12"
                >
                  {{ getDokumentDisplayName(item) }}
                </v-col>
              </v-row>
              <v-row align="end">
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    ref="typDokument"
                    v-model="item.typDokument"
                    label="Dokumententyp"
                    readonly
                    filled
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="item.artDokument"
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
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="1"
            >
              <v-row justify="end">
                <v-icon @click="deleteDokument(item)">
                  mdi-delete
                </v-icon>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item>
    </v-list>
    <yes-no-dialog
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
import {Component, Mixins, VModel} from "vue-property-decorator";
import YesNoDialog from "@/components/common/YesNoDialog.vue";
import {createFilepathDto} from "@/utils/Factories";
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

  @VModel({type: Array}) dokumente!: DokumentDto[];

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
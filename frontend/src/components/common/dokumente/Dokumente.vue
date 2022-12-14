<template>
  <v-container>
    <div>
      <dokumente-liste
        v-model="dokumente"
        @onDeleteDokument="deleteDokument"          
      />
      <v-row justify="end">
        <v-col
          cols="12"
          md="2"
        >       
          <v-btn
            class="text-wrap"
            block
            color="secondary"
            elevation="1"
            @click="addDokument()"
            v-text="'Hinzufügen'"
          />
        </v-col>
      </v-row>
    </div>
    <input
      id="fileInputHidden"
      type="file"
      multiple
      hidden
      :accept="allowedMimeTypes"
      @change="onFilesSelected"
    >
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component, Prop, VModel } from "vue-property-decorator";
import DokumenteApiRequestMixin from "@/mixins/requests/DokumenteApiRequestMixin";
import DokumenteListe from "./DokumenteListe.vue";
import { DokumentDto, FileInformationDto } from "@/api/api-client";
import { createFilepathDto, createPresignedUrlDto, createDokumentDto} from "@/utils/Factories";
import {
  fileAlreadyExists,
  maxNumberOfFilesReached,
  maxFileSizeExceeded,
  getAllowedMimeTypes
} from "@/utils/DokumenteUtil";
import { FilepathDto, PresignedUrlDto } from "@/api/api-client";
import _ from "lodash";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin";

@Component({
  components: {
    DokumenteListe,
  }
})
export default class Dokumente extends Mixins(
  DokumenteApiRequestMixin,
  SaveLeaveMixin
) {

  @VModel({ type: Array }) dokumente!: DokumentDto[];
  
  @Prop()
  private pathToFile!: string;

  private allowedMimeTypes = "";

  mounted(): void {
    const fileInformationDto: FileInformationDto = _.clone(this.$store.getters["fileInfoStamm/fileInformation"]);
    this.allowedMimeTypes = getAllowedMimeTypes(fileInformationDto);
  }

  private addDokument(): void {
    const fileSelectionDialog = document.getElementById("fileInputHidden");
    if (!_.isNil(fileSelectionDialog)) {
      fileSelectionDialog.click();  
    }
  }
 
  async deleteDokument(dokument: DokumentDto): Promise<void> {
    const filepathDto: FilepathDto = createFilepathDto();
    filepathDto.pathToFile = dokument.filePath.pathToFile;
    let presignedUrlDto: PresignedUrlDto = createPresignedUrlDto();
    await this.getPresignedUrlForDeleteDokument(filepathDto, true)
      .then(presignedUrlDtoInternal => {
        presignedUrlDto = presignedUrlDtoInternal;
      });
    if (!_.isNil(presignedUrlDto.url)) {   
      await this.deleteDokumentWithUrl(presignedUrlDto)  
        .then(() => {
          this.dokumente.forEach( (item, index) => {
            if (item.filePath.pathToFile === dokument.filePath.pathToFile) {
              this.dokumente.splice(index, 1);
            }
          });
          this.formChanged();
          this.$emit("onDokumentDeleted", dokument);
        });
    }
  }

  private onFilesSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const fileList = target.files;
    if (!_.isNil(fileList) && this.areFilesValid(fileList)) {
        this.saveFiles(fileList);
    }
  }

  private areFilesValid(fileList: FileList): boolean {    
    const fileInformationDto: FileInformationDto = this.$store.getters["fileInfoStamm/fileInformation"] as FileInformationDto;
    let maxNumberOfFilesMessagePart = "";
    let fileAlreadyExistsMessagePart = "";
    let maxFileSizeExceededMessagePart = "";
    let warningMessage = "";   
    maxNumberOfFilesMessagePart += this.validateAndCreateMaxNumberOfFilesMessagePart(fileInformationDto, fileList);
    for (let newFile of fileList) {
      maxFileSizeExceededMessagePart += this.validateAndCreateMaxFileSizeExceededMessagePart(fileInformationDto, newFile, maxFileSizeExceededMessagePart);
      fileAlreadyExistsMessagePart += this.validateAndCreateFileAlreadyExistsMessagePart(this.dokumente, newFile, fileAlreadyExistsMessagePart);
    }
    warningMessage += this.formatValidationWarningMessagePartWith(maxNumberOfFilesMessagePart, warningMessage);
    warningMessage += this.formatValidationWarningMessagePartWith(this.formatFileAlreadyExistsMessagePartMessagePart(fileAlreadyExistsMessagePart), warningMessage);
    warningMessage += this.formatValidationWarningMessagePartWith(this.formatMaxFileExceededMessagePart(fileInformationDto, maxFileSizeExceededMessagePart), warningMessage);
    if (!_.isEmpty(warningMessage)) {
      this.showWarningInInformationList(warningMessage);
      return false;
    }
    return true;
  }

  private validateAndCreateMaxNumberOfFilesMessagePart(fileInformationDto: FileInformationDto, fileList: FileList) {
    return maxNumberOfFilesReached(this.dokumente, fileList, fileInformationDto)
      ? `Die maximale Anzahl von ${fileInformationDto.maxNumberOfFiles} Dokumenten wird überschritten`
      : "";
  }

  private validateAndCreateMaxFileSizeExceededMessagePart(fileInformationDto: FileInformationDto, newFile: File, maxFileSizeExceededMessage: string): string {
    let messagePart = "";
    if (maxFileSizeExceeded(newFile, fileInformationDto)) {      
      if (!_.isEmpty(maxFileSizeExceededMessage)) {
        messagePart += ", ";
      }
      messagePart += newFile.name;
    }
    return messagePart;
  }  

  private validateAndCreateFileAlreadyExistsMessagePart(dokumente: DokumentDto[], newFile: File, fileAlreadyExistsMessage: string): string {
    let messagePart = "";
    if (fileAlreadyExists(dokumente, newFile, this.pathToFile)) {
      if (!_.isEmpty(fileAlreadyExistsMessage)) {
        messagePart += ", ";
      }
      messagePart += newFile.name;
    }
    return messagePart;
  }

  private formatValidationWarningMessagePartWith(message: string, warningMessage: string): string {
    return !_.isEmpty(message) && !_.isEmpty(warningMessage) ? "\n" + message : message;
  }

  private formatMaxFileExceededMessagePart(fileInformationDto: FileInformationDto, maxFileExceededMessagePart: string): string {
    let messagePart = "";
    if (!_.isEmpty(maxFileExceededMessagePart)) {
      messagePart += maxFileExceededMessagePart.includes(",") 
        ? "Die Dateien " + maxFileExceededMessagePart + " überschreiten "
        : "Die Datei " + maxFileExceededMessagePart + " überschreitet ";        
      messagePart += "die max. Dateigröße von " + fileInformationDto.maxFileSizeBytes + " Bytes";
    }
    return messagePart;
  }

  private formatFileAlreadyExistsMessagePartMessagePart(fileAlreadyExistsMessagePart: string): string {
    let messagePart = "";
    if (!_.isEmpty(fileAlreadyExistsMessagePart)) {
      messagePart += fileAlreadyExistsMessagePart.includes(",") 
          ? "Die Dateien " + fileAlreadyExistsMessagePart + " sind "
          : "Die Datei " + fileAlreadyExistsMessagePart + " ist ";        
      messagePart += "bereits in den Dokumenten enthalten";
    }
    return messagePart;
  }

  async saveFiles(fileList: FileList): Promise<void> {    
    for (let file of fileList) {
      this.saveFile(this.pathToFile, file);
    }
  }

  async saveFile(pathToFile: string, file: File): Promise<void> {
    const filepathDto: FilepathDto = createFilepathDto();
    filepathDto.pathToFile = pathToFile + file.name;
    let presignedUrlDto: PresignedUrlDto = createPresignedUrlDto();
    await this.getPresignedUrlForSaveDokument(filepathDto, true)
    .then(presignedUrlDtoInternal => {
      presignedUrlDto = presignedUrlDtoInternal;
    });

    if (!_.isNil(presignedUrlDto.url)) {
      await this.saveDokumentWithUrl(presignedUrlDto, file)      
        .then(() => {
          const newDokument = createDokumentDto();
          newDokument.filePath.pathToFile = filepathDto.pathToFile;
          this.dokumente.push(newDokument);
          this.formChanged();
          this.$emit("onDokumentAdded", newDokument);
        });
    }
  }

}

</script>
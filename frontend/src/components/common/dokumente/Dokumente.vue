<template>
  <field-group-card card-title="Dokumente">
    <v-container>
      <v-dialog
        v-model="loading"
        max-width="360"
        persistent
      >
        <v-list
          class="py-3"
          color="primary"
          elevation="12"
          rounded="lg"
        >
          <loading-progress-circular
            icon="mdi-file-document-refresh"
            text="Dokumente werden hochgeladen..."
          />
        </v-list>
      </v-dialog>
      <dokumente-liste
        id="dokumente_liste_component"
        :dokumente="dokumente"
        :is-dokumente-editable="isDokumenteEditable"
        @on-delete-dokument="deleteDokument"
        @change="change"
      />
      <v-row class="align-end">
        <v-col
          cols="12"
          md="2"
        >
          <v-row class="justify-start">
            <v-chip size="small"> {{ dokumente.length }} / {{ maxNumberOfFiles }} </v-chip>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="8"
        />
        <v-col
          cols="12"
          md="2"
        >
          <v-row class="justify-end">
            <v-btn
              id="dokumente_hinzufuegen_button"
              block
              color="secondary"
              elevation="1"
              :disabled="!addDokumentButtonEnabled"
              @click="addDokument()"
            >
              Hinzufügen
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <input
      id="dokumente_input"
      ref="dokumenteInput"
      type="file"
      multiple
      hidden
      :accept="allowedMimeTypes"
      @change="onFilesSelected"
      @click="onClick"
    />
  </field-group-card>
</template>

<script setup lang="ts">
import { useDokumenteApi } from "@/composables/requests/DokumenteApi";
import { useMimeTypeApi } from "@/composables/requests/MimeTypeApi";
import FieldGroupCard from "../FieldGroupCard.vue";
import DokumenteListe from "./DokumenteListe.vue";
import {
  type DokumentDto,
  type FileInformationDto,
  type FilepathDto,
  type MimeTypeInformationDto,
  type PresignedUrlDto,
  ResponseError,
} from "@/api/api-client/isi-backend";
import { createDokumentDto, createFilepathFor, createFilepathDto, createPresignedUrlDto } from "@/utils/Factories";
import {
  fileAlreadyExists,
  getAllowedMimeTypes,
  maxFileSizeExceeded,
  maxNumberOfFilesReached,
  mimeTypeNichtErlaubt,
} from "@/utils/DokumenteUtil";
import _ from "lodash";
import { useStammdatenStore } from "@/stores/StammdatenStore";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import LoadingProgressCircular from "@/components/common/LoadingProgressCircular.vue";

interface Props {
  nameRootFolder: string;
  isDokumenteEditable?: boolean;
}

interface Emits {
  (event: "change", value: void): void;
}

const props = withDefaults(defineProps<Props>(), { isDokumenteEditable: true });
const emit = defineEmits<Emits>();
const dokumente = defineModel<DokumentDto[]>({ required: true });
const loading = ref(false);
const dokumenteInput = ref<HTMLInputElement | null>(null);
const toast = useToast();
const { getPresignedUrlForSaveDokument, saveDokumentWithUrl } = useDokumenteApi();
const { extractMediaTypeInformationForAllowedMediaType } = useMimeTypeApi();
const { fileInformation } = useStammdatenStore();
const allowedMimeTypes = computed(() => getAllowedMimeTypes(fileInformation));
const maxNumberOfFiles = computed(() => fileInformation.maxNumberOfFiles ?? 0);
const addDokumentButtonEnabled = computed(
  () => props.isDokumenteEditable && dokumente.value.length < maxNumberOfFiles.value,
);

function addDokument(): void {
  dokumenteInput.value?.click();
}

function deleteDokument(dokument: DokumentDto): void {
  const index = dokumente.value.findIndex((value) => value.filePath.pathToFile === dokument.filePath.pathToFile);
  dokumente.value.splice(index, 1);
  change();
}

/**
 * Erforderlich um nach Auswahl einer vorher bereits gewählten Datei das HTMLInputElement-Change-Event nochmal zu triggern.
 * @param event als HTMLInputElement
 */
function onClick(event: Event): void {
  const target = event.target as HTMLInputElement;
  target.value = "";
}

// - Anzeigen des File-Explorers zur Auswahl von Dateien
// - Upload der ausgewählten Dateien in das Dokumentenverwaltungssystem
// - Für die Dauer des Uploads aller Dateien in das Dokumentenverwaltungssystem wird ein Cursorladekreis (Progress-Circle) angezeigt
async function onFilesSelected(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement;
  const fileList = target.files;
  // Prüfung ob alle Dateien den Anforderungen entsprechen
  if (!_.isNil(fileList) && areFilesValid(fileList)) {
    // Anzeige des Cursorladekreis starten
    loading.value = true;
    // Erstellen der Ordnerstruktur zum Speichern der gewählten Dateien.
    const pathToFiles = createFilepathFor(props.nameRootFolder);
    // Upload der Dateien
    await saveFiles(fileList, pathToFiles).finally(() => {
      // Anzeige des Cursorladekreises beenden
      loading.value = false;
    });
  }
}

function areFilesValid(fileList: FileList): boolean {
  const fileInformationDto: FileInformationDto = fileInformation as FileInformationDto;
  let maxNumberOfFilesMessagePart = "";
  let fileAlreadyExistsMessagePart = "";
  let maxFileSizeExceededMessagePart = "";
  let warningMessage = "";
  maxNumberOfFilesMessagePart += validateAndCreateMaxNumberOfFilesMessagePart(fileInformationDto, fileList);
  for (const newFile of fileList) {
    maxFileSizeExceededMessagePart += validateAndCreateMaxFileSizeExceededMessagePart(
      fileInformationDto,
      newFile,
      maxFileSizeExceededMessagePart,
    );
    fileAlreadyExistsMessagePart += validateAndCreateFileAlreadyExistsMessagePart(
      dokumente.value,
      newFile,
      fileAlreadyExistsMessagePart,
    );
  }
  warningMessage += formatValidationWarningMessagePartWith(maxNumberOfFilesMessagePart, warningMessage);
  warningMessage += formatValidationWarningMessagePartWith(
    formatFileAlreadyExistsMessagePartMessagePart(fileAlreadyExistsMessagePart),
    warningMessage,
  );
  warningMessage += formatValidationWarningMessagePartWith(
    formatMaxFileExceededMessagePart(fileInformationDto, maxFileSizeExceededMessagePart),
    warningMessage,
  );
  if (!_.isEmpty(warningMessage)) {
    toast.error(warningMessage, { timeout: false });
    return false;
  }
  return true;
}

function validateAndCreateMaxNumberOfFilesMessagePart(fileInformationDto: FileInformationDto, fileList: FileList) {
  return maxNumberOfFilesReached(dokumente.value, fileList, fileInformationDto)
    ? `Die maximale Anzahl von ${fileInformationDto.maxNumberOfFiles} Dokumenten wird überschritten`
    : "";
}

function validateAndCreateMaxFileSizeExceededMessagePart(
  fileInformationDto: FileInformationDto,
  newFile: File,
  maxFileSizeExceededMessage: string,
): string {
  let messagePart = "";
  if (maxFileSizeExceeded(newFile, fileInformationDto)) {
    if (!_.isEmpty(maxFileSizeExceededMessage)) {
      messagePart += ", ";
    }
    messagePart += newFile.name;
  }
  return messagePart;
}

function validateAndCreateFileAlreadyExistsMessagePart(
  dokumente: DokumentDto[],
  newFile: File,
  fileAlreadyExistsMessage: string,
): string {
  let messagePart = "";
  if (fileAlreadyExists(dokumente, newFile)) {
    if (!_.isEmpty(fileAlreadyExistsMessage)) {
      messagePart += ", ";
    }
    messagePart += newFile.name;
  }
  return messagePart;
}

function formatValidationWarningMessagePartWith(message: string, warningMessage: string): string {
  return !_.isEmpty(message) && !_.isEmpty(warningMessage) ? "\n" + message : message;
}

function formatMaxFileExceededMessagePart(
  fileInformationDto: FileInformationDto,
  maxFileExceededMessagePart: string,
): string {
  let messagePart = "";
  if (!_.isEmpty(maxFileExceededMessagePart)) {
    messagePart += maxFileExceededMessagePart.includes(",")
      ? "Die Dateien " + maxFileExceededMessagePart + " überschreiten "
      : "Die Datei " + maxFileExceededMessagePart + " überschreitet ";
    messagePart += "die max. Dateigröße von " + fileInformationDto.maxFileSizeBytes + " Bytes";
  }
  return messagePart;
}

function formatFileAlreadyExistsMessagePartMessagePart(fileAlreadyExistsMessagePart: string): string {
  let messagePart = "";
  if (!_.isEmpty(fileAlreadyExistsMessagePart)) {
    messagePart += fileAlreadyExistsMessagePart.includes(",")
      ? "Die Dateien " + fileAlreadyExistsMessagePart + " sind "
      : "Die Datei " + fileAlreadyExistsMessagePart + " ist ";
    messagePart += "bereits in den Dokumenten enthalten";
  }
  return messagePart;
}

async function saveFiles(fileList: FileList, pathToFiles: string): Promise<void> {
  for (const file of fileList) {
    await saveFile(pathToFiles, file);
  }
}

async function saveFile(pathToFile: string, file: File): Promise<void> {
  const filepathDto: FilepathDto = createFilepathDto();
  filepathDto.pathToFile = pathToFile + file.name;
  let presignedUrlDto: PresignedUrlDto = createPresignedUrlDto();
  await getPresignedUrlForSaveDokument(filepathDto).then((presignedUrlDtoInternal) => {
    presignedUrlDto = presignedUrlDtoInternal;
  });

  if (!_.isNil(presignedUrlDto.url)) {
    await saveDokumentWithUrl(presignedUrlDto, file).then(() => {
      const newDokument = createDokumentDto();
      newDokument.sizeInBytes = file.size;
      newDokument.filePath.pathToFile = filepathDto.pathToFile;
      extractMediaTypeInformationForAllowedMediaType(filepathDto)
        .then((mimeTypeInformation) => {
          newDokument.typDokument = acronymOrDescriptionWhenAcronymEmptyOrTypeWhenDescriptionEmpty(mimeTypeInformation);
          dokumente.value.push(newDokument);
          change();
        })
        .catch((error) => {
          if (error instanceof ResponseError && error.response.status === 406) {
            newDokument.typDokument = mimeTypeNichtErlaubt();
            dokumente.value.push(newDokument);
            change();
          }
        });
    });
  }
}

function acronymOrDescriptionWhenAcronymEmptyOrTypeWhenDescriptionEmpty(
  mimeTypeInformation: MimeTypeInformationDto,
): string {
  let type: string;
  if (_.isEmpty(mimeTypeInformation.acronym)) {
    if (_.isEmpty(mimeTypeInformation.description)) {
      type = _.isNil(mimeTypeInformation.type) ? "" : mimeTypeInformation.type;
    } else {
      type = _.isNil(mimeTypeInformation.description) ? "" : mimeTypeInformation.description;
    }
  } else {
    type = _.isNil(mimeTypeInformation.acronym) ? "" : mimeTypeInformation.acronym;
  }
  return type;
}

function change(): void {
  emit("change");
}
</script>

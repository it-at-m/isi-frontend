import { DokumentDto, FileInformationDto } from "@/api/api-client";
import _ from "lodash";

/**
 * fileAlreadyExists
 */
export function fileAlreadyExists(dokumente: DokumentDto[], file: File, pathToFile: string): boolean {
  const newUrl = pathToFile + file.name;
  const found = dokumente.find((dokument) => {
    return dokument.filePath.pathToFile === newUrl;
  });
  return found !== undefined;
}

/**
 * maxNumberOfFilesReached
 */
export function maxNumberOfFilesReached(dokumente: DokumentDto[], fileList: FileList, fileInformationDto: FileInformationDto): boolean {
  let maximumReached = false;
  if (!_.isNil(fileInformationDto.maxNumberOfFiles) && !_.isNil(dokumente)) {
    maximumReached = dokumente.length + fileList.length > fileInformationDto.maxNumberOfFiles;
  }
  return maximumReached;
}

/**
 * maxFileSizeExceeded
 */
export function maxFileSizeExceeded(file: File, fileInformationDto: FileInformationDto): boolean {
  let maxFileSizeExceeded = false; 
  if (!_.isNil(fileInformationDto.maxFileSizeBytes)) {
    maxFileSizeExceeded = file.size > fileInformationDto.maxFileSizeBytes;
  }
  return maxFileSizeExceeded;
}

/**
 * Stellt die MIME-Types des im Parameter gegebenen Objekts als konkatenierten String zur Verfügung.
 *
 * @param fileInformationDto mit dem Attribut der erlaubtne MIME-Types.
 * @return Die mit einem Komma getrennten konkatenierten MIME-Types.
 * Sind keine MIME-Types vorhanden oder das Attribut der Objects ist undefined, so wird ein leerer String zurückgegeben.
 */
export function getAllowedMimeTypes(fileInformationDto: FileInformationDto): string {
  return _.join(fileInformationDto.allowedMimeTypes);
}
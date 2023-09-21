import { DokumentDto, FileInformationDto, FilepathDto } from "@/api/api-client/isi-backend";
import { createFilepathFor, createDokumentDto } from "@/utils/Factories";
import {
  fileAlreadyExists,
  maxFileSizeExceeded,
  maxNumberOfFilesReached,
  getAllowedMimeTypes,
} from "@/utils/DokumenteUtil";

describe("DokumenteTest.spec.ts", () => {
  test("Maximum Anzahl von Dokumenten erreicht", () => {
    const file = new File(["File1"], "File1.txt", {
      type: "text/plain",
    });
    const file2 = new File(["File2"], "File2.txt", {
      type: "text/plain",
    });
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "file-upload");
    input.multiple = true;
    const mockFileList = Object.create(input.files);
    mockFileList[0] = file;
    mockFileList[1] = file2;
    Object.defineProperty(mockFileList, "length", { value: 2 });
    expect(
      maxNumberOfFilesReached([] as DokumentDto[], mockFileList, {
        maxNumberOfFiles: undefined,
      } as FileInformationDto),
    ).toBe(false);
    expect(
      maxNumberOfFilesReached([] as DokumentDto[], mockFileList, {
        maxNumberOfFiles: 3,
      } as FileInformationDto),
    ).toBe(false);
    expect(
      maxNumberOfFilesReached([createDokumentDto()] as DokumentDto[], mockFileList, {
        maxNumberOfFiles: 3,
      } as FileInformationDto),
    ).toBe(false);
    expect(
      maxNumberOfFilesReached([createDokumentDto(), createDokumentDto()] as DokumentDto[], mockFileList, {
        maxNumberOfFiles: 3,
      } as FileInformationDto),
    ).toBe(true);
  });

  test("Datei exisiert bereits in den Dokumenten", () => {
    const pathToFile = "test/123456/";
    const dokument1 = {
      filePath: { pathToFile: `${pathToFile}Test1.pdf` } as FilepathDto,
    } as DokumentDto;
    const dokument2 = {
      filePath: { pathToFile: `${pathToFile}Test2.pdf` } as FilepathDto,
    } as DokumentDto;
    const file1 = { name: "Test2.pdf" } as File;
    const file2 = { name: "Test3.pdf" } as File;
    expect(fileAlreadyExists([dokument1, dokument2] as DokumentDto[], file1)).toBe(true);
    expect(fileAlreadyExists([dokument1, dokument2] as DokumentDto[], file2)).toBe(false);
  });

  test("Maximale Größe einer Datei überschritten", () => {
    expect(
      maxFileSizeExceeded({ size: 100000000 } as File, { maxFileSizeBytes: undefined } as FileInformationDto),
    ).toBe(false);
    expect(maxFileSizeExceeded({ size: 31457281 } as File, { maxFileSizeBytes: 31457280 } as FileInformationDto)).toBe(
      true,
    );
    expect(maxFileSizeExceeded({ size: 31457280 } as File, { maxFileSizeBytes: 31457280 } as FileInformationDto)).toBe(
      false,
    );
    expect(maxFileSizeExceeded({ size: 0 } as File, { maxFileSizeBytes: 31457280 } as FileInformationDto)).toBe(false);
  });

  test("Test filepath ohne Dokumente", () => {
    const filepath: string = createFilepathFor("test");
    expect(filepath).not.toBeUndefined();
    // "test/<36-stellige UUID>/", d. h. eine (neue) UUID wird generiert
    expect(filepath).toHaveLength(42);
  });

  test("Test Allowed MIME-Types", () => {
    let fileInformationDto: FileInformationDto = {
      allowedMimeTypes: [
        "application/mp4",
        "application/mxf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
      ],
    };
    const result: string = getAllowedMimeTypes(fileInformationDto);
    const expected =
      "application/mp4,application/mxf,application/vnd.openxmlformats-officedocument.wordprocessingml.template";
    expect(result).toEqual(expected);
    fileInformationDto = {};
    expect(getAllowedMimeTypes(fileInformationDto)).toEqual("");
  });
});

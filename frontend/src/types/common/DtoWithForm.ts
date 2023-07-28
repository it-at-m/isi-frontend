import {
  InfrastrukturabfrageDto,
  AbfragevarianteDto,
  BauabschnittDto,
  BaugebietDto,
  BaurateDto,
} from "@/api/api-client/isi-backend";

// Ein Union-Typ aus allen Dto-Typen, welche ein eigenes Formular haben.
type DtoWithForm = InfrastrukturabfrageDto | AbfragevarianteDto | BauabschnittDto | BaugebietDto | BaurateDto;

export default DtoWithForm;

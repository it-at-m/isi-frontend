import { BearbeitendePersonDto } from "@/api/api-client/isi-backend";

export class BenutzerinformationenModel {
  constructor(bearbeitendePerson?: BearbeitendePersonDto, lastModifiedDateTime?: Date) {
    this.bearbeitendePerson = bearbeitendePerson;
    this.lastModifiedDateTime = lastModifiedDateTime;
  }

  public bearbeitendePerson?: BearbeitendePersonDto;

  public lastModifiedDateTime?: Date;
}

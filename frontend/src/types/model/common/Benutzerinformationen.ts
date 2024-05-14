import type { BearbeitendePersonDto } from "@/api/api-client/isi-backend";
class BenutzerinformationenModel {
  constructor(bearbeitendePerson?: BearbeitendePersonDto, lastModifiedDateTime?: Date) {
    this.bearbeitendePerson = bearbeitendePerson;
    this.lastModifiedDateTime = lastModifiedDateTime;
  }

  public bearbeitendePerson?: BearbeitendePersonDto;

  public lastModifiedDateTime?: Date;
}

export { BenutzerinformationenModel as default };

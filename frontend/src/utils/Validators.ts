import _ from "lodash";
import {
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  AdresseDto,
  BauabschnittDto,
  BaugebietDto,
  BauvorhabenDto,
  DokumentDto,
  DokumentDtoArtDokumentEnum,
  GrundschuleDto,
  GsNachmittagBetreuungDto,
  HausFuerKinderDto,
  InfrastruktureinrichtungDto,
  KindergartenDto,
  KinderkrippeDto,
  KommentarDto,
  MittelschuleDto,
} from "@/api/api-client/isi-backend";
import {
  AbfrageDtoArtAbfrageEnum,
  BauleitplanverfahrenDtoStandVerfahrenEnum,
  BaugenehmigungsverfahrenDtoStandVerfahrenEnum,
  WeiteresVerfahrenDtoStandVerfahrenEnum,
  BauvorhabenDtoStandVerfahrenEnum,
  BedarfsmeldungDtoInfrastruktureinrichtungTypEnum,
  InfrastruktureinrichtungDtoStatusEnum,
  BaugebietDtoArtBaulicheNutzungEnum,
  AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum,
  AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum,
  AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum,
  StatusAbfrage,
  UncertainBoolean,
} from "@/api/api-client/isi-backend";
import AdresseModel from "@/types/model/common/AdresseModel";
import AbfragevarianteBauleitplanverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBauleitplanverfahrenModel";
import AbfragevarianteBaugenehmigungsverfahrenModel from "@/types/model/abfragevariante/AbfragevarianteBaugenehmigungsverfahrenModel";
import AbfragevarianteWeiteresVerfahrenModel from "@/types/model/abfragevariante/AbfragevarianteWeiteresVerfahrenModel";
import BauleitplanverfahrenModel from "@/types/model/abfrage/BauleitplanverfahrenModel";
import BaugenehmigungsverfahrenModel from "@/types/model/abfrage/BaugenehmigungsverfahrenModel";
import WeiteresVerfahrenModel from "@/types/model/abfrage/WeiteresVerfahrenModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import moment from "moment";
import {
  addiereAnteile,
  getBauratenFromAllTechnicalBaugebiete,
  getNonTechnicalBaugebiete,
  getYearOfEarliestBaurateOrUndefinedIfNoYearIsGiven,
} from "@/utils/CalculationUtil";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import BedarfsmeldungModel from "@/types/model/abfragevariante/BedarfsmeldungModel";
import type { AnyAbfrageModel, AnyAbfragevarianteDto, AnyAbfragevarianteModel } from "@/types/common/Abfrage";
import { JAHR_FOERDERART_SEPERATOR, sumWohneinheitenOfBauratendateiInput } from "@/utils/BauratendateiUtils";
import { isAdresseEmpty } from "@/utils/AdresseUtil";

/**
 * Prüft die komplette Abfrage vor dem Speichern
 */
export function findFaultInAbfrageForSave(abfrage: AnyAbfrageModel): string | null {
  if (!_.isNil(abfrage) && !_.isNil(abfrage.artAbfrage)) {
    switch (abfrage.artAbfrage) {
      case AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren:
        return findFaultInBauleitplanverfahrenForSave(abfrage);
      case AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren:
        return findFaultInBaugenehmigungsverfahrenForSave(abfrage);
      case AbfrageDtoArtAbfrageEnum.WeiteresVerfahren:
        return findFaultInWeiteresVerfahrenForSave(abfrage);
      default:
        return `Anwendungssystemfehler in ValidatorMixin.findFaultInAbfrageForSave(): AbfrageArt ${abfrage.artAbfrage} ist nicht implementiert`;
    }
  } else {
    return null;
  }
}

/**
 * Bauleitplanverfahren wird vor dem Speichern komplett geprüft
 */
export function findFaultInBauleitplanverfahrenForSave(abfrage: BauleitplanverfahrenModel): string | null {
  if (abfrage.sobonRelevant === UncertainBoolean.Unspecified) {
    return "Bitte angeben ob die Abfrage SoBoN-relevant ist";
  }
  if (abfrage.offizielleMitzeichnung === UncertainBoolean.Unspecified) {
    return "Bitte eine Auswahl bei 'Offizielle Mitzeichnung' treffen";
  }
  if (abfrage.sobonRelevant === UncertainBoolean.True && _.isNil(abfrage.sobonJahr)) {
    return "Die Abfrage ist SoBoN-relevant. Bitte das Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN wählen.";
  }
  return findFaultInAbfrage(abfrage);
}

/**
 * Baugenehmigungsverfahren wird vor dem Speichern komplett geprüft
 */
export function findFaultInBaugenehmigungsverfahrenForSave(abfrage: BaugenehmigungsverfahrenModel): string | null {
  return findFaultInAbfrage(abfrage);
}

/**
 * Weiteres Verfahren wird vor dem Speichern komplett geprüft
 */
export function findFaultInWeiteresVerfahrenForSave(abfrage: WeiteresVerfahrenModel): string | null {
  if (abfrage.sobonRelevant === UncertainBoolean.Unspecified) {
    return "Bitte angeben ob die Abfrage SoBoN-relevant ist";
  }
  if (abfrage.sobonRelevant === UncertainBoolean.True && _.isNil(abfrage.sobonJahr)) {
    return "Die Abfrage ist SoBoN-relevant. Bitte das Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN auswählen.";
  }
  if (abfrage.offizielleMitzeichnung === UncertainBoolean.Unspecified) {
    return "Bitte eine Auswahl bei 'Offizielle Mitzeichnung' treffen";
  }
  return findFaultInAbfrage(abfrage);
}

export function findFaultInAbfragevarianten(abfrage: AnyAbfrageModel): string | null {
  let abfragevarianten: AnyAbfragevarianteDto[] | undefined = undefined;
  if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfragevarianten = (abfrage as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren;
  } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfragevarianten = (abfrage as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren;
  } else {
    abfragevarianten = (abfrage as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren;
  }

  let abfragevariantenSachbearbeitung: AnyAbfragevarianteDto[] | undefined = undefined;
  if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
    abfragevariantenSachbearbeitung = (abfrage as BauleitplanverfahrenModel)
      .abfragevariantenSachbearbeitungBauleitplanverfahren;
  } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
    abfragevariantenSachbearbeitung = (abfrage as BaugenehmigungsverfahrenModel)
      .abfragevariantenSachbearbeitungBaugenehmigungsverfahren;
  } else {
    abfragevariantenSachbearbeitung = (abfrage as WeiteresVerfahrenModel)
      .abfragevariantenSachbearbeitungWeiteresVerfahren;
  }

  if (_.isNil(abfragevarianten) || abfragevarianten.length < 1 || abfragevarianten.length > 5) {
    return "Die Abfrageerstellung kann mindestens eine und maximal fünf Abfragevarianten erstellen.";
  }
  if (_.isNil(abfragevariantenSachbearbeitung) || abfragevariantenSachbearbeitung.length > 5) {
    return "Die Sachbearbeitung kann maximal fünf Abfragevarianten erstellen.";
  }
  let validationMessage = null;
  const allAbfragevarianten = _.concat(_.toArray(abfragevarianten), _.toArray(abfragevariantenSachbearbeitung));
  let abfragevariante: AnyAbfragevarianteModel | undefined = undefined;
  for (const abfragevarianteDto of allAbfragevarianten) {
    abfragevariante = convertAbfragevarianteType(abfrage.artAbfrage, abfragevarianteDto);
    if (!_.isNil(abfragevariante)) {
      validationMessage = findFaultInAbfragevariante(abfrage, abfragevariante);
      if (!_.isNil(validationMessage)) {
        break;
      } else if (abfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung) {
        validationMessage = findFaultInAbfragevarianteInBearbeitungSachbearbeitung(abfragevariante);
        if (!_.isNil(validationMessage)) {
          break;
        }
      }
    }
  }
  return validationMessage;
}

export function findFaultInAbfragevariante(
  abfrage: AnyAbfrageModel,
  abfragevariante: AnyAbfragevarianteModel,
): string | null {
  if (_.isEmpty(abfragevariante.name)) {
    return "Bitte einen Namen für die Abfragevariante angeben.";
  }
  if (_.size(abfragevariante.name) > 30) {
    return `Der Name der Abfragevariante ${abfragevariante.name} ist zu lang.`;
  }
  if (_.isEmpty(abfragevariante.wesentlicheRechtsgrundlage)) {
    return "Bitte die wesentliche Rechtsgrundlage angeben";
  }
  if (_.isNil(abfragevariante.realisierungVon) || _.isNaN(abfragevariante.realisierungVon)) {
    return `Bitte das Jahr für 'Realisierung von' angeben`;
  }
  if (_.isNil(abfragevariante.gfWohnenGesamt) && _.isNil(abfragevariante.weGesamt)) {
    return `Bitte die 'Geschossfläche Wohnen' und/oder 'Anzahl geplante Wohneinheiten' angeben`;
  }
  const messageFaultVerteilung = findFaultInWeGfVerteilungAbfragevariante(abfragevariante);
  if (!_.isNil(messageFaultVerteilung)) {
    return messageFaultVerteilung;
  }
  if (abfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung) {
    if (
      _.isNil(abfragevariante.sobonOrientierungswertJahr) ||
      abfragevariante.sobonOrientierungswertJahr ===
        AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum.Unspecified
    ) {
      return "Bitte für die Bedarfsberechnung das Jahr für die SoBoN-Orientierungwerte angeben";
    }
  }
  if (
    (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren ||
      abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) &&
    _.isEmpty(abfragevariante.bauabschnitte)
  ) {
    return "Bitte für jede Abfragevariante die Bauraten angeben";
  }
  const messageFaultBauschnitte = findFaultInBauabschnitte(abfragevariante);
  if (!_.isNil(messageFaultBauschnitte)) {
    return messageFaultBauschnitte;
  }
  const messageFaultInBedarfsmeldungFachreferate = findFaultInBedarfsmeldungen(
    abfragevariante.bedarfsmeldungFachreferate,
  );
  if (!_.isNil(messageFaultInBedarfsmeldungFachreferate)) {
    return messageFaultInBedarfsmeldungFachreferate;
  }
  const messageFaultInBedarfsmeldungAbfrageersteller = findFaultInBedarfsmeldungen(
    abfragevariante.bedarfsmeldungAbfrageersteller,
  );
  if (!_.isNil(messageFaultInBedarfsmeldungAbfrageersteller)) {
    return messageFaultInBedarfsmeldungAbfrageersteller;
  }
  const messageFaultInAbfragevarianteMarkedSobonBerechnung = findFaultInAbfragevarianteMarkedSobonBerechnung(
    abfrage,
    abfragevariante,
  );
  if (!_.isNil(messageFaultInAbfragevarianteMarkedSobonBerechnung)) {
    return messageFaultInAbfragevarianteMarkedSobonBerechnung;
  }
  const messageFaultInAbfragevarianteBauratendateiInput = findFaultForBauratendateiInput(abfragevariante);
  if (!_.isNil(messageFaultInAbfragevarianteBauratendateiInput)) {
    return messageFaultInAbfragevarianteBauratendateiInput;
  }
  const messageFaultinDokumente = findFaultInDokumente(abfragevariante.dokumente);
  if (!_.isNil(messageFaultinDokumente)) {
    return messageFaultinDokumente;
  }

  const yearOfEarliestBaurate = getYearOfEarliestBaurateOrUndefinedIfNoYearIsGiven(abfragevariante);
  if (!_.isNil(yearOfEarliestBaurate) && yearOfEarliestBaurate !== abfragevariante.realisierungVon) {
    return `Das Jahr ${yearOfEarliestBaurate} der frühesten Baurate der Abfragevariante '${abfragevariante.name}' muss mit dem Jahr ${abfragevariante.realisierungVon} des Attributs 'Realisierung von' der Abfragevariante übereinstimmen.`;
  }

  return null;
}

export function findFaultInAbfragevarianteMarkedSobonBerechnung(
  abfrage: AnyAbfrageModel,
  abfragevariante: AnyAbfragevarianteModel,
): string | null {
  let abfrageSobon = undefined;
  let abfragevarianteSobon = undefined;
  if (
    abfragevariante.artAbfragevariante ===
      AbfragevarianteBauleitplanverfahrenDtoArtAbfragevarianteEnum.Bauleitplanverfahren &&
    abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren
  ) {
    abfrageSobon = abfrage as BauleitplanverfahrenModel;
    abfragevarianteSobon = abfragevariante as AbfragevarianteBauleitplanverfahrenModel;
  } else if (
    abfragevariante.artAbfragevariante ===
      AbfragevarianteWeiteresVerfahrenDtoArtAbfragevarianteEnum.WeiteresVerfahren &&
    abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren
  ) {
    abfrageSobon = abfrage as WeiteresVerfahrenModel;
    abfragevarianteSobon = abfragevariante as AbfragevarianteWeiteresVerfahrenModel;
  }
  if (!_.isNil(abfrageSobon) && !_.isNil(abfragevarianteSobon) && !_.isNil(abfragevarianteSobon.sobonBerechnung)) {
    if (
      !_.isNil(abfragevarianteSobon.sobonBerechnung.isASobonBerechnung) &&
      abfragevarianteSobon.sobonBerechnung.isASobonBerechnung
    ) {
      if (
        _.isNil(abfragevarianteSobon.sobonBerechnung.sobonFoerdermix) ||
        (_.isNil(abfragevarianteSobon.sobonBerechnung.sobonFoerdermix.bezeichnung) &&
          _.isNil(abfragevarianteSobon.sobonBerechnung.sobonFoerdermix.bezeichnungJahr) &&
          abfragevarianteSobon.sobonBerechnung.sobonFoerdermix.foerderarten?.length == 0)
      ) {
        return "Bitte geben Sie einen Fördermix an für die SoBoN-Berechnung";
      }
      if (_.isNil(abfragevarianteSobon.gfWohnenSobonUrsaechlich)) {
        return "Bitte geben Sie SoBoN-ursächliche Geschlossfläche Wohnen an um eine SoBoN-Berechnung durchzuführen.";
      }
      if (_.isNil(abfrageSobon.sobonRelevant) || abfrageSobon.sobonRelevant !== UncertainBoolean.True) {
        return "Die Abfrage muss als SoBoN-Relevant markiert werden um eine SoBoN-Berechnung durchzuführen.";
      }
    }
  }
  return null;
}

export function findFaultInBauabschnitte(abfragevariante: AnyAbfragevarianteDto): string | null {
  let validationMessage: string | null = null;
  for (const bauabschnitt of _.toArray(abfragevariante.bauabschnitte)) {
    validationMessage = findFaultInBauabschnitt(bauabschnitt);
    if (!_.isNil(validationMessage)) {
      break;
    }
  }
  return validationMessage;
}

export function findFaultInBauabschnitt(bauabschnitt: BauabschnittDto): string | null {
  if (_.isEmpty(bauabschnitt.bezeichnung) && !bauabschnitt.technical) {
    return "Die Bezeichnung des Bauabschnitts ist anzugeben.";
  }
  return findFaultInBaugebiete(bauabschnitt);
}

export function findFaultInBaugebiete(bauabschnitt: BauabschnittDto): string | null {
  if (_.isEmpty(bauabschnitt.baugebiete)) {
    return "Die Baugebiete sind anzugeben.";
  }
  let validationMessage: string | null = null;
  for (const baugebiet of _.toArray(bauabschnitt.baugebiete)) {
    validationMessage = findFaultInBaugebiet(baugebiet);
    if (!_.isNil(validationMessage)) {
      break;
    }
  }
  return validationMessage;
}

export function findFaultInBaugebiet(baugebiet: BaugebietDto): string | null {
  let validationMessage;
  if (!baugebiet.technical) {
    if (_.isEmpty(baugebiet.bezeichnung)) {
      return "Die Bezeichnung des Baugebiets ist anzugeben.";
    }
    if (
      _.isNil(baugebiet.artBaulicheNutzung) ||
      baugebiet.artBaulicheNutzung === BaugebietDtoArtBaulicheNutzungEnum.Unspecified
    ) {
      return "Die Art der baulichen Nutzung ist anzugeben.";
    }
    if (_.isNil(baugebiet.realisierungVon) || _.isNaN(baugebiet.realisierungVon)) {
      return "Das Jahr für die Realisierung von ist im Baugebiet anzugeben.";
    }
    validationMessage = findFaultInVerteilungWohneinheitenBaugebiet(baugebiet);
    if (!_.isNil(validationMessage)) {
      return validationMessage;
    }
    validationMessage = findFaultInVerteilungGeschossflaecheWohnenBaugebiet(baugebiet);
    if (!_.isNil(validationMessage)) {
      return validationMessage;
    }
  }
  if (_.isEmpty(baugebiet.bauraten)) {
    return "Die Bauraten sind anzugeben.";
  }
  return findFaultInBauraten(baugebiet.bauraten);
}

export function findFaultInBedarfsmeldungen(bedarfsmeldungen: BedarfsmeldungModel[] | undefined): string | null {
  if (!_.isNil(bedarfsmeldungen)) {
    for (const bedarfsmeldung of _.toArray(bedarfsmeldungen)) {
      const validationMessage: string | null = findFaultInBedarfsmeldung(bedarfsmeldung);
      if (!_.isNil(validationMessage)) {
        return validationMessage;
      }
    }
  }
  return null;
}

export function findFaultInBedarfsmeldung(bedarfsmeldung: BedarfsmeldungModel): string | null {
  if (_.isNil(bedarfsmeldung.anzahlEinrichtungen)) {
    return `Bitte die Anzahl der Einrichtungen angeben`;
  }
  if (bedarfsmeldung.infrastruktureinrichtungTyp === BedarfsmeldungDtoInfrastruktureinrichtungTypEnum.Unspecified) {
    return `Bitte den Typ der Infrastruktureinrichtung angeben`;
  }
  if (
    _.isNil(bedarfsmeldung.anzahlKinderkrippengruppen) &&
    _.isNil(bedarfsmeldung.anzahlKindergartengruppen) &&
    _.isNil(bedarfsmeldung.anzahlHortgruppen) &&
    _.isNil(bedarfsmeldung.anzahlGrundschulzuege)
  ) {
    return `Bitte den Bedarf angeben`;
  }
  return null;
}

export function findFaultInBaurate(baurate: BaurateModel): string | null {
  if (_.isNil(baurate.jahr) || _.isNaN(baurate.jahr)) {
    return "In einer Baurate ist kein Jahr angegeben";
  }
  if (_.isEmpty(baurate.foerdermix?.foerderarten)) {
    return `Der Fördermix ist in Baurate ${baurate.jahr} nicht angegeben`;
  }
  const summe = addiereAnteile(new FoerdermixModel(baurate.foerdermix));
  if (summe < 100) {
    return `Fördermix Gesamtanteil in Baurate ${baurate.jahr} ist unter 100 %`;
  } else if (summe > 100) {
    return `Fördermix Gesamtanteil in Baurate ${baurate.jahr} ist über 100 %`;
  }
  return null;
}

function findFaultInBauraten(bauraten: BaurateModel[]): string | null {
  for (const baurate of _.toArray(bauraten)) {
    const validationMessage: string | null = findFaultInBaurate(new BaurateModel(baurate));
    if (!_.isNil(validationMessage)) {
      return validationMessage;
    }
  }
  return null;
}

export function findFaultInBauvorhaben(bauvorhaben: BauvorhabenDto): string | null {
  if (
    !isValidAngabeLageErgaenzendeAdressinformation(bauvorhaben.adresse?.angabeLageErgaenzendeAdressinformation) &&
    !isValidAdresse(bauvorhaben.adresse)
  ) {
    return "'Angabe zur Lage und ergänzende Adressinformationen' oder Adresse muss angegeben werden";
  }
  if (bauvorhaben.artFnp.length === 0) {
    return "Bitte eine Auswahl zur Flächennutzung laut Flächennutzungsplan treffen";
  }

  if (bauvorhaben.standVerfahren === BauvorhabenDtoStandVerfahrenEnum.Unspecified) {
    return "Bitte den Stand des Verfahrens angeben";
  }

  if (_.isEmpty(bauvorhaben.wesentlicheRechtsgrundlage)) {
    return "Bitte die wesentliche Rechtsgrundlage angeben";
  }

  const validationMessage = findFaultInDokumente(bauvorhaben.dokumente);
  if (!_.isNil(validationMessage)) {
    return validationMessage;
  }

  return null;
}

export function findFaultInKinderkrippeForSave(kinderkrippe: KinderkrippeDto): string | null {
  let validationMessage: string | null;
  validationMessage = findFaultInInfrastruktureinrichtung(kinderkrippe);
  if (_.isNil(validationMessage)) {
    validationMessage = findFaultForWohnungsnahePlaetze(
      "Kinderkrippenplätze",
      kinderkrippe.anzahlKinderkrippePlaetze,
      kinderkrippe.wohnungsnaheKinderkrippePlaetze,
    );
  }
  return validationMessage;
}

export function findFaultInKindergartenForSave(kindergarten: KindergartenDto): string | null {
  let validationMessage: string | null;
  validationMessage = findFaultInInfrastruktureinrichtung(kindergarten);
  if (_.isNil(validationMessage)) {
    validationMessage = findFaultForWohnungsnahePlaetze(
      "Kindergartenplätze",
      kindergarten.anzahlKindergartenPlaetze,
      kindergarten.wohnungsnaheKindergartenPlaetze,
    );
  }
  return validationMessage;
}

export function findFaultInHausFuerKinderForSave(hausFuerKinder: HausFuerKinderDto): string | null {
  let validationMessage: string | null;
  validationMessage = findFaultInInfrastruktureinrichtung(hausFuerKinder);
  if (_.isNil(validationMessage)) {
    validationMessage = findFaultForWohnungsnahePlaetze(
      "Kinderkrippenplätze",
      hausFuerKinder.anzahlKinderkrippePlaetze,
      hausFuerKinder.wohnungsnaheKinderkrippePlaetze,
    );
  }
  if (_.isNil(validationMessage)) {
    validationMessage = findFaultForWohnungsnahePlaetze(
      "Kindergartenplätze",
      hausFuerKinder.anzahlKindergartenPlaetze,
      hausFuerKinder.wohnungsnaheKindergartenPlaetze,
    );
  }
  if (_.isNil(validationMessage)) {
    validationMessage = findFaultForWohnungsnahePlaetze(
      "Hortplätze",
      hausFuerKinder.anzahlHortPlaetze,
      hausFuerKinder.wohnungsnaheHortPlaetze,
    );
  }
  return validationMessage;
}

export function findFaultInGsNachmittagBetreuungForSave(
  gsNachmittagBetreuung: GsNachmittagBetreuungDto,
): string | null {
  let validationMessage: string | null;
  validationMessage = findFaultInInfrastruktureinrichtung(gsNachmittagBetreuung);
  if (_.isNil(validationMessage)) {
    validationMessage = findFaultForWohnungsnahePlaetze(
      "Hortplätze",
      gsNachmittagBetreuung.anzahlHortPlaetze,
      gsNachmittagBetreuung.wohnungsnaheHortPlaetze,
    );
  }
  return validationMessage;
}

export function findFaultInGrundschuleForSave(grundschule: GrundschuleDto): string | null {
  return findFaultInInfrastruktureinrichtung(grundschule);
}

export function findFaultInMittelschuleForSave(mittelschule: MittelschuleDto): string | null {
  return findFaultInInfrastruktureinrichtung(mittelschule);
}

export function findFaultInVerteilungGeschossflaecheWohnenBaugebiet(baugebiet: BaugebietDto): string | null {
  let validationMessage: string | null = null;
  if (!baugebiet.technical && !_.isEmpty(baugebiet.bauraten)) {
    const geschossflaecheWohnenBaugebiet = _.isNil(baugebiet.gfWohnenGeplant) ? 0 : baugebiet.gfWohnenGeplant;

    const sumVerteilteGeschossflaecheWohnenBauraten = _.sum(
      _.toArray(baugebiet.bauraten).map((baurate) => (_.isNil(baurate.gfWohnenGeplant) ? 0 : baurate.gfWohnenGeplant)),
    );

    validationMessage =
      sumVerteilteGeschossflaecheWohnenBauraten.toFixed(2) == geschossflaecheWohnenBaugebiet.toFixed(2)
        ? null
        : `Die Anzahl von ${sumVerteilteGeschossflaecheWohnenBauraten.toFixed(
            2,
          )} m² über Bauraten verteilter Geschossfläche Wohnen entspricht nicht ` +
          `der Anzahl von ${geschossflaecheWohnenBaugebiet.toFixed(2)} m² im Baugebiet${
            _.isNil(baugebiet.bezeichnung) ? "" : " " + baugebiet.bezeichnung
          }.`;
  }
  return validationMessage;
}

export function findFaultInVerteilungWohneinheitenBaugebiet(baugebiet: BaugebietDto): string | null {
  let validationMessage: string | null = null;
  if (!baugebiet.technical && !_.isEmpty(baugebiet.bauraten)) {
    const wohneinheitenBaugebiet = _.isNil(baugebiet.weGeplant) ? 0 : baugebiet.weGeplant;

    const sumVerteilteWohneinheitenBauraten = _.sum(
      _.toArray(baugebiet.bauraten).map((baurate) => (_.isNil(baurate.weGeplant) ? 0 : baurate.weGeplant)),
    );

    validationMessage =
      wohneinheitenBaugebiet == sumVerteilteWohneinheitenBauraten
        ? null
        : `Die Anzahl von ${sumVerteilteWohneinheitenBauraten} über Bauraten verteilter Wohneinheiten entspricht nicht ` +
          `der Anzahl von ${wohneinheitenBaugebiet} im Baugebiet${
            _.isNil(baugebiet.bezeichnung) ? "" : " " + baugebiet.bezeichnung
          }.`;
  }
  return validationMessage;
}

function findFaultInAbfrage(abfrage: AnyAbfrageModel): string | null {
  if (_.isEmpty(abfrage.name)) {
    return "Der Name der Abfrage ist anzugeben.";
  }
  if (_.size(abfrage.name) > 70) {
    return "Der Name der Abfrage ist zu lang.";
  }
  if (
    !isValidAngabeLageErgaenzendeAdressinformation(abfrage.adresse?.angabeLageErgaenzendeAdressinformation) &&
    !isValidAdresse(abfrage.adresse)
  ) {
    return "'Angabe zur Lage und ergänzende Adressinformationen' oder Adresse muss angegeben werden";
  }
  if (
    (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren &&
      abfrage.standVerfahren === BauleitplanverfahrenDtoStandVerfahrenEnum.Unspecified) ||
    (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren &&
      abfrage.standVerfahren === BaugenehmigungsverfahrenDtoStandVerfahrenEnum.Unspecified) ||
    (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.WeiteresVerfahren &&
      abfrage.standVerfahren === WeiteresVerfahrenDtoStandVerfahrenEnum.Unspecified)
  ) {
    return "Bitte Stand des Verfahrens angeben";
  }
  const date = moment(abfrage.fristBearbeitung, "DD.MM.YYYY", true);
  if (!date.isValid() || abfrage.fristBearbeitung?.toISOString() == new Date(0).toISOString()) {
    return "Bearbeitungsfrist nicht angegeben oder nicht im Format TT.MM.JJJJ";
  }

  let validationMessage: string | null = null;
  if (!_.isNil(abfrage)) {
    validationMessage = findFaultInDokumente(abfrage.dokumente);
    if (!_.isNil(validationMessage)) {
      return validationMessage;
    }
  }

  return findFaultInAbfragevarianten(abfrage);
}

function isValidAngabeLageErgaenzendeAdressinformation(angabeLageErgaenzendeAdressinformation?: string): boolean {
  return !_.isNil(angabeLageErgaenzendeAdressinformation) && !_.isEmpty(angabeLageErgaenzendeAdressinformation.trim());
}

function isValidAdresse(adresse?: AdresseDto): boolean {
  if (!_.isNil(adresse)) {
    const model: AdresseModel = new AdresseModel(adresse);
    return _.isNil(model) ? false : !isAdresseEmpty(model);
  }
  return false;
}

function convertAbfragevarianteType(
  artAbfrage: AbfrageDtoArtAbfrageEnum | undefined,
  abfragevarianteDto: AnyAbfragevarianteDto,
): AnyAbfragevarianteModel | undefined {
  let abfragevariante: AnyAbfragevarianteModel | undefined = undefined;

  switch (artAbfrage) {
    case AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren:
      abfragevariante = abfragevarianteDto as AbfragevarianteBauleitplanverfahrenModel;
      break;
    case AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren:
      abfragevariante = abfragevarianteDto as AbfragevarianteBaugenehmigungsverfahrenModel;
      break;
    case AbfrageDtoArtAbfrageEnum.WeiteresVerfahren:
      abfragevariante = abfragevarianteDto as AbfragevarianteWeiteresVerfahrenModel;
      break;
    default:
      abfragevariante = undefined;
      break;
  }
  return abfragevariante;
}

function findFaultInAbfragevarianteInBearbeitungSachbearbeitung(
  abfragevariante: AnyAbfragevarianteModel,
): string | null {
  if (
    _.isNil(abfragevariante.sobonOrientierungswertJahr) ||
    abfragevariante.sobonOrientierungswertJahr ===
      AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum.Unspecified
  ) {
    return `Bitte geben Sie das 'Jahr für SoBoN-Orientierungswerte' bei Abfragevariante '${abfragevariante.name}' an.`;
  }
  return null;
}

function findFaultInInfrastruktureinrichtung(infrastruktureinrichtung: InfrastruktureinrichtungDto): string | null {
  if (_.isNil(infrastruktureinrichtung.nameEinrichtung)) {
    return "Bitte den Namen für die Infrastruktureinrichtung angeben.";
  }
  if (_.isNil(infrastruktureinrichtung.status)) {
    return "Bitte den Status der Infrastruktureinrichtung angeben";
  }
  if (
    _.isNil(infrastruktureinrichtung.fertigstellungsjahr) &&
    infrastruktureinrichtung.status !== InfrastruktureinrichtungDtoStatusEnum.Bestand
  ) {
    return "Bitte das Jahr der Fertigstellung der Infrastruktureinrichtung angeben";
  }
  if (
    !isValidAngabeLageErgaenzendeAdressinformation(
      infrastruktureinrichtung.adresse?.angabeLageErgaenzendeAdressinformation,
    ) &&
    !isValidAdresse(infrastruktureinrichtung.adresse)
  ) {
    return "'Angabe zur Lage und ergänzende Adressinformationen' oder Adresse muss angegeben werden";
  }
  return null;
}

function findFaultForWohnungsnahePlaetze(
  artPlaetze: string,
  plaetzeGesamt: number | undefined,
  plaetzeWohnungsnah: number | undefined,
): string | null {
  if (_.defaultTo(plaetzeWohnungsnah, 0) > _.defaultTo(plaetzeGesamt, 0)) {
    return `Die Anzahl der wohnungsnahen ${artPlaetze} darf nicht die Gesamtanzahl der verfügbaren ${artPlaetze} übersteigen.`;
  }
  return null;
}

function findFaultForBauratendateiInput(
  abfragevariante:
    | AbfragevarianteBauleitplanverfahrenDto
    | AbfragevarianteBaugenehmigungsverfahrenDto
    | AbfragevarianteWeiteresVerfahrenDto,
): string | null {
  if (_.isNil(abfragevariante.hasBauratendateiInput) || !abfragevariante.hasBauratendateiInput) {
    return null;
  }

  const bauratendateiInputBasis = _.isNil(abfragevariante.bauratendateiInputBasis)
    ? []
    : [abfragevariante.bauratendateiInputBasis];
  const bauratendateiInput = _.toArray(abfragevariante.bauratendateiInput);

  const wohneinheiten = bauratendateiInput.flatMap((input) => _.toArray(input.wohneinheiten));
  for (const wohneinheit of wohneinheiten) {
    if (_.isEmpty(wohneinheit.jahr)) {
      return "Jahresangabe bei Eintrag zur Bauratendatei und Schülerpotentialprognose fehlt.";
    }
  }

  const sumBasis = sumWohneinheitenOfBauratendateiInput(bauratendateiInputBasis);
  const sumInputs = sumWohneinheitenOfBauratendateiInput(bauratendateiInput);

  const validationMessage = `Die Daten der Bauratendatei und Schülerpotentialprognose in Abfragevariante "${abfragevariante.name}" stimmen nicht mit den errechneten Wohneinheiten überein.`;

  if (sumBasis.size != sumInputs.size) {
    return validationMessage;
  }

  for (const [jahrAndFoerderart, wohneinheiten] of sumBasis) {
    const numberOfWohneinheitenInputs = sumInputs.get(jahrAndFoerderart);
    const nonNullNumberOfWohneinheitenInputs = _.isNil(numberOfWohneinheitenInputs) ? 0 : numberOfWohneinheitenInputs;
    const difference = Math.abs(wohneinheiten - nonNullNumberOfWohneinheitenInputs);
    // Prüfung wegen möglicher Rundungen bedingt durch IEEE754
    if (difference >= 0.001) {
      const splittedJahrAndFoerderart = _.split(jahrAndFoerderart, JAHR_FOERDERART_SEPERATOR);
      return ` In der Bauratendatei und Schülerpotentialprognose in Abfragevariante "${abfragevariante.name}" stimmen die errechneten Wohneinheiten der Förderart "${splittedJahrAndFoerderart[1]}" im Jahr "${splittedJahrAndFoerderart[0]}" in Höhe von "${wohneinheiten}" nicht mit der Summe der aufgeteilten Wohneinheiten in Höhe von "${nonNullNumberOfWohneinheitenInputs}" überein.`;
    }
  }

  const validationMessageDokumente = findFaultInDokumente(abfragevariante.dokumente);
  if (!_.isNil(validationMessageDokumente)) {
    return validationMessageDokumente;
  }

  return null;
}

export function findFaultInKommentar(kommentar: KommentarDto): string | null {
  return findFaultInDokumente(kommentar.dokumente);
}

function findFaultInDokumente(dokumente: Array<DokumentDto> | undefined): string | null {
  let validationMessage: string | null = null;
  if (!_.isNil(dokumente) && dokumente.some((dokument) => dokument.artDokument === undefined)) {
    validationMessage = `Das Feld Dokumentart zu dem/den Dokument(en) darf nicht leer sein. Gibt es keine passende Dokumentenart, so ist der Wert '--- Keine Angabe ---' zu wählen.`;
  }
  return validationMessage;
}

/**
 * Überprüft, ob die Verteilung der Wohneinheiten und Geschossfläche Wohnen auf Baugebiete bzw. Bauraten valide ist.
 * WE bzw. GF gelten als "verteilt", wenn bei mindestens einem Baugebiet bzw. Baurate eine Angabe zu ihnen gemacht wurde.
 * WE bzw. GF gelten als "korrekt verteilt", wenn zusätzlich ihre Summe in den Baugebieten bzw. Bauraten der Gesamtanzahl entspricht.
 * Die Verteilung ist valide, wenn WE und GF korrekt verteilt wurden.
 * Ebenso ist die Verteilung valide, wenn entweder WE oder GF korrekt verteilt wurde, aber der andere Wert nicht verteilt wurde.
 *
 * @param abfragevariante zur Validierung.
 * @return ob die Verteilung entsprechend der Beschreibung valide ist.
 */
function findFaultInWeGfVerteilungAbfragevariante(
  abfragevariante:
    | AbfragevarianteBauleitplanverfahrenDto
    | AbfragevarianteBaugenehmigungsverfahrenDto
    | AbfragevarianteWeiteresVerfahrenDto,
): string | null {
  const nonTechnicalBaugebiete = getNonTechnicalBaugebiete(abfragevariante);
  const bauratenFromAllTechnicalBaugebiete = getBauratenFromAllTechnicalBaugebiete(abfragevariante);

  const containsNonTechnicalBaugebiet = !_.isEmpty(nonTechnicalBaugebiete);
  const containsBauratenInTechnicalBaugebiet = !_.isEmpty(bauratenFromAllTechnicalBaugebiete);

  const wohneinheitenAbfragevariante = _.isNil(abfragevariante.weGesamt) ? 0 : abfragevariante.weGesamt;
  const geschossflaecheWohnenAbfragevariante = _.isNil(abfragevariante.gfWohnenGesamt)
    ? 0
    : abfragevariante.gfWohnenGesamt;

  let validationMessageWohneinheiten: string | null = null;
  let allWohneinheitenNil = true;
  let validationMessageGfWohnen: string | null = null;
  let allGfWohnenNil = true;

  /*
  Unterscheidung zwischen technischen und nicht-technischen Baugebieten, da technische Baugebiete keine Daten enthalten sollen.
  Bei ihnen werden stattdessen die untergeordneten Bauraten als Datenquelle hergenommen.
  */
  if (containsNonTechnicalBaugebiet) {
    // Die Abfragevariante ist mit einem nicht-technischen Baugebiet versehen.
    const sumVerteilteWohneinheitenBaugebiete = _.sum(
      nonTechnicalBaugebiete.map((baugebiet) => {
        if (!_.isNil(baugebiet.weGeplant)) {
          allWohneinheitenNil = false;
          return baugebiet.weGeplant;
        }
        return 0;
      }),
    );

    validationMessageWohneinheiten =
      sumVerteilteWohneinheitenBaugebiete == wohneinheitenAbfragevariante
        ? null
        : `Die Anzahl von ${sumVerteilteWohneinheitenBaugebiete} über Baugebiete verteilter Wohneinheiten entspricht nicht ` +
          `der Anzahl von ${wohneinheitenAbfragevariante} in der Abfragevariante${
            _.isNil(abfragevariante.name) ? "" : " " + abfragevariante.name
          }.`;

    const sumVerteilteGeschossflaecheWohnenBaugebiete = _.sum(
      nonTechnicalBaugebiete.map((baugebiet) => {
        if (!_.isNil(baugebiet.gfWohnenGeplant)) {
          allGfWohnenNil = false;
          return baugebiet.gfWohnenGeplant;
        }
        return 0;
      }),
    );

    validationMessageGfWohnen =
      sumVerteilteGeschossflaecheWohnenBaugebiete.toFixed(2) == geschossflaecheWohnenAbfragevariante.toFixed(2)
        ? null
        : `Die Anzahl von ${sumVerteilteGeschossflaecheWohnenBaugebiete.toFixed(
            2,
          )} m² über Baugebiete verteilter Geschossfläche Wohnen entspricht nicht ` +
          `der Anzahl von ${geschossflaecheWohnenAbfragevariante.toFixed(2)} m² in der Abfragevariante${
            _.isNil(abfragevariante.name) ? "" : " " + abfragevariante.name
          }.`;
  } else if (containsBauratenInTechnicalBaugebiet) {
    // Die Bauraten sind direkt für eine Abfragevariante erstellt worden. Die Abfragevariante ist somit mit einem technischen Baugebiet versehen.
    const sumVerteilteWohneinheitenBauraten = _.sum(
      bauratenFromAllTechnicalBaugebiete.map((baurate) => {
        if (!_.isNil(baurate.weGeplant)) {
          allWohneinheitenNil = false;
          return baurate.weGeplant;
        }
        return 0;
      }),
    );

    validationMessageWohneinheiten =
      sumVerteilteWohneinheitenBauraten == wohneinheitenAbfragevariante
        ? null
        : `Die Anzahl von ${sumVerteilteWohneinheitenBauraten} über Bauraten verteilter Wohneinheiten entspricht nicht ` +
          `der Anzahl von ${wohneinheitenAbfragevariante} in der Abfragevariante${
            _.isNil(abfragevariante.name) ? "" : " " + abfragevariante.name
          }.`;

    const sumVerteilteGeschossflaecheWohnenBauraten = _.sum(
      bauratenFromAllTechnicalBaugebiete.map((baurate) => {
        if (!_.isNil(baurate.gfWohnenGeplant)) {
          allGfWohnenNil = false;
          return baurate.gfWohnenGeplant;
        }
        return 0;
      }),
    );

    validationMessageGfWohnen =
      sumVerteilteGeschossflaecheWohnenBauraten.toFixed(2) == geschossflaecheWohnenAbfragevariante.toFixed(2)
        ? null
        : `Die Anzahl von ${sumVerteilteGeschossflaecheWohnenBauraten.toFixed(
            2,
          )} m² über Bauraten verteilter Geschossfläche Wohnen entspricht nicht ` +
          `der Anzahl von ${geschossflaecheWohnenAbfragevariante.toFixed(2)} m² in der Abfragevariante${
            _.isNil(abfragevariante.name) ? "" : " " + abfragevariante.name
          }.`;
  } else {
    return null;
  }

  const wohneinheitenEqual = validationMessageWohneinheiten === null;
  const wohneinheitenCorrect = wohneinheitenEqual && !allWohneinheitenNil;
  const gfWohnenEqual = validationMessageGfWohnen === null;
  const gfWohnenCorrect = gfWohnenEqual && !allGfWohnenNil;

  if (
    (wohneinheitenCorrect && gfWohnenCorrect) ||
    (wohneinheitenCorrect && allGfWohnenNil) ||
    (allWohneinheitenNil && gfWohnenCorrect)
  ) {
    return null;
  } else if (!wohneinheitenEqual) {
    return validationMessageWohneinheiten;
  } else {
    return validationMessageGfWohnen;
  }
}

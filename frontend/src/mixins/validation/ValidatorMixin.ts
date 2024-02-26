import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
import {
  AbfrageDtoArtAbfrageEnum,
  BauleitplanverfahrenDtoStandVerfahrenEnum,
  BaugenehmigungsverfahrenDtoStandVerfahrenEnum,
  WeiteresVerfahrenDtoStandVerfahrenEnum,
  AbfragevarianteBauleitplanverfahrenDto,
  AbfragevarianteBaugenehmigungsverfahrenDto,
  AbfragevarianteWeiteresVerfahrenDto,
  AdresseDto,
  BauabschnittDto,
  BaugebietDto,
  BauvorhabenDto,
  BauvorhabenDtoStandVerfahrenEnum,
  BedarfsmeldungDtoInfrastruktureinrichtungTypEnum,
  GrundschuleDto,
  GsNachmittagBetreuungDto,
  HausFuerKinderDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungDtoStatusEnum,
  KindergartenDto,
  KinderkrippeDto,
  MittelschuleDto,
  UncertainBoolean,
  StatusAbfrage,
  BaugebietDtoArtBaulicheNutzungEnum,
  AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum,
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
} from "@/utils/CalculationUtil";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import BedarfsmeldungModel from "@/types/model/abfragevariante/BedarfsmeldungModel";

@Component
export default class ValidatorMixin extends Vue {
  /**
   * Prüft die komplette Abfrage vor dem Speichern
   */
  public findFaultInAbfrageForSave(
    abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): string | null {
    if (!_.isNil(abfrage) && !_.isNil(abfrage.artAbfrage)) {
      switch (abfrage.artAbfrage) {
        case AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren:
          return this.findFaultInBauleitplanverfahrenForSave(abfrage);
        case AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren:
          return this.findFaultInBaugenehmigungsverfahrenForSave(abfrage);
        case AbfrageDtoArtAbfrageEnum.WeiteresVerfahren:
          return this.findFaultInWeiteresVerfahrenForSave(abfrage);
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
  public findFaultInBauleitplanverfahrenForSave(abfrage: BauleitplanverfahrenModel): string | null {
    if (abfrage.sobonRelevant === UncertainBoolean.Unspecified) {
      return "Bitte angeben ob die Abfrage SoBoN-relevant ist";
    }
    if (abfrage.offizielleMitzeichnung === UncertainBoolean.Unspecified) {
      return "Bitte eine Auswahl bei 'Offizielle Mitzeichnung' treffen";
    }
    if (abfrage.sobonRelevant === UncertainBoolean.True && _.isNil(abfrage.sobonJahr)) {
      return "Die Abfrage ist SoBoN-relevant. Bitte das Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN wählen.";
    }
    return this.findFaultInAbfrage(abfrage);
  }

  /**
   * Baugenehmigungsverfahren wird vor dem Speichern komplett geprüft
   */
  public findFaultInBaugenehmigungsverfahrenForSave(abfrage: BaugenehmigungsverfahrenModel): string | null {
    return this.findFaultInAbfrage(abfrage);
  }

  /**
   * Weiteres Verfahren wird vor dem Speichern komplett geprüft
   */
  public findFaultInWeiteresVerfahrenForSave(abfrage: WeiteresVerfahrenModel): string | null {
    if (abfrage.sobonRelevant === UncertainBoolean.Unspecified) {
      return "Bitte angeben ob die Abfrage SoBoN-relevant ist";
    }
    if (abfrage.sobonRelevant === UncertainBoolean.True && _.isNil(abfrage.sobonJahr)) {
      return "Die Abfrage ist SoBoN-relevant. Bitte das Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN auswählen.";
    }
    if (abfrage.offizielleMitzeichnung === UncertainBoolean.Unspecified) {
      return "Bitte eine Auswahl bei 'Offizielle Mitzeichnung' treffen";
    }
    return this.findFaultInAbfrage(abfrage);
  }

  private findFaultInAbfrage(
    abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): string | null {
    if (_.isEmpty(abfrage.name)) {
      return "Der Name der Abfrage ist anzugeben.";
    }
    if (
      !this.isValidAngabeLageErgaenzendeAdressinformation(abfrage.adresse?.angabeLageErgaenzendeAdressinformation) &&
      !this.isValidAdresse(abfrage.adresse)
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
    return this.findFaultInAbfragevarianten(abfrage);
  }

  private isValidAngabeLageErgaenzendeAdressinformation(angabeLageErgaenzendeAdressinformation?: string): boolean {
    return (
      !_.isNil(angabeLageErgaenzendeAdressinformation) && !_.isEmpty(angabeLageErgaenzendeAdressinformation.trim())
    );
  }

  private isValidAdresse(adresse?: AdresseDto): boolean {
    if (!_.isNil(adresse)) {
      const model: AdresseModel = new AdresseModel(adresse);
      return _.isNil(model) ? false : !model.isEmpty;
    }
    return false;
  }

  public findFaultInAbfragevarianten(
    abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): string | null {
    let abfragevarianten = undefined;
    if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren) {
      abfragevarianten = (abfrage as BauleitplanverfahrenModel).abfragevariantenBauleitplanverfahren;
    } else if (abfrage.artAbfrage === AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren) {
      abfragevarianten = (abfrage as BaugenehmigungsverfahrenModel).abfragevariantenBaugenehmigungsverfahren;
    } else {
      abfragevarianten = (abfrage as WeiteresVerfahrenModel).abfragevariantenWeiteresVerfahren;
    }

    let abfragevariantenSachbearbeitung = undefined;
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
    let abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel
      | undefined = undefined;
    for (const abfragevarianteDto of allAbfragevarianten) {
      switch (abfrage.artAbfrage) {
        case AbfrageDtoArtAbfrageEnum.Bauleitplanverfahren:
          abfragevariante = abfragevarianteDto as AbfragevarianteBauleitplanverfahrenModel;
          validationMessage = this.findFaultInAbfragevarianteMarkedSobonBerechnung(abfrage, abfragevariante);
          break;
        case AbfrageDtoArtAbfrageEnum.Baugenehmigungsverfahren:
          abfragevariante = abfragevarianteDto as AbfragevarianteBaugenehmigungsverfahrenModel;
          break;
        case AbfrageDtoArtAbfrageEnum.WeiteresVerfahren:
          abfragevariante = abfragevarianteDto as AbfragevarianteWeiteresVerfahrenModel;
          validationMessage = this.findFaultInAbfragevarianteMarkedSobonBerechnung(abfrage, abfragevariante);
          break;
        default:
          abfragevariante = undefined;
          break;
      }
      if (!_.isNil(abfragevariante)) {
        validationMessage = this.findFaultInAbfragevariante(abfrage, abfragevariante);
        if (!_.isNil(validationMessage)) {
          break;
        }
      }
    }
    return validationMessage;
  }

  public findFaultInAbfragevariante(
    abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel,
  ): string | null {
    if (_.isEmpty(abfragevariante.name)) {
      return "Bitte einen Namen für die Abfragevariante angeben.";
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
    const messageFaultVerteilungWohneinheiten = this.findFaultInVerteilungWohneinheitenAbfragevariante(abfragevariante);
    if (!_.isNil(messageFaultVerteilungWohneinheiten)) {
      return messageFaultVerteilungWohneinheiten;
    }
    const messageFaultVerteilungGeschossflaecheWohnen =
      this.findFaultInVerteilungGeschossflaecheWohnenAbfragevariante(abfragevariante);
    if (!_.isNil(messageFaultVerteilungGeschossflaecheWohnen)) {
      return messageFaultVerteilungGeschossflaecheWohnen;
    }
    if (abfrage.statusAbfrage === StatusAbfrage.InBearbeitungSachbearbeitung) {
      if (
        _.isNil(abfragevariante.sobonOrientierungswertJahr) ||
        abfragevariante.sobonOrientierungswertJahr ===
          AbfragevarianteBauleitplanverfahrenDtoSobonOrientierungswertJahrEnum.Unspecified
      ) {
        return "Bitte für die Bedarfsberechnung das Jahr für die SoBoN-Orientierungwerte angeben";
      }
      if (_.isNil(abfragevariante.stammdatenGueltigAb)) {
        return "Bitte für die für die Bedarfsberechnung die Gültigkeit des Stammdatums angeben";
      }
    }
    const messageFaultBauschnitte = this.findFaultInBauabschnitte(abfragevariante);
    if (!_.isNil(messageFaultBauschnitte)) {
      return messageFaultBauschnitte;
    }
    const messageFaultInBedarfsmeldungFachreferate = this.findFaultInBedarfsmeldungen(
      abfragevariante.bedarfsmeldungFachreferate,
    );
    if (!_.isNil(messageFaultInBedarfsmeldungFachreferate)) {
      return messageFaultInBedarfsmeldungFachreferate;
    }
    const messageFaultInBedarfsmeldungAbfrageersteller = this.findFaultInBedarfsmeldungen(
      abfragevariante.bedarfsmeldungAbfrageersteller,
    );
    if (!_.isNil(messageFaultInBedarfsmeldungAbfrageersteller)) {
      return messageFaultInBedarfsmeldungAbfrageersteller;
    }

    return null;
  }

  public findFaultInAbfragevarianteMarkedSobonBerechnung(
    abfrage: BauleitplanverfahrenModel | WeiteresVerfahrenModel,
    abfragevariante: AbfragevarianteBauleitplanverfahrenModel | AbfragevarianteWeiteresVerfahrenModel,
  ): string | null {
    if (abfragevariante.isASobonBerechnung) {
      if (_.isNil(abfragevariante.sobonFoerdermix)) {
        return "Bitte geben Sie einen Fördermix an für die SoBoN-Berechnung";
      }
      if (_.isNil(abfragevariante.gfWohnenSobonUrsaechlich)) {
        return "Bitte geben Sie SoBoN-ursächliche Geschlossfläche Wohnen an um eine SoBoN-Berechnung durchzuführen.";
      }
      if (abfrage.sobonRelevant !== UncertainBoolean.True) {
        return "Die Abfrage muss als SoBoN Relevant markiert werden um eine SoBoN-Berechnung durchzuführen.";
      }
    }
    return null;
  }

  public findFaultInBauabschnitte(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenDto
      | AbfragevarianteBaugenehmigungsverfahrenDto
      | AbfragevarianteWeiteresVerfahrenDto,
  ): string | null {
    let validationMessage: string | null = null;
    for (const bauabschnitt of _.toArray(abfragevariante.bauabschnitte)) {
      validationMessage = this.findFaultInBauabschnitt(bauabschnitt);
      if (!_.isNil(validationMessage)) {
        break;
      }
    }
    return validationMessage;
  }

  public findFaultInBauabschnitt(bauabschnitt: BauabschnittDto): string | null {
    if (_.isEmpty(bauabschnitt.bezeichnung) && !bauabschnitt.technical) {
      return "Die Bezeichnung des Bauabschnitts ist anzugeben.";
    }
    return this.findFaultInBaugebiete(bauabschnitt);
  }

  public findFaultInBaugebiete(bauabschnitt: BauabschnittDto): string | null {
    if (_.isEmpty(bauabschnitt.baugebiete)) {
      return "Die Baugebiete sind anzugeben.";
    }
    let validationMessage: string | null = null;
    for (const baugebiet of _.toArray(bauabschnitt.baugebiete)) {
      validationMessage = this.findFaultInBaugebiet(baugebiet);
      if (!_.isNil(validationMessage)) {
        break;
      }
    }
    return validationMessage;
  }

  public findFaultInBaugebiet(baugebiet: BaugebietDto): string | null {
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
      validationMessage = this.findFaultInVerteilungWohneinheitenBaugebiet(baugebiet);
      if (!_.isNil(validationMessage)) {
        return validationMessage;
      }
      validationMessage = this.findFaultInVerteilungGeschossflaecheWohnenBaugebiet(baugebiet);
      if (!_.isNil(validationMessage)) {
        return validationMessage;
      }
    }
    if (_.isEmpty(baugebiet.bauraten)) {
      return "Die Bauraten sind anzugeben.";
    }
    return this.findFaultInBauraten(baugebiet.bauraten);
  }

  public findFaultInBedarfsmeldungen(bedarfsmeldungen: BedarfsmeldungModel[] | undefined): string | null {
    if (!_.isNil(bedarfsmeldungen)) {
      for (const bedarfsmeldung of _.toArray(bedarfsmeldungen)) {
        const validationMessage: string | null = this.findFaultInBedarfsmeldung(bedarfsmeldung);
        if (!_.isNil(validationMessage)) {
          return validationMessage;
        }
      }
    }
    return null;
  }

  public findFaultInBedarfsmeldung(bedarfsmeldung: BedarfsmeldungModel): string | null {
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

  findFaultInBauraten(bauraten: BaurateModel[]): string | null {
    for (const baurate of _.toArray(bauraten)) {
      const validationMessage: string | null = this.findFaultInBaurate(new BaurateModel(baurate));
      if (!_.isNil(validationMessage)) {
        return validationMessage;
      }
    }
    return null;
  }

  findFaultInBaurate(baurate: BaurateModel): string | null {
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

  findFaultInBauvorhaben(bauvorhaben: BauvorhabenDto): string | null {
    if (
      !this.isValidAngabeLageErgaenzendeAdressinformation(
        bauvorhaben.adresse?.angabeLageErgaenzendeAdressinformation,
      ) &&
      !this.isValidAdresse(bauvorhaben.adresse)
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

    return null;
  }

  public findFaultInKinderkrippeForSave(kinderkrippe: KinderkrippeDto): string | null {
    let validationMessage: string | null;
    validationMessage = this.findFaultInInfrastruktureinrichtung(kinderkrippe);
    if (_.isNil(validationMessage)) {
      validationMessage = this.findFaultForWohnungsnahePlaetze(
        "Kinderkrippenplätze",
        kinderkrippe.anzahlKinderkrippePlaetze,
        kinderkrippe.wohnungsnaheKinderkrippePlaetze,
      );
    }
    return validationMessage;
  }

  public findFaultInKindergartenForSave(kindergarten: KindergartenDto): string | null {
    let validationMessage: string | null;
    validationMessage = this.findFaultInInfrastruktureinrichtung(kindergarten);
    if (_.isNil(validationMessage)) {
      validationMessage = this.findFaultForWohnungsnahePlaetze(
        "Kindergartenplätze",
        kindergarten.anzahlKindergartenPlaetze,
        kindergarten.wohnungsnaheKindergartenPlaetze,
      );
    }
    return validationMessage;
  }

  public findFaultInHausFuerKinderForSave(hausFuerKinder: HausFuerKinderDto): string | null {
    let validationMessage: string | null;
    validationMessage = this.findFaultInInfrastruktureinrichtung(hausFuerKinder);
    if (_.isNil(validationMessage)) {
      validationMessage = this.findFaultForWohnungsnahePlaetze(
        "Kinderkrippenplätze",
        hausFuerKinder.anzahlKinderkrippePlaetze,
        hausFuerKinder.wohnungsnaheKinderkrippePlaetze,
      );
    }
    if (_.isNil(validationMessage)) {
      validationMessage = this.findFaultForWohnungsnahePlaetze(
        "Kindergartenplätze",
        hausFuerKinder.anzahlKindergartenPlaetze,
        hausFuerKinder.wohnungsnaheKindergartenPlaetze,
      );
    }
    if (_.isNil(validationMessage)) {
      validationMessage = this.findFaultForWohnungsnahePlaetze(
        "Hortplätze",
        hausFuerKinder.anzahlHortPlaetze,
        hausFuerKinder.wohnungsnaheHortPlaetze,
      );
    }
    return validationMessage;
  }

  public findFaultInGsNachmittagBetreuungForSave(gsNachmittagBetreuung: GsNachmittagBetreuungDto): string | null {
    let validationMessage: string | null;
    validationMessage = this.findFaultInInfrastruktureinrichtung(gsNachmittagBetreuung);
    if (_.isNil(validationMessage)) {
      validationMessage = this.findFaultForWohnungsnahePlaetze(
        "Hortplätze",
        gsNachmittagBetreuung.anzahlHortPlaetze,
        gsNachmittagBetreuung.wohnungsnaheHortPlaetze,
      );
    }
    return validationMessage;
  }

  public findFaultInGrundschuleForSave(grundschule: GrundschuleDto): string | null {
    return this.findFaultInInfrastruktureinrichtung(grundschule);
  }

  public findFaultInMittelschuleForSave(mittelschule: MittelschuleDto): string | null {
    return this.findFaultInInfrastruktureinrichtung(mittelschule);
  }

  private findFaultInInfrastruktureinrichtung(infrastruktureinrichtung: InfrastruktureinrichtungDto): string | null {
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
      !this.isValidAngabeLageErgaenzendeAdressinformation(
        infrastruktureinrichtung.adresse?.angabeLageErgaenzendeAdressinformation,
      ) &&
      !this.isValidAdresse(infrastruktureinrichtung.adresse)
    ) {
      return "'Angabe zur Lage und ergänzende Adressinformationen' oder Adresse muss angegeben werden";
    }
    return null;
  }

  private findFaultForWohnungsnahePlaetze(
    artPlaetze: string,
    plaetzeGesamt: number | undefined,
    plaetzeWohnungsnah: number | undefined,
  ): string | null {
    if (_.defaultTo(plaetzeWohnungsnah, 0) > _.defaultTo(plaetzeGesamt, 0)) {
      return `Die Anzahl der wohnungsnahen ${artPlaetze} darf nicht die Gesamtanzahl der verfügbaren ${artPlaetze} übersteigen.`;
    }
    return null;
  }

  public findFaultInVerteilungWohneinheitenAbfragevariante(
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

    let message: string | null = null;

    if (containsNonTechnicalBaugebiet) {
      // Die Abfragevariante ist mit einem nicht-technischen Baugebiet versehen.
      const sumVerteilteWohneinheitenBaugebiete = _.sum(
        nonTechnicalBaugebiete.map((baugebiet) => (_.isNil(baugebiet.weGeplant) ? 0 : baugebiet.weGeplant)),
      );

      message =
        sumVerteilteWohneinheitenBaugebiete == wohneinheitenAbfragevariante
          ? null
          : `Die Anzahl von ${sumVerteilteWohneinheitenBaugebiete} über Baugebiete verteilter Wohneinheiten entspricht nicht ` +
            `der Anzahl von ${wohneinheitenAbfragevariante} in der Abfragevariante${
              _.isNil(abfragevariante.name) ? "" : " " + abfragevariante.name
            }.`;
    } else if (containsBauratenInTechnicalBaugebiet) {
      // Die Bauraten sind direkt für eine Abfragevariante erstellt worden. Die Abfragevariante ist somit mit einem technischen Baugebiet versehen.
      const sumVerteilteWohneinheitenBauraten = _.sum(
        bauratenFromAllTechnicalBaugebiete.map((baurate) => (_.isNil(baurate.weGeplant) ? 0 : baurate.weGeplant)),
      );

      message =
        sumVerteilteWohneinheitenBauraten == wohneinheitenAbfragevariante
          ? null
          : `Die Anzahl von ${sumVerteilteWohneinheitenBauraten} über Bauraten verteilter Wohneinheiten entspricht nicht ` +
            `der Anzahl von ${wohneinheitenAbfragevariante} in der Abfragevariante${
              _.isNil(abfragevariante.name) ? "" : " " + abfragevariante.name
            }.`;
    }

    return message;
  }

  public findFaultInVerteilungGeschossflaecheWohnenAbfragevariante(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenDto
      | AbfragevarianteBaugenehmigungsverfahrenDto
      | AbfragevarianteWeiteresVerfahrenDto,
  ): string | null {
    const nonTechnicalBaugebiete = getNonTechnicalBaugebiete(abfragevariante);
    const bauratenFromAllTechnicalBaugebiete = getBauratenFromAllTechnicalBaugebiete(abfragevariante);

    const containsNonTechnicalBaugebiet = !_.isEmpty(nonTechnicalBaugebiete);
    const containsBauratenInTechnicalBaugebiet = !_.isEmpty(bauratenFromAllTechnicalBaugebiete);

    let message: string | null = null;

    const geschossflaecheWohnenAbfragevariante = _.isNil(abfragevariante.gfWohnenGesamt)
      ? 0
      : abfragevariante.gfWohnenGesamt;

    if (containsNonTechnicalBaugebiet) {
      // Die Abfragevariante ist mit einem nicht-technischen Baugebiet versehen.
      const sumVerteilteGeschossflaecheWohnenBaugebiete = _.sum(
        nonTechnicalBaugebiete.map((baugebiet) => (_.isNil(baugebiet.gfWohnenGeplant) ? 0 : baugebiet.gfWohnenGeplant)),
      );

      message =
        sumVerteilteGeschossflaecheWohnenBaugebiete.toFixed(2) == geschossflaecheWohnenAbfragevariante.toFixed(2)
          ? null
          : `Die Anzahl von ${sumVerteilteGeschossflaecheWohnenBaugebiete.toFixed(
              2,
            )} m² über Baugebiete verteilter Geschossfläche Wohnen entspricht nicht ` +
            `der Anzahl von ${geschossflaecheWohnenAbfragevariante.toFixed(2)} m² in der Abfragevariante${
              _.isNil(abfragevariante.name) ? "" : " " + abfragevariante.name
            }.`;
    } else if (containsBauratenInTechnicalBaugebiet) {
      // Die Bauraten sind direkt für einen Abfragevariante erstellt worden. Die Abfragevariante ist mit einem technischen Baugebiet versehen.
      const sumVerteilteGeschossflaecheWohnenBauraten = _.sum(
        bauratenFromAllTechnicalBaugebiete.map((baurate) =>
          _.isNil(baurate.gfWohnenGeplant) ? 0 : baurate.gfWohnenGeplant,
        ),
      );

      message =
        sumVerteilteGeschossflaecheWohnenBauraten.toFixed(2) == geschossflaecheWohnenAbfragevariante.toFixed(2)
          ? null
          : `Die Anzahl von ${sumVerteilteGeschossflaecheWohnenBauraten.toFixed(
              2,
            )} m² über Bauraten verteilter Geschossfläche Wohnen entspricht nicht ` +
            `der Anzahl von ${geschossflaecheWohnenAbfragevariante.toFixed(2)} m² in der Abfragevariante${
              _.isNil(abfragevariante.name) ? "" : " " + abfragevariante.name
            }.`;
    }

    return message;
  }

  public findFaultInVerteilungGeschossflaecheWohnenBaugebiet(baugebiet: BaugebietDto): string | null {
    let validationMessage: string | null = null;
    if (!baugebiet.technical && !_.isEmpty(baugebiet.bauraten)) {
      const geschossflaecheWohnenBaugebiet = _.isNil(baugebiet.gfWohnenGeplant) ? 0 : baugebiet.gfWohnenGeplant;

      const sumVerteilteGeschossflaecheWohnenBauraten = _.sum(
        _.toArray(baugebiet.bauraten).map((baurate) =>
          _.isNil(baurate.gfWohnenGeplant) ? 0 : baurate.gfWohnenGeplant,
        ),
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

  public findFaultInVerteilungWohneinheitenBaugebiet(baugebiet: BaugebietDto): string | null {
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
}

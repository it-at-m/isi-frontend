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
  BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum,
  GrundschuleDto,
  GsNachmittagBetreuungDto,
  HausFuerKinderDto,
  InfrastruktureinrichtungDto,
  InfrastruktureinrichtungDtoStatusEnum,
  KindergartenDto,
  KinderkrippeDto,
  MittelschuleDto,
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
  countDecimals,
  addiereAnteile,
  getBauratenFromAllTechnicalBaugebiete,
  getNonTechnicalBaugebiete,
} from "@/utils/CalculationUtil";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";
import BedarfsmeldungFachreferateModel from "@/types/model/abfragevariante/BedarfsmeldungFachreferateModel";

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
      return "Bitte geben Sie an ob die Abfrage SoBoN-relevant ist";
    }
    if (abfrage.offizielleMitzeichnung === UncertainBoolean.Unspecified) {
      return "Bitte treffen Sie eine Auswahl bei 'Offizielle Mitzeichnung'";
    }
    if (abfrage.sobonRelevant === UncertainBoolean.True && _.isNil(abfrage.sobonJahr)) {
      return "Die Abfrage ist SoBoN-relevant. Bitte wählen Sie daher das Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN.";
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
      return "Bitte geben Sie an ob die Abfrage SoBoN-relevant ist";
    }
    if (abfrage.sobonRelevant === UncertainBoolean.True && _.isNil(abfrage.sobonJahr)) {
      return "Die Abfrage ist SoBoN-relevant. Bitte wählen Sie daher das Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN.";
    }
    if (abfrage.offizielleMitzeichnung === UncertainBoolean.Unspecified) {
      return "Bitte treffen Sie eine Auswahl bei 'Offizielle Mitzeichnung'";
    }
    return this.findFaultInAbfrage(abfrage);
  }

  private findFaultInAbfrage(
    abfrage: BauleitplanverfahrenModel | BaugenehmigungsverfahrenModel | WeiteresVerfahrenModel,
  ): string | null {
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
      return "Es müssen durch die Abfrageerstellung zwischen einer und fünf Abfragevarianten angegeben werden.";
    }
    if (_.isNil(abfragevariantenSachbearbeitung) || abfragevariantenSachbearbeitung.length > 5) {
      return "Es können durch die Sachbearbeitung maximal fünf Abfragevarianten angegeben werden.";
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
      if (!_.isNil(abfragevariante)) {
        validationMessage = this.findFaultInAbfragevariante(abfragevariante);
        if (!_.isNil(validationMessage)) {
          break;
        }
      }
    }
    return validationMessage;
  }

  public findFaultInAbfragevariante(
    abfragevariante:
      | AbfragevarianteBauleitplanverfahrenModel
      | AbfragevarianteBaugenehmigungsverfahrenModel
      | AbfragevarianteWeiteresVerfahrenModel,
  ): string | null {
    if (_.isNil(abfragevariante.name)) {
      return "Bitte geben Sie einen Namen für die Abfragevariante an.";
    }
    if (_.isNil(abfragevariante.realisierungVon) || _.isNaN(abfragevariante.realisierungVon)) {
      return `Bitte geben Sie das 'Realisierung von' Datum an`;
    }
    if (_.isNil(abfragevariante.gfWohnenGesamt) && _.isNil(abfragevariante.weGesamt)) {
      return `Bitte geben Sie die 'Geschossfläche Wohnen' und/oder 'Anzahl geplante Wohneinheiten' an`;
    }
    const messageFaultVerteilungWohneinheiten = this.findFaultInVerteilungWohneinheitenAbfragevariante(abfragevariante);
    if (!_.isNil(messageFaultVerteilungWohneinheiten)) {
      return messageFaultVerteilungWohneinheiten;
    }
    if (_.isNil(abfragevariante.weGesamt)) {
      const messageFaultVerteilungGeschossflaecheWohnen =
        this.findFaultInVerteilungGeschossflaecheWohnenAbfragevariante(abfragevariante);
      if (!_.isNil(messageFaultVerteilungGeschossflaecheWohnen)) {
        return messageFaultVerteilungGeschossflaecheWohnen;
      }
    }
    const messageFaultBauschnitte = this.findFaultInBauabschnitte(abfragevariante);
    if (!_.isNil(messageFaultBauschnitte)) {
      return messageFaultBauschnitte;
    }
    const messageFaultInBedarfsmeldungFachreferate = this.findFaultInBedarfsmeldungenFachreferate(
      abfragevariante.bedarfsmeldungFachreferate,
    );
    if (!_.isNil(messageFaultInBedarfsmeldungFachreferate)) {
      return messageFaultInBedarfsmeldungFachreferate;
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
    return this.findFaultInBaugebiete(bauabschnitt);
  }

  public findFaultInBaugebiete(bauabschnitt: BauabschnittDto): string | null {
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
    if (!baugebiet.technical) {
      const validationMessage = this.findFaultInVerteilungWohneinheitenBaugebiet(baugebiet);
      if (!_.isNil(validationMessage)) {
        return validationMessage;
      }
      if (_.isNil(baugebiet.weGeplant)) {
        const validationMessage = this.findFaultInVerteilungGeschossflaecheWohnenBaugebiet(baugebiet);
        if (!_.isNil(validationMessage)) {
          return validationMessage;
        }
      }
    }
    return null;
  }

  public findFaultInBedarfsmeldungenFachreferate(
    bedarfsmeldungen: BedarfsmeldungFachreferateModel[] | undefined,
  ): string | null {
    if (!_.isNil(bedarfsmeldungen)) {
      bedarfsmeldungen.forEach((bedarfsmeldung) => {
        const validationMessage: string | null = this.findFaultInBedarfsmeldung(bedarfsmeldung);
        if (!_.isNil(validationMessage)) {
          return validationMessage;
        }
      });
    }
    return null;
  }

  public findFaultInBedarfsmeldung(bedarfsmeldung: BedarfsmeldungFachreferateModel): string | null {
    if (_.isNil(bedarfsmeldung.anzahlEinrichtungen)) {
      return `Bitte geben Sie die Anzahl der Einrichtungen an`;
    }
    if (
      bedarfsmeldung.infrastruktureinrichtungTyp ===
      BedarfsmeldungFachreferateDtoInfrastruktureinrichtungTypEnum.Unspecified
    ) {
      return `Bitte geben Sie den Typ der Infrastruktureinrichtung an`;
    }
    if (
      _.isNil(bedarfsmeldung.anzahlKinderkrippengruppen) &&
      _.isNil(bedarfsmeldung.anzahlKindergartengruppen) &&
      _.isNil(bedarfsmeldung.anzahlHortgruppen) &&
      _.isNil(bedarfsmeldung.anzahlGrundschulzuege)
    ) {
      return `Bitte geben Sie den Bedarf an`;
    }
    return null;
  }

  findFaultInBauraten(bauraten: BaurateModel[]): string | null {
    bauraten.forEach((baurate) => {
      const validationMessage: string | null = this.findFaultInBaurate(new BaurateModel(baurate));
      if (!_.isNil(validationMessage)) {
        return validationMessage;
      }
    });
    return null;
  }

  findFaultInBaurate(baurate: BaurateModel): string | null {
    if (baurate.weGeplant?.toString() === "") {
      baurate.weGeplant = undefined;
    }
    if (baurate.gfWohnenGeplant?.toString() === "") {
      baurate.gfWohnenGeplant = undefined;
    }
    if (_.isNil(baurate.jahr) || _.isNaN(baurate.jahr)) {
      return "Jahr wurde nicht angegeben";
    }
    if (_.isNil(baurate.foerdermix)) {
      return "Fördermix ist nicht gepflegt";
    }
    if (!_.isNil(baurate.weGeplant as number) && _.isNil(baurate.gfWohnenGeplant as number)) {
      return "Geschossfläche Wohnen geplant muss angegeben werden";
    }
    if (_.isNil(baurate.weGeplant as number) && !_.isNil(baurate.gfWohnenGeplant as number)) {
      return "Anzahl Wohnen geplant muss angegeben werden";
    }
    const summe = addiereAnteile(new FoerdermixModel(baurate.foerdermix));
    if (summe < 100) {
      return "Fördermix Gesamtanteil ist unter 100";
    } else if (summe > 100) {
      return "Fördermix Gesamtanteil ist über 100";
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
      return "Bitte treffen Sie eine Auswahl zur Flächennutzung laut Flächennutzungsplan";
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
    if (!_.isNil(abfragevariante.weGesamt)) {
      return null;
    }

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

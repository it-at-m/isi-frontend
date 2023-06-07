import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
import {
  AbfrageDtoStandVorhabenEnum,
  AbfragevarianteDto,
  AbfragevarianteDtoPlanungsrechtEnum,
  AdresseDto,
  BauabschnittDto,
  BaugebietDto,
  BauvorhabenDto,
  BauvorhabenDtoPlanungsrechtEnum,
  BauvorhabenDtoStandVorhabenEnum,
  UncertainBoolean,
} from "@/api/api-client/isi-backend";
import AbfrageModel from "@/types/model/abfrage/AbfrageModel";
import AdresseModel from "@/types/model/common/AdresseModel";
import AbfragevarianteModel from "@/types/model/abfragevariante/AbfragevarianteModel";
import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";
import BaurateModel from "@/types/model/bauraten/BaurateModel";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import HausFuerKinderModel from "@/types/model/infrastruktureinrichtung/HausFuerKinderModel";
import GsNachmittagBetreuungModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import GrundschuleModel from "@/types/model/infrastruktureinrichtung/GrundschuleModel";
import MittelschuleModel from "@/types/model/infrastruktureinrichtung/MittelschuleModel";
import moment from "moment";
import { addiereAnteile } from "@/utils/CalculationUtil";
import FoerdermixModel from "@/types/model/bauraten/FoerdermixModel";

@Component
export default class ValidatorMixin extends Vue {
  /**
   * Prüft die komplette Abfrage vor dem Speichern
   */

  public findFaultInInfrastrukturabfrageForSave(infrastrukturabfrage: InfrastrukturabfrageModel): string | null {
    const validationMessage: string | null = this.findFaultInInfrastrukturabfrage(infrastrukturabfrage);
    return !_.isNil(validationMessage) ? validationMessage : this.findFaultInAbfragevarianten(infrastrukturabfrage);
  }

  /**
   * Prüft die Abfrage vor dem nächsten Schritt
   */

  public findFaultInInfrastrukturabfrage(infrastrukturabfrage: InfrastrukturabfrageModel): string | null {
    const validationMessage: string | null = this.findFaultInAbfrage(infrastrukturabfrage.abfrage);
    if (!_.isNil(validationMessage)) {
      return validationMessage;
    }
    if (infrastrukturabfrage.sobonRelevant === UncertainBoolean.True && _.isNil(infrastrukturabfrage.sobonJahr)) {
      return "Die Abfrage ist SoBoN-relevant. Bitte wählen Sie daher das Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN.";
    }
    return null;
  }

  private findFaultInAbfrage(abfrage: AbfrageModel): string | null {
    if (!this.isValidAllgemeineOrtsangabe(abfrage.allgemeineOrtsangabe) && !this.isValidAdresse(abfrage.adresse)) {
      return "Allgemeine Ortsangabe oder Adresse muss angegeben werden";
    }

    if (abfrage.standVorhaben === AbfrageDtoStandVorhabenEnum.Unspecified) {
      return "Bitte Stand des Vorhabens angeben";
    }

    const date = moment(abfrage.fristStellungnahme, "DD.MM.YYYY", true);
    if (!date.isValid()) {
      return "Termin der Stellungnahme nicht im Format TT.MM.JJJJ";
    }
    return null;
  }

  private isValidAllgemeineOrtsangabe(allgemeineOrtsangabe?: string): boolean {
    return !_.isNil(allgemeineOrtsangabe) && !_.isEmpty(allgemeineOrtsangabe.trim());
  }

  private isValidAdresse(adresse?: AdresseDto): boolean {
    if (!_.isNil(adresse)) {
      const model: AdresseModel = new AdresseModel(adresse);
      return _.isNil(model) ? false : !model.isEmpty;
    }
    return false;
  }

  public findFaultInAbfragevarianten(infrastrukturabfrage: InfrastrukturabfrageModel): string | null {
    if (
      _.isNil(infrastrukturabfrage.abfragevarianten) ||
      infrastrukturabfrage.abfragevarianten.length < 1 ||
      infrastrukturabfrage.abfragevarianten.length > 5
    ) {
      return "Es müssen zwischen einer und fünf Abfragevarianten angegeben werden.";
    }
    let validationMessage = null;
    for (const abfragevariante of infrastrukturabfrage.abfragevarianten) {
      validationMessage = this.findFaultInAbfragevariante(infrastrukturabfrage.sobonRelevant, abfragevariante, true);
      if (!_.isNil(validationMessage)) {
        break;
      }
    }
    let counterRelevantAbfragevarianten = 0;
    for (const abfragevariante of infrastrukturabfrage.abfragevarianten) {
      if (abfragevariante.relevant) {
        counterRelevantAbfragevarianten++;
      }
    }
    if (counterRelevantAbfragevarianten >= 2) {
      return "Es darf nur eine Abfragevariante als Relevant markiert werden";
    }
    return validationMessage;
  }

  public findFaultInAbfragevariante(
    sobonRelevant: UncertainBoolean,
    abfragevariante: AbfragevarianteModel,
    showAbfragevarianteNr: boolean
  ): string | null {
    if (_.isNil(abfragevariante.abfragevariantenName)) {
      return "Bitte geben Sie einen Namen für die Abfragevariante an.";
    }
    if (abfragevariante.realisierungVon > abfragevariante.realisierungBis) {
      return `'Realisierung von ${abfragevariante.realisierungVon}' liegt nach 'Realisierung bis ${abfragevariante.realisierungBis}'`;
    }
    if (_.isNil(abfragevariante.geschossflaecheWohnen) && _.isNil(abfragevariante.gesamtanzahlWe)) {
      return `Bitte geben Sie die 'Geschossfläche Wohnen' und/oder 'Anzahl geplante Wohneinheiten' an`;
    }
    if (
      sobonRelevant === UncertainBoolean.True &&
      (abfragevariante.planungsrecht === AbfragevarianteDtoPlanungsrechtEnum.BplanParag12 ||
        abfragevariante.planungsrecht === AbfragevarianteDtoPlanungsrechtEnum.BplanParag11) &&
      _.isNil(abfragevariante.geschossflaecheWohnenSoBoNursaechlich)
    ) {
      const abfragevarianteNr: string =
        showAbfragevarianteNr && !_.isNaN(abfragevariante.abfragevariantenNr)
          ? `für Abfragevariante Nr. ${abfragevariante.abfragevariantenNr} `
          : "";
      return `Bitte geben Sie die 'Geschossfläche SoBoN-ursächliche' ${abfragevarianteNr}an`;
    }
    const messageFaultVerteilungWohneinheiten = this.findFaultInVerteilungWohneinheitenAbfragevariante(abfragevariante);
    if (!_.isNil(messageFaultVerteilungWohneinheiten)) {
      return messageFaultVerteilungWohneinheiten;
    }
    if (_.isNil(abfragevariante.gesamtanzahlWe)) {
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
    return null;
  }

  public findFaultInBauabschnitte(abfragevariante: AbfragevarianteDto): string | null {
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
      if (_.isNil(baugebiet.gesamtanzahlWe)) {
        const validationMessage = this.findFaultInVerteilungGeschossflaecheWohnenBaugebiet(baugebiet);
        if (!_.isNil(validationMessage)) {
          return validationMessage;
        }
      }
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
    if (baurate.anzahlWeGeplant?.toString() === "") {
      baurate.anzahlWeGeplant = undefined;
    }
    if (baurate.geschossflaecheWohnenGeplant?.toString() === "") {
      baurate.geschossflaecheWohnenGeplant = undefined;
    }
    if (_.isNil(baurate.jahr) || _.isNaN(baurate.jahr)) {
      return "Jahr wurde nicht angegeben";
    }
    if (_.isNil(baurate.foerdermix)) {
      return "Fördermix ist nicht gepflegt";
    }
    if (!_.isNil(baurate.anzahlWeGeplant as number) && _.isNil(baurate.geschossflaecheWohnenGeplant as number)) {
      return "Geschossfläche Wohnen geplant muss angegeben werden";
    }
    if (_.isNil(baurate.anzahlWeGeplant as number) && !_.isNil(baurate.geschossflaecheWohnenGeplant as number)) {
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
      !this.isValidAllgemeineOrtsangabe(bauvorhaben.allgemeineOrtsangabe) &&
      !this.isValidAdresse(bauvorhaben.adresse)
    ) {
      return "Allgemeine Ortsangabe oder Adresse muss angegeben werden";
    }
    if (bauvorhaben.artFnp.length === 0) {
      return "Bitte treffen Sie eine Auswahl zur Flächennutzung laut Flächennutzungsplan";
    }

    if (bauvorhaben.standVorhaben === BauvorhabenDtoStandVorhabenEnum.Unspecified) {
      return "Bitte Stand des Vorhaben angeben";
    }

    if (bauvorhaben.planungsrecht === BauvorhabenDtoPlanungsrechtEnum.Unspecified) {
      return "Bitte Planungsrecht angeben";
    }

    return null;
  }

  public findFaultInKinderkrippeForSave(kinderkrippe: KinderkrippeModel): string | null {
    return this.findFaultInInfrastruktureinrichtung(kinderkrippe.infrastruktureinrichtung);
  }

  public findFaultInKindergartenForSave(kindergarten: KindergartenModel): string | null {
    return this.findFaultInInfrastruktureinrichtung(kindergarten.infrastruktureinrichtung);
  }

  public findFaultInHausFuerKinderForSave(hausFuerKinder: HausFuerKinderModel): string | null {
    return this.findFaultInInfrastruktureinrichtung(hausFuerKinder.infrastruktureinrichtung);
  }

  public findFaultInGsNachmittagBetreuungForSave(gsNachmittagBetreuung: GsNachmittagBetreuungModel): string | null {
    return this.findFaultInInfrastruktureinrichtung(gsNachmittagBetreuung.infrastruktureinrichtung);
  }

  public findFaultInGrundschuleForSave(grundschule: GrundschuleModel): string | null {
    return this.findFaultInInfrastruktureinrichtung(grundschule.infrastruktureinrichtung);
  }

  public findFaultInMittelschuleForSave(mittelschule: MittelschuleModel): string | null {
    return this.findFaultInInfrastruktureinrichtung(mittelschule.infrastruktureinrichtung);
  }

  private findFaultInInfrastruktureinrichtung(infrastruktureinrichtung: InfrastruktureinrichtungModel): string | null {
    if (
      !this.isValidAllgemeineOrtsangabe(infrastruktureinrichtung.allgemeineOrtsangabe) &&
      !this.isValidAdresse(infrastruktureinrichtung.adresse)
    ) {
      return "Allgemeine Ortsangabe oder Adresse muss angegeben werden";
    }

    return null;
  }

  public findFaultInVerteilungWohneinheitenAbfragevariante(abfragevariante: AbfragevarianteDto): string | null {
    const containsNonTechnicalBaugebiet = !_.isEmpty(
      _.toArray(abfragevariante.bauabschnitte)
        .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
        .filter((baugebiet) => !baugebiet.technical)
    );

    const containsBauratenInTechnicalBaugebiet = !_.isEmpty(
      _.toArray(abfragevariante.bauabschnitte)
        .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
        .filter((baugebiet) => baugebiet.technical)
        .flatMap((baugebiet) => _.toArray(baugebiet.bauraten))
    );

    const checkVerteilung =
      !_.isEmpty(abfragevariante.bauabschnitte) &&
      (containsNonTechnicalBaugebiet || containsBauratenInTechnicalBaugebiet);

    let message: string | null = null;

    if (checkVerteilung) {
      const wohneinheitenAbfragevariante = _.isNil(abfragevariante.gesamtanzahlWe) ? 0 : abfragevariante.gesamtanzahlWe;

      // Die Abfragevariante ist mit einem nicht-technischen Baugebiet versehen.
      const sumVerteilteWohneinheitenBaugebiete = _.sum(
        _.toArray(abfragevariante.bauabschnitte)
          .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
          .filter((baugebiet) => !baugebiet.technical)
          .map((baugebiet) => (_.isNil(baugebiet.gesamtanzahlWe) ? 0 : baugebiet.gesamtanzahlWe))
      );

      // Die Bauraten sind direkt für eine Abfragevariante erstellt worden. Die Abfragevariante ist somit mit einem technischen Baugebiet versehen.
      const sumVerteilteWohneinheitenBauraten = _.sum(
        _.toArray(abfragevariante.bauabschnitte)
          .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
          .filter((baugebiet) => baugebiet.technical)
          .flatMap((baugebiet) => _.toArray(baugebiet.bauraten))
          .map((baurate) => (_.isNil(baurate.anzahlWeGeplant) ? 0 : baurate.anzahlWeGeplant))
      );

      const sumVerteilteWohneinheiten = _.max([sumVerteilteWohneinheitenBaugebiete, sumVerteilteWohneinheitenBauraten]);

      message =
        sumVerteilteWohneinheiten == wohneinheitenAbfragevariante
          ? null
          : `Die Anzahl von ${sumVerteilteWohneinheiten} verteilten Wohneinheiten entspricht nicht ` +
            `der Anzahl von ${wohneinheitenAbfragevariante} in der Abfragevariante.`;
    }

    return message;
  }

  public findFaultInVerteilungGeschossflaecheWohnenAbfragevariante(abfragevariante: AbfragevarianteDto): string | null {
    const containsNonTechnicalBaugebiet = !_.isEmpty(
      _.toArray(abfragevariante.bauabschnitte)
        .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
        .filter((baugebiet) => !baugebiet.technical)
    );

    const containsBauratenInTechnicalBaugebiet = !_.isEmpty(
      _.toArray(abfragevariante.bauabschnitte)
        .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
        .filter((baugebiet) => baugebiet.technical)
        .flatMap((baugebiet) => _.toArray(baugebiet.bauraten))
    );

    const checkVerteilung =
      !_.isEmpty(abfragevariante.bauabschnitte) &&
      (containsNonTechnicalBaugebiet || containsBauratenInTechnicalBaugebiet);

    let message: string | null = null;

    if (checkVerteilung) {
      const geschossflaecheWohnenAbfragevariante = _.isNil(abfragevariante.geschossflaecheWohnen)
        ? 0
        : abfragevariante.geschossflaecheWohnen;

      // Die Abfragevariante ist mit einem nicht-technischen Baugebiet versehen.
      const sumVerteilteGeschossflaecheWohnenBaugebiete = _.sum(
        _.toArray(abfragevariante.bauabschnitte)
          .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
          .filter((baugebiet) => !baugebiet.technical)
          .map((baugebiet) => (_.isNil(baugebiet.geschossflaecheWohnen) ? 0 : baugebiet.geschossflaecheWohnen))
      );

      // Die Bauraten sind direkt für einen Abfragevariante erstellt worden. Die Abfragevariante ist mit einem technischen Baugebiet versehen.
      const sumVerteilteGeschossflaecheWohnenBauraten = _.sum(
        _.toArray(abfragevariante.bauabschnitte)
          .flatMap((bauabschnitt) => _.toArray(bauabschnitt.baugebiete))
          .filter((baugebiet) => baugebiet.technical)
          .flatMap((baugebiet) => _.toArray(baugebiet.bauraten))
          .map((baurate) => (_.isNil(baurate.geschossflaecheWohnenGeplant) ? 0 : baurate.geschossflaecheWohnenGeplant))
      );

      const sumVerteilteGeschossflaecheWohnen = _.max([
        sumVerteilteGeschossflaecheWohnenBaugebiete,
        sumVerteilteGeschossflaecheWohnenBauraten,
      ]);

      message =
        sumVerteilteGeschossflaecheWohnen == geschossflaecheWohnenAbfragevariante
          ? null
          : `Die Anzahl von ${sumVerteilteGeschossflaecheWohnen} m² verteilter Geschossflaeche Wohnen entspricht nicht ` +
            `der Anzahl von ${geschossflaecheWohnenAbfragevariante} m² in der Abfragevariante.`;
    }

    return message;
  }

  public findFaultInVerteilungGeschossflaecheWohnenBaugebiet(baugebiet: BaugebietDto) {
    let validationMessage: string | null = null;
    if (!baugebiet.technical && !_.isEmpty(baugebiet.bauraten)) {
      const geschossflaecheWohnenBaugebiet = _.isNil(baugebiet.geschossflaecheWohnen)
        ? 0
        : baugebiet.geschossflaecheWohnen;

      const sumVerteilteGeschossflaecheWohnenBauraten = _.sum(
        _.toArray(baugebiet.bauraten).map((baurate) =>
          _.isNil(baurate.geschossflaecheWohnenGeplant) ? 0 : baurate.geschossflaecheWohnenGeplant
        )
      );

      validationMessage =
        geschossflaecheWohnenBaugebiet == sumVerteilteGeschossflaecheWohnenBauraten
          ? null
          : `Die Anzahl von ${sumVerteilteGeschossflaecheWohnenBauraten} m² verteilter Geschossflaeche Wohnen entspricht nicht ` +
            `der Anzahl von ${geschossflaecheWohnenBaugebiet} m² im Baugebiet.`;
    }
    return validationMessage;
  }

  public findFaultInVerteilungWohneinheitenBaugebiet(baugebiet: BaugebietDto) {
    let validationMessage: string | null = null;
    if (!baugebiet.technical && !_.isEmpty(baugebiet.bauraten)) {
      const wohneinheitenBaugebiet = _.isNil(baugebiet.gesamtanzahlWe) ? 0 : baugebiet.gesamtanzahlWe;

      const sumVerteilteWohneinheitenBauraten = _.sum(
        _.toArray(baugebiet.bauraten).map((baurate) => (_.isNil(baurate.anzahlWeGeplant) ? 0 : baurate.anzahlWeGeplant))
      );

      validationMessage =
        wohneinheitenBaugebiet == sumVerteilteWohneinheitenBauraten
          ? null
          : `Die Anzahl von ${sumVerteilteWohneinheitenBauraten} verteilten Wohneinheiten entspricht nicht ` +
            `der Anzahl von ${wohneinheitenBaugebiet} im Baugebiet.`;
    }
    return validationMessage;
  }
}

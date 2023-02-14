import { Component, Vue } from "vue-property-decorator";
import _ from "lodash";
import {
  AdresseDto,
  AbfrageDtoStandVorhabenEnum,
  BauvorhabenDto,
  UncertainBoolean,
  BauvorhabenDtoPlanungsrechtEnum,
  BauvorhabenDtoStandVorhabenEnum,
  BauvorhabenDtoZustaendigkeitEnum,
  AbfragevarianteDtoPlanungsrechtEnum,
} from "@/api/api-client";
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
    return !_.isNil(validationMessage)
      ? validationMessage
      : this.findFaultInAbfragevarianten(infrastrukturabfrage);
  }

  /**
   * Prüft die Abfrage vor dem nächsten Schritt
   */

  public findFaultInInfrastrukturabfrage(infrastrukturabfrage: InfrastrukturabfrageModel): string | null {
    const validationMessage: string | null = this.findFaultInAbfrage(infrastrukturabfrage.abfrage);
    if (!_.isNil(validationMessage)) {
      return validationMessage;
    }
    if (infrastrukturabfrage.sobonRelevant === UncertainBoolean.True &&
      _.isNil(infrastrukturabfrage.sobonJahr)) {
      return "Die Abfrage ist SoBoN-relevant. Bitte wählen Sie daher das Jahr der anzuwendenden Verfahrensgrundsätze der SoBoN.";
    }
    return null;
  }

  private findFaultInAbfrage(abfrage: AbfrageModel): string | null {
    if (!this.isValidAllgemeineOrtsangabe(abfrage.allgemeineOrtsangabe) &&
      !this.isValidAdresse(abfrage.adresse)) {
      return "Allgemeine Ortsangabe oder Adresse muss angegeben werden";
    }

    // entweder allgemeineOrtsangabe oder Adresse erlaubt
    if (this.isValidAllgemeineOrtsangabe(abfrage.allgemeineOrtsangabe) &&
      this.isValidAdresse(abfrage.adresse)) {
      return "Angabe von sowohl allgemeiner Ortsangabe als auch Adresse nicht erlaubt";
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

  private findFaultInAbfragevarianten(infrastrukturabfrage: InfrastrukturabfrageModel): string | null {
    if (_.isNil(infrastrukturabfrage.abfragevarianten) || infrastrukturabfrage.abfragevarianten.length < 1 || infrastrukturabfrage.abfragevarianten.length > 5) {
      return "Es müssen zwischen einer und fünf Abfragevarianten angegeben werden.";
    }
    let validationMessage = null;
    for (const abfragevariante of infrastrukturabfrage.abfragevarianten) {
      validationMessage = this.findFaultInAbfragevariante(infrastrukturabfrage.sobonRelevant, abfragevariante, true);
      if (!_.isNil(validationMessage)) {
        break;
      }
    }
    return validationMessage;
  }

  public findFaultInAbfragevariante(sobonRelevant: UncertainBoolean, abfragevariante: AbfragevarianteModel, showAbfragevarianteNr: boolean): string | null {
    if (abfragevariante.realisierungVon > abfragevariante.realisierungBis) {
      return `'Realisierung von ${abfragevariante.realisierungVon}' liegt nach 'Realisierung bis ${abfragevariante.realisierungBis}'`;
    }
    if (_.isNil(abfragevariante.geschossflaecheWohnen) && _.isNil(abfragevariante.gesamtanzahlWe)) {
      return `Bitte geben Sie die 'Geschossfläche Wohnen' und/oder 'Anzahl geplante Wohneinheiten' an`;
    }
    if (sobonRelevant === UncertainBoolean.True
       && (abfragevariante.planungsrecht === AbfragevarianteDtoPlanungsrechtEnum.BplanParag12
         || abfragevariante.planungsrecht === AbfragevarianteDtoPlanungsrechtEnum.BplanParag11)
          && _.isNil(abfragevariante.geschossflaecheWohnenSoBoNursaechlich)) {
           const abfragevarianteNr: string = showAbfragevarianteNr && !_.isNaN(abfragevariante.abfragevariantenNr)
            ? `für Abfragevariante Nr. ${abfragevariante.abfragevariantenNr} `
            : "";
           return `Bitte geben Sie die 'Geschossfläche SoBoN-ursächliche' ${abfragevarianteNr}an`;
    }
    return null;
  }

  findFaultInBauraten(bauraten: BaurateModel[]): string | null {
    bauraten.forEach(baurate => {
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
    if (
      this.isValidAllgemeineOrtsangabe(bauvorhaben.allgemeineOrtsangabe) &&
      this.isValidAdresse(bauvorhaben.adresse)
    ) {
      return "Angabe von sowohl allgemeiner Ortsangabe als auch Adresse nicht erlaubt";
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

    if (bauvorhaben.zustaendigkeit === BauvorhabenDtoZustaendigkeitEnum.Unspecified) {
      return "Bitte Zuständigkeit angeben";
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
    if (!this.isValidAllgemeineOrtsangabe(infrastruktureinrichtung.allgemeineOrtsangabe) &&
      !this.isValidAdresse(infrastruktureinrichtung.adresse)) {
      return "Allgemeine Ortsangabe oder Adresse muss angegeben werden";
    }

    // entweder allgemeineOrtsangabe oder Adresse erlaubt
    if (this.isValidAllgemeineOrtsangabe(infrastruktureinrichtung.allgemeineOrtsangabe) &&
      this.isValidAdresse(infrastruktureinrichtung.adresse)) {
      return "Angabe von sowohl allgemeiner Ortsangabe als auch Adresse nicht erlaubt";
    }
    return null;
  }

}

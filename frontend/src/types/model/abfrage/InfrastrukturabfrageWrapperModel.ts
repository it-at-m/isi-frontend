import InfrastrukturabfrageModel from "@/types/model/abfrage/InfrastrukturabfrageModel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InfrastrukturabfrageWrapperModel {}

class InfrastrukturabfrageWrapperModel {
  infrastrukturabfrage: InfrastrukturabfrageModel;

  initial: boolean;

  constructor(infrastrukturabfrage: InfrastrukturabfrageModel, initial: boolean) {
    this.infrastrukturabfrage = infrastrukturabfrage;
    this.initial = initial;
  }
}

export { InfrastrukturabfrageWrapperModel as default };

import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";
import KinderkrippeModel from "@/types/model/infrastruktureinrichtung/KinderkrippeModel";
import KindergartenModel from "@/types/model/infrastruktureinrichtung/KindergartenModel";
import NachbarschaftstreffModel from "@/types/model/infrastruktureinrichtung/GsNachmittagBetreuungModel";
import InfrastruktureinrichtungModel from "@/types/model/infrastruktureinrichtung/InfrastruktureinrichtungModel";

export type AnyInfrastruktureinrichtungModel =
  InfrastruktureinrichtungModel | KinderkrippeModel | KindergartenModel | NachbarschaftstreffModel;

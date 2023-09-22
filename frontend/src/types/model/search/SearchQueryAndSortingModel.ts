import { SearchQueryAndSortingDto } from "@/api/api-client/isi-backend";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SearchQueryAndSortingModel extends SearchQueryAndSortingDto {}
class SearchQueryAndSortingModel {
  constructor(searchQueryAndSortingDto: SearchQueryAndSortingDto) {
    Object.assign(this, searchQueryAndSortingDto, {});
  }

  public allObjectTypesSelected(): boolean {
    return (
      this.selectInfrastrukturabfrage &&
      this.selectBauvorhaben &&
      this.selectGrundschule &&
      this.selectGsNachmittagBetreuung &&
      this.selectHausFuerKinder &&
      this.selectKinderkrippe &&
      this.selectKindergarten &&
      this.selectMittelschule
    );
  }

  public allObjectTypesDeselected(): boolean {
    return (
      !this.selectInfrastrukturabfrage &&
      !this.selectBauvorhaben &&
      !this.selectGrundschule &&
      !this.selectGsNachmittagBetreuung &&
      !this.selectHausFuerKinder &&
      !this.selectKinderkrippe &&
      !this.selectKindergarten &&
      !this.selectMittelschule
    );
  }
}
export { SearchQueryAndSortingModel as default };

import { beforeEach, describe, expect, test } from "vitest";
import type { MetabaseReportingDto } from "@/api/api-client/isi-backend";
import { createPinia, setActivePinia } from "pinia";
import { useMetabaseReportingStore } from "@/stores/MetabaseReportingStore";

describe("MetabaseReportingStoreTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Initialize Metabase Reporting Information", () => {
    const store = useMetabaseReportingStore();
    expect(store.metabaseReportingInformation).is.undefined;
  });

  test("Initialize Metabase Reporting Information", () => {
    const store = useMetabaseReportingStore();
    const metabaseReporting: MetabaseReportingDto = {
      url: "https://isi-metabase-test.muenchen.de",
      reportBedarfe: "dashboard/45-dashboard-bedarfe",
      reportErgebnissePlanungsursaechlich: "dashboard/36-ergebnisse-der-planungsursachlichen-bedarfsberechnung",
      reportErgebnisseSobonUrsaechlich: "dashboard/44-ergebnisse-der-sobon-bedarfsberechnung",
      reportSpitzenbedarfePlanungsursaechlich: "dashboard/27-dashboard-spitzenbedarfe-planungsursachlich",
      reportSpitzenbedarfeSobonUrsaechlich: "dashboard/30-dashboard-spitzenbedarfe-sobon-ursachlich",
      reportWohneinheiten: "dashboard/33-dashboard-wohneinheiten",
    };
    store.setMetabaseReportingInformation(metabaseReporting);
    expect(store.metabaseReportingInformation).toEqual(metabaseReporting);
  });
});

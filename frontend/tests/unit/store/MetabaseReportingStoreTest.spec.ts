import { describe, expect, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useMetabaseReportingStore } from "@/stores/MetabaseReportingStore";
import { MetabaseReportingDto } from "@/api/api-client/isi-backend";

describe("MetabaseReportingStoreTest.spec.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Initialize Metabase Reporting Information", () => {
    const store = useMetabaseReportingStore();
    expect(store.metabaseReportingInformation).is.undefined;
  });

  it("Initialize Metabase Reporting Information", () => {
    const store = useMetabaseReportingStore();
    const metabaseReporting: MetabaseReportingDto = {
      url: "https://isi-metabase-test.muenchen.de",
      reportBedarfe: "dashboard/45-dashboard-bedarfe",
      reportSpitzenbedarfePlanungsursaechlich: "dashboard/27-dashboard-spitzenbedarfe-planungsursachlich",
      reportSpitzenbedarfeSobonUrsaechlich: "dashboard/30-dashboard-spitzenbedarfe-sobon-ursachlich",
      reportWohneinheiten: "dashboard/33-dashboard-wohneinheiten",
    };
    store.setMetabaseReportingInformation(metabaseReporting);
    expect(store.metabaseReportingInformation).toEqual(metabaseReporting);
  });
});

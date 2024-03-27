import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useInformationStore } from "../../../src/stores/InformationStore";
import { InformationResponseDto } from "@/api/api-client/isi-backend";

// Mock für InformationResponseDto

describe("Information Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("addInformation adds information to the start of the list", () => {
    const informationStore = useInformationStore();
    const mockInfo: InformationResponseDto = { type: "INFORMATION_SUCCESS", httpStatus: 200, traceId: "1234" };

    informationStore.addInformation(mockInfo);

    expect(informationStore.informationList.length).toBe(1);
    expect(informationStore.informationList[0]).toEqual(mockInfo);
  });

  it("overwriteInformationList correctly overwrites the entire list", () => {
    const informationStore = useInformationStore();
    const initialList: InformationResponseDto[] = [
      { type: "INFORMATION_SUCCESS", httpStatus: 200, traceId: "1234" },
      { type: "ERROR", httpStatus: 500, traceId: "1098" },
    ];

    informationStore.overwriteInformationList(initialList);

    const newList: InformationResponseDto[] = [{ type: "WARNING", httpStatus: 401, traceId: "4567" }];

    informationStore.overwriteInformationList(newList);

    expect(informationStore.informationList.length).toBe(1);
    expect(informationStore.informationList).toEqual(newList);
  });

  it("overwriteInformationList sets the list to empty if payload is null", () => {
    const informationStore = useInformationStore();
    const initialList: InformationResponseDto[] = [{ type: "INFORMATION_SUCCESS", httpStatus: 200, traceId: "1234" }];

    informationStore.overwriteInformationList(initialList);

    informationStore.overwriteInformationList([]);

    expect(informationStore.informationList.length).toBe(0);
  });
});

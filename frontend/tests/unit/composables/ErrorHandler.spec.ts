import { describe, expect, test } from "vitest";
import { InformationResponseDtoTypeEnum } from "@/api/api-client/isi-backend";
import { TYPE } from "vue-toastification";
import { useErrorHandler } from "@/composables/requests/ErrorHandler";
import { createPinia, setActivePinia } from "pinia";

describe("ErrorHandler Test", () => {
  setActivePinia(createPinia());
  const { getToastType } = useErrorHandler();

  test("getToastType Test", () => {
    let level = getToastType(InformationResponseDtoTypeEnum.Error);
    expect(level).toBe(TYPE.ERROR);

    level = getToastType(InformationResponseDtoTypeEnum.Warning);
    expect(level).toBe(TYPE.WARNING);

    level = getToastType(InformationResponseDtoTypeEnum.InformationSuccess);
    expect(level).toBe(TYPE.SUCCESS);

    level = getToastType(InformationResponseDtoTypeEnum.InformationNeutral);
    expect(level).toBe(TYPE.INFO);

    level = getToastType(undefined);
    expect(level).toBe(TYPE.INFO);
  });
});

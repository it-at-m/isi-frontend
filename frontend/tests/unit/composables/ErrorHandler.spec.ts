import { Levels } from "@/api/error";
import { InformationResponseDtoTypeEnum } from "@/api/api-client/isi-backend";
import { useErrorHandler } from "@/composables/requests/ErrorHandler";

describe(" Test", () => {
  const { getToastLevel } = useErrorHandler();

  it("getToastLevel Test", () => {
    let level: Levels = getToastLevel(InformationResponseDtoTypeEnum.Error);
    expect(level).toBe(Levels.ERROR);

    level = getToastLevel(InformationResponseDtoTypeEnum.Warning);
    expect(level).toBe(Levels.WARNING);

    level = getToastLevel(InformationResponseDtoTypeEnum.InformationSuccess);
    expect(level).toBe(Levels.SUCCESS);

    level = getToastLevel(InformationResponseDtoTypeEnum.InformationNeutral);
    expect(level).toBe(Levels.INFO);

    level = getToastLevel(undefined);
    expect(level).toBe(Levels.INFO);
  });
});

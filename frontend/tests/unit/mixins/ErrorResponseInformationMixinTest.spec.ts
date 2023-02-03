import ErrorHandler from "@/mixins/requests/ErrorHandler";
import {Levels} from "@/api/error";
import {InformationResponseDtoTypeEnum} from "@/api/api-client/isi-backend";

describe("ErrorResponseInformationMixin Test", () => {
  const errorResponseInformationMixin = new ErrorHandler();
  
  it("getToastLevel Test", () => {
    
    let level: Levels = errorResponseInformationMixin.getToastLevel(InformationResponseDtoTypeEnum.Error);
    expect(level).toBe(Levels.ERROR);
  
    level = errorResponseInformationMixin.getToastLevel(InformationResponseDtoTypeEnum.Warning);
    expect(level).toBe(Levels.WARNING);
  
    level = errorResponseInformationMixin.getToastLevel(InformationResponseDtoTypeEnum.InformationSuccess);
    expect(level).toBe(Levels.SUCCESS);
  
    level = errorResponseInformationMixin.getToastLevel(InformationResponseDtoTypeEnum.InformationNeutral);
    expect(level).toBe(Levels.INFO);
    
    level = errorResponseInformationMixin.getToastLevel(undefined);
    expect(level).toBe(Levels.INFO);
  });
  
});

import { type InformationResponseDto, InformationResponseDtoTypeEnum } from "@/api/api-client/isi-backend";
import { useInformationStore } from "@/stores/InformationStore";

// eslint-disable-next-line
export function useInformationList() {
  const { addInformation } = useInformationStore();

  function showInformationResponseDtoInInformationList(informationResponseDto: InformationResponseDto): void {
    addInformation(informationResponseDto);
  }

  function showSuccessInInformationList(message: string): void {
    showInformationResponseDtoInInformationList({
      messages: [message],
      type: InformationResponseDtoTypeEnum.InformationSuccess,
    });
  }

  function showWarningInInformationList(message: string): void {
    showInformationResponseDtoInInformationList({
      messages: [message],
      type: InformationResponseDtoTypeEnum.Warning,
    });
  }

  function showErrorInInformationList(message: string): void {
    showInformationResponseDtoInInformationList({
      messages: [message],
      type: InformationResponseDtoTypeEnum.Error,
    });
  }

  return {
    showInformationResponseDtoInInformationList,
    showSuccessInInformationList,
    showWarningInInformationList,
    showErrorInInformationList,
  };
}

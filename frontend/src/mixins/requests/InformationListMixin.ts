import { Component, Vue } from "vue-property-decorator";
import { InformationResponseDto, InformationResponseDtoTypeEnum } from "@/api/api-client/isi-backend";
import { useInformationStore } from "@/stores/InformationStore";
@Component
export default class InformationListMixin extends Vue {
  private informationStore = useInformationStore();

  public showInformationResponseDtoInInformationList(informationResponseDto: InformationResponseDto): void {
    this.informationStore.addInformation(informationResponseDto);
  }

  public showSuccessInInformationList(message: string): void {
    const informationResponseDto: InformationResponseDto = {
      messages: [message],
      originalException: undefined,
      spanId: undefined,
      traceId: undefined,
      status: undefined,
      timestamp: undefined,
      type: InformationResponseDtoTypeEnum.InformationSuccess,
    } as InformationResponseDto;
    this.showInformationResponseDtoInInformationList(informationResponseDto);
  }

  public showWarningInInformationList(message: string): void {
    const informationResponseDto: InformationResponseDto = {
      messages: [message],
      originalException: undefined,
      spanId: undefined,
      traceId: undefined,
      status: undefined,
      timestamp: undefined,
      type: InformationResponseDtoTypeEnum.Warning,
    } as InformationResponseDto;
    this.showInformationResponseDtoInInformationList(informationResponseDto);
  }

  public showErrorInInformationList(message: string): void {
    const informationResponseDto: InformationResponseDto = {
      messages: [message],
      originalException: undefined,
      spanId: undefined,
      traceId: undefined,
      status: undefined,
      timestamp: undefined,
      type: InformationResponseDtoTypeEnum.Error,
    } as InformationResponseDto;
    this.showInformationResponseDtoInInformationList(informationResponseDto);
  }
}

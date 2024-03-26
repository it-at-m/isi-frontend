<template>
  <v-list
    class="overflow-y-auto ma-0 pa-0"
    max-height="100%"
    width="100%"
  >
    <template v-for="(item, index) in informationFromInformationList">
      <v-list-item
        id="information_list"
        :key="index"
        class="ma-0 pa-0"
      >
        <v-card
          width="100%"
          class="pa-1 my-1 mx-0"
          :color="getColorAccordingInformationType(item.type)"
          outlined
        >
          <v-row class="pa-0 ma-0 justify-end align-start">
            <v-btn
              :id="'information_listitem_' + index + '_loeschen_button'"
              icon
              x-small
              @click="deleteInformationListEntryByIndex(index)"
            >
              <v-icon dense> mdi-window-close </v-icon>
            </v-btn>
          </v-row>

          <v-list-item-content class="ma-0 py-1 px-0">
            <v-row
              v-if="isTraceIdAndSpanIdAvailable(item)"
              class="pa-0 ma-0"
              justify="center"
            >
              <v-col
                class="pa-0 ma-0"
                cols="12"
                md="6"
              >
                <v-list-item-action-text
                  :id="'information_listitem_' + index + '_traceId'"
                  class="text-wrap align-stretch"
                  v-text="textTraceId(item.traceId)"
                />
              </v-col>
              <v-col
                class="pa-0 ma-0"
                cols="12"
                md="6"
              >
                <v-list-item-action-text
                  :id="'information_listitem_' + index + '_spanId'"
                  class="text-wrap align-stretch"
                  v-text="textSpanId(item.spanId)"
                />
              </v-col>
            </v-row>

            <v-row
              v-if="isTimestampOrOriginalExceptionAvailable(item)"
              class="pa-0 ma-0"
              justify="center"
            >
              <v-col
                class="pa-0 ma-0"
                cols="12"
                md="6"
              >
                <v-list-item-action-text
                  :id="'information_listitem_' + index + '_timestamp'"
                  class="text-wrap align-stretch"
                  v-text="textDatumUhrzeit(item.timestamp)"
                />
              </v-col>
              <v-col
                class="pa-0 ma-0"
                cols="12"
                md="6"
              >
                <v-list-item-action-text
                  :id="'information_listitem_' + index + 'originalException'"
                  class="text-wrap align-stretch"
                  v-text="item.originalException"
                />
              </v-col>
            </v-row>

            <template v-for="(message, messageIndex) in item.messages">
              <v-list-item
                :key="messageIndex"
                class="pa-0 ma-0"
              >
                <v-row
                  class="pa-0 ma-0"
                  justify="center"
                >
                  <v-col
                    class="pa-0 ma-0"
                    cols="12"
                    md="12"
                  >
                    <v-list-item-title
                      :id="'information_listitem_' + index + '_error_message_' + messageIndex"
                      class="text-wrap align-stretch pa-0 ma-0"
                      v-text="message"
                    />
                  </v-col>
                </v-row>
              </v-list-item>
            </template>
          </v-list-item-content>
        </v-card>
      </v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { InformationResponseDto, InformationResponseDtoTypeEnum } from "@/api/api-client/isi-backend";
import _ from "lodash";
import moment from "moment";
import { useInformationStore } from "@/stores/InformationStore";
@Component
export default class InformationList extends Vue {
  private static readonly NOT_APPLICABLE: string = "n/a";

  private static readonly FORMAT_TIMESTAMP: string = "DD.MM.YYYY HH:mm:ss";

  private informationList: Array<InformationResponseDto> = [];

  private informationStore = useInformationStore();

  mounted(): void {
    this.informationStore.overwriteInformationList([]);
  }

  get informationFromInformationList(): Array<InformationResponseDto> {
    return this.informationList;
  }

  @Watch("this.informationStore.informationList", { immediate: true, deep: true })
  public displayInformationsFromInformationList(): void {
    this.informationList = _.cloneDeep(this.informationStore.informationList);
  }

  public deleteInformationListEntryByIndex(index: number): void {
    this.informationFromInformationList.splice(index, 1);
    this.informationStore.overwriteInformationList(this.informationFromInformationList);
  }

  public textTraceId(traceId: string): string {
    return "TraceId: " + traceId;
  }

  public textSpanId(spanId: string): string {
    return "SpanId: " + spanId;
  }

  public textDatumUhrzeit(datum: Date): string {
    let textTimestamp: string;
    if (!_.isNil(datum)) {
      textTimestamp = moment(datum).format(InformationList.FORMAT_TIMESTAMP);
    } else {
      textTimestamp = InformationList.NOT_APPLICABLE;
    }
    return textTimestamp;
  }

  public getColorAccordingInformationType(type: InformationResponseDtoTypeEnum): string {
    // Default für InformationResponseDtoTypeEnum.InformationNeutral
    let color = "grey lighten-4";
    if (type === InformationResponseDtoTypeEnum.Error) {
      color = "red accent-4";
    } else if (type === InformationResponseDtoTypeEnum.Warning) {
      color = "yellow accent-4";
    } else if (type === InformationResponseDtoTypeEnum.InformationSuccess) {
      color = "green accent-4";
    }
    return color;
  }

  public isTraceIdAndSpanIdAvailable(informationResponseDto: InformationResponseDto): boolean {
    return !_.isNil(informationResponseDto.traceId) && !_.isNil(informationResponseDto.spanId);
  }

  public isTimestampOrOriginalExceptionAvailable(informationResponseDto: InformationResponseDto): boolean {
    return !_.isNil(informationResponseDto.timestamp) || !_.isNil(informationResponseDto.originalException);
  }
}
</script>

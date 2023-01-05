<template>
  <div>
    <field-group-card>
      <v-row
        v-if="isNewInfrastruktureinrichtung"
        justify="center"
      >
        <v-col cols="12">
          <v-select
            v-model="infrastruktureinrichtungTyp"
            class="mx-3"
            :items="infrastruktureinrichtungList"
            item-value="key"
            item-text="value"
            :rules="[fieldValidationRules.pflichtfeld,fieldValidationRules.notUnspecified]"
            @change="formChanged"
          >
            <template #label>
              Infrastruktureinrichtung Typ <span class="secondary--text">*</span>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row
        v-if="!isNewInfrastruktureinrichtung"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="infrastruktureinrichtungTypDisplay"
            label="Typ der Infrastruktureinrichtung"
            disabled
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="lfdNrInfrastruktureinrichtung"
            label="Lfd. Nr."
            disabled
          />
        </v-col>
      </v-row>
    </field-group-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, VModel } from "vue-property-decorator";
import {LookupEntryDto } from "@/api/api-client";
import FieldValidationRulesMixin from "@/mixins/validation/FieldValidationRulesMixin";
import FieldGroupCard from "@/components/common/FieldGroupCard.vue";
import SaveLeaveMixin from "@/mixins/SaveLeaveMixin"; 
import DisplayMode from "@/types/common/DisplayMode";
import _ from "lodash";

@Component({
  components: {
    FieldGroupCard
  },
})
export default class InfrastruktureinrichtungTypComponent extends Mixins(
  FieldValidationRulesMixin,
  SaveLeaveMixin 
) {
  @VModel({ type: String }) infrastruktureinrichtungTyp!: string;

  @Prop()
  private lfdNr!: string;

  get lfdNrInfrastruktureinrichtung(): string {
    return this.lfdNr;
  }

  @Prop()
  private mode!: DisplayMode;

  get displayMode(): DisplayMode {
    return this.mode === undefined ? DisplayMode.UNDEFINED : this.mode;
  }

  get isNewInfrastruktureinrichtung(): boolean {
    return this.displayMode === DisplayMode.NEU;
  }

  get infrastruktureinrichtungList(): LookupEntryDto[] {
    return this.$store.getters["lookup/infrastruktureinrichtungTyp"];
  }

  get infrastruktureinrichtungTypDisplay(): string {    
    if (!_.isNil(this.infrastruktureinrichtungTyp)) {
      const lookupValue = this.getLookupValue(this.infrastruktureinrichtungTyp, this.infrastruktureinrichtungList);
      return (!_.isNil(lookupValue)) ? lookupValue : "";
    }
    else {
      return "";
    }
  }

  private getLookupValue(key: string | undefined, list: Array<LookupEntryDto>): string | undefined {
    return !_.isUndefined(list) && !_.isNil(key)
        ? list.find((lookupEntry: LookupEntryDto) => lookupEntry.key === key)?.value
        : key;
  }

}
</script>
<style></style>